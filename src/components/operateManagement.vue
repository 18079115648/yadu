<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<div class="device-select">
				<span v-for="(item, index) in selectKind" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>
			<div class="operateManagement-content">
				<ul class="operateManagement-list">
					<li class="operateManagement-item">
						<p class="site-name">腾飞创新园</p>
						<div class="site-info">
							<span class="site-maintain">李四<i>18012212254</i></span>
							<span class="rate">0.3</span>
							<span class="operate-kind">代理商</span>
						</div>
					</li>
					<li class="operateManagement-item">
						<p class="site-name">腾飞创新园</p>
						<div class="site-info">
							<span class="site-maintain">李四<i>18012212254</i></span>
							<span class="rate">0.3</span>
							<span class="operate-kind">代理商</span>
						</div>
					</li>
				</ul>
			</div>
			
			<Modal
		        v-model="moadal_operator"
		        :closable='false'
		        @on-cancel="modal_cancel"
		        class-name="join-modal"
		        :transition-names="['move-down','fade']">
		        <div slot="header" class="modal-header">
		        	<span class="btn-cancel" @click="modal_cancel">取消</span>
		        	<span class="btn-confirm" @click="operator_confirm">确认</span>
		        </div>
		        <div class="modal-content">
		        	<mt-picker :slots="device_operator" :value-key="'value'" :visibleItemCount='device_operator[0].visibleItemCount' :itemHeight="32" @change="onOperatorChange"></mt-picker>
		        </div>
		        <div slot="footer">	</div>
		   </Modal>
		    
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import timePicker from '../components/timePicker'
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
  data () {
    return {
        
    	
    	type:undefined,
        selectKind:[{
        	text: '运营商'
        },{
        	text: '类型'
        }],
        operatorSelected: undefined
    }
  },
  components: {
        timePicker
  },
  computed: {
  	  moadal_operator() {
  		  return this.type==0 ? true : false
  	  },
  	  moadal_time() {
  		  return this.type==1 ? true : false
  	  },
  	  ...mapGetters([
	      'device_operator',
	      'consumeList'
	  ])
  },

	methods :{
		confirm(startDate, endDate) {
			this.showTimePicker=false
			this.beginTime = startDate
			this.endTime = endDate
		},
		hideTimepicker(){
			this.showTimePicker=false
		},
		
		
		selectModal(index) {
			if(this.type==index){
				this.type=undefined
				return
			}
			this.type=index
		},
		modal_cancel() {
			this.type=undefined
		},
		
		
		onOperatorChange(picker, values) {
			const selected=values[0]
		    if(selected){
		    	this.operatorSelected=selected	
		    }
	   	},
	   	operator_confirm() {
	   		
	   		this.$store.dispatch('getConsumeList',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				 }
	      	})
	   		this.type=undefined
	   	},
	   	
	   	time_confirm() {
	   		this.$store.dispatch('getConsumeList',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				 }
	      	})
	   		this.type=undefined
	   	},
	},
	created() {
		document.title = '消费概览';
    	this.$store.dispatch('getOperator')
        this.$store.dispatch('getConsumeList')
    }
}
</script>
<style scoped>	
	.deviceManagement-content{
		position: relative;
		font-size: 0.28rem;
	}
	.device-select{
		display: flex;
		position: relative;
	}
	.device-select>span{
		flex: 1;
		height: 0.8rem;
		text-align: center;
		line-height: 0.8rem;
		font-size: 0.28rem;
		color: #333;
		position: relative;
		background: #fff;
	}
	.device-select>span:before{
		position: absolute;
		content: '';
		 width: 0;
	    height: 0;
	    border-left: 0.12rem solid transparent;
	    border-right: 0.12rem solid transparent;
	    border-top: 0.16rem solid #666;
	    top: 50%;
	    margin-top: -0.08rem;
	    right: 1rem;
	}
	
	.modal-content{
		padding: 0.3rem 0;
	}
	.operateManagement-content{
		position: absolute;
		left: 0;
		right: 0;
		top: 0.8rem;
		bottom: 0;
		border-top: 0.1rem solid #eee;
	}
	.operateManagement-list li:nth-of-type(even){
		background: #F4FAFF;
	}
	.operateManagement-list li.operateManagement-item{
		padding: 0.17rem 0.2rem;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	.operateManagement-item .site-name{
		color: #333333;
		font-size: 0.3rem;
		position: relative;
		padding: 0.08rem 0.3rem 0.12rem 0 ;
	}
	.operateManagement-item .site-name:after{
		position: absolute;
	    content: '';
	    width: 0.14rem;
	    height: 0.33rem;
	    right: 0;
	    top: 50%;
	    margin-top: -0.14rem;
	    background: url(../assets/image/right_arror.png) no-repeat;
	    background-size: 100%;
		
	}
	.site-info{
		display: flex;
		
	}
	.site-info>span{
		flex: 1;
		text-align: right;
	}
	.site-info>span.site-maintain{
		flex: 2;
		text-align: left;
	}
	.site-info>span.site-maintain>i{
		margin-left: 0.2rem;
	}
	.site-info>span.rate{
		text-align: center;
	}
</style>
