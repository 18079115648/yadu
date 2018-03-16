<template>
	<div class="fullDiv" style=" font-size: 0.28rem;">
		<div class="materialAnalysis-content page-content">
			<!--<div class="site-select">
				<div class="site-select-content">
					<span class="btn-search-site"></span>
					<input class="site-input" type="search" placeholder="站点名称" />
				</div>
				
			</div>-->
			<div class="device-select">
				<span v-for="(item, index) in selectKind" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>
			<div class="materialAnalysis-container">
				<div class="feed-name-list clear" v-if="materielAmount.length>0">
		        	<Radio-group v-model="checkedMaterial" @on-change="changeMaterial">
						<div class="feed-name-item"  v-for="(item, index) in materielAmount" :key="index">
							<p class="feed-name">
								<Radio :label="item.materielId">{{item.materielName}}</Radio>
							</p>
							<p class="material-num">{{item.useAmount}}</p>
						</div>
					</Radio-group>
				</div>
				
			    <div class="siteSale-list" v-if="materielAmount.length>0">
					<p class="sale-list-tit">
						<span class="site-name">站点名称</span>
						<span class="sale-volume">使用量</span>
						<span class="sale-num">责任人</span>
					</p>
					<ul>
						<li class="siteSale-item" v-for="(item, index) in materielAmountList" :key="index">
							<span class="site-name">{{item.stationName}}</span>
							<span class="sale-volume">{{item.useAmount}}</span>
							<span class="sale-num">{{item.managerName}}</span>
						</li>
					</ul>
				</div>
				<div class="data-none" v-else>暂无物料使用</div>
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
		    <Modal
		        v-model="moadal_time"
		        :closable='false'
		        @on-cancel="modal_cancel"
		        class-name="join-modal time-modal"
		        :transition-names="['move-down','fade']">
		        <div class="modal-content">
		        	<p class="tip">日期</p>
		        	<div class="time-select">
		        		<input type="text" v-model="beginTimeChange" @focus="blur" placeholder="开始日期" readonly class="time-input" @click="showTimePicker=true" />
		        		<span class="row-line"></span>
		        		<input type="text" v-model="endTimeChange" @focus="blur" readonly placeholder="结束日期" class="time-input" @click="showTimePicker=true" />
		        	</div>
		        </div>
		        <div slot="footer" class="modal-footer">
		        	<time-picker v-show="showTimePicker" @hideTimePicker="hideTimepicker" @confirm="confirm"></time-picker>
		        	<span class="btn-cancel" @click="modal_cancel">取消</span>
		        	<span class="btn-confirm" @click="time_confirm">确认</span>
		        </div>
		    </Modal>
		    
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import timePicker from '../components/timePicker'
import { Toast } from 'mint-ui';
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
  data () {
    return {
    	showTimePicker: false,
    	beginTime: '',
    	endTime: '',
    	beginTimeChange: '',
    	endTimeChange: '',
    	
    	type:undefined,
        selectKind:[{
        	text: '运营商'
        },{
        	text: '日期'
        }],
        checked:'',
        
        operatorChange:{},
        operatorSelected:{}
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
	      'materielAmount',
	      'materielAmountList'
	  ]),
	  checkedMaterial() {
	  	if(this.checked==''){
	  		if(this.materielAmount.length>0){
	  			return this.checked=this.materielAmount[0].materielId
	  		}
	  		
	  	}
	  	return this.checked	 
	  }
  },

	methods :{
		blur() {
			event.target.blur()
		},
		
		confirm(startDate, endDate) {
			this.showTimePicker=false
			this.beginTimeChange = startDate
			this.endTimeChange = endDate
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
		confirm_select() {
			this.type=undefined
		},
		onOperatorChange(picker, values) {
//			console.log(values[0])
			const selected=values[0]
		    if(selected){
		    	this.operatorChange=selected	      	
		    }
	   	},
	   	operator_confirm() {
	   		this.operatorSelected=this.operatorChange 
	   		this.selectKind[0].text=this.operatorSelected.value.substr(0,6)
	   		this.$store.dispatch('getMaterielAmount',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime
				 }
	      	}).then(() =>{
	      		this.checked=this.materielAmount[0] ? this.materielAmount[0].materielId : ''
	      	})
	   		this.type=undefined
	   	},
	   	changeMaterial(id) {
	   		this.checked=id
	   		this.$store.dispatch('getMaterielAmountList',{
	   			 params:{
				    operator_id:this.operatorSelected.id,
				    materiel_id: this.checked,
				    start_date: this.beginTime,
				    end_date: this.endTime
				 }
	   		})
	   	},
	   	time_confirm() {
	   		if(!this.beginTimeChange){
	   			Toast({
				  message: '请选择日期',
				  position: 'bottom',
				  duration: 1500
				});
				return
	   		}
	   		this.beginTime=this.beginTimeChange
	   		this.endTime=this.endTimeChange
	   		this.selectKind[1].text=this.beginTime.substr(5)+'/'+this.endTime.substr(5)
	   		this.$store.dispatch('getMaterielAmount',{
	   			 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime
				 }
	   		}).then(() =>{
	      		this.checked=this.materielAmount[0] ? this.materielAmount[0].materielId : ''
	      	})
	   		this.type=undefined
	   		
	   	},
	   	getCurDate() {
	 		let date = new Date()
            let year = date.getFullYear()
            let month = (date.getMonth() + 1) >9 ? date.getMonth() + 1 : '0'+(date.getMonth() + 1)
            let today = date.getDate()>9 ? date.getDate() : '0'+date.getDate()
            this.beginTimeChange = year + '-' + month + '-' + today
            this.endTimeChange = year + '-' + month + '-' + today
	 	}
		
	},
	created() {
		document.title = '物料分析';
    	this.$store.dispatch('getOperator')  
        this.$store.dispatch('getMaterielAmount')
        this.getCurDate()
    },
    beforeRouteLeave(to, from, next) {
		this.type = undefined
		next()
	}


}
</script>
<style scoped>	
	.site-select{
		padding: 0.2rem;
		background: #eee;
		position: relative;
		z-index: 1005;
	}
	.site-select-content{
		display: flex;
		background: #fff;
		border-radius: 0.08rem;
	}
	.btn-search-site{
		width: 0.6rem;
		height: 0.6rem;
		background: url(../assets/image/search.png) no-repeat center;
		background-size: 60% 60%;
		margin:0  0.1rem;
	}
	.site-input{
		flex: 1;
		border: none;
		outline: none;
	}
	.site-input::-webkit-input-placeholder{
		color: #ccc;
	}
	.device-select{
		display: flex;
		position: relative;
	}
	.device-select>span{
		flex: 1;
		height: 0.9rem;
		text-align: center;
		line-height: 0.9rem;
		font-size: 0.28rem;
		color: #000;
		position: relative;
		background: #fff;
		border-bottom: 1px solid #EBEBEB;
	}
	.device-select>span>i{
		display: inline-block;
		 width: 0;
	    height: 0;
	    border-left: 0.12rem solid transparent;
	    border-right: 0.12rem solid transparent;
	    border-top: 0.16rem solid #666;
	    margin-left: 0.2rem;
	    position: relative;
	    top: -1px;
	}
	.modal-content{
		padding: 0.3rem 0;
	}
	.modal-content>span{
		display: inline-block;
		padding: 0 0.2rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border-radius: 0.1rem;
		background: #2DB7F5;
		margin: 0 0.1rem;
		color: #fff;
		
	}
	.modal-content .tip{
		color: #333333;
		padding-bottom: 0.2rem;
		font-size: 0.28rem;
	}
	.time-select{
		display: flex;
	}
	.time-select .time-input{
		width: 2.9rem;
		outline: none;
		border: 1px solid #eee;
		padding: 0.15rem 0;
		font-size: 0.28rem;
		text-align: center;
	}
	.row-line{
		width: 0.7rem;
		height: 0;
		border-bottom: 1px solid #ddd;
		margin: 0 0.2rem;
		position: relative;
		top: 0.3rem;
	}
	.modal-footer{
		margin: 0 -0.1rem;
		display: flex;
		padding: 0.6rem 0;
	}
	.modal-footer>span{
		flex: 1;
		margin: 0 0.1rem;
		text-align: center;
		padding: 0.2rem 0;
		font-size: 0.28rem;
		background: #d2d2d2;
		color: #fff;
		border-radius: 0.08rem;
	}
	.modal-footer>span.btn-confirm{
		background: #13cc43;
	}
	.materialAnalysis-container{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0.9rem;
		overflow-y: auto;
	}
	
	.feed-name-list{
		padding: 0.3rem 0.15rem 0;
		background: #fff;
		border-top: 0.1rem solid #eee;
	}
	.feed-name-list .feed-name-item:nth-of-type(1) .ivu-radio-wrapper-checked{
		color: #508cee;
	}
	.feed-name-list .feed-name-item:nth-of-type(2) .ivu-radio-wrapper-checked{
		color: #fb1f63;
	}
	.feed-name-list .feed-name-item:nth-of-type(3) .ivu-radio-wrapper-checked{
		color: #28bc2f;
	}
	.feed-name-list .feed-name-item:nth-of-type(4) .ivu-radio-wrapper-checked{
		color: #8a6e50;
	}
	.feed-name-list .feed-name-item:nth-of-type(5) .ivu-radio-wrapper-checked{
		color: #ea648d;
	}
	.feed-name-list .feed-name-item:nth-of-type(6) .ivu-radio-wrapper-checked{
		color: #f390f2;
	}
	.feed-name-list .feed-name-item:nth-of-type(7) .ivu-radio-wrapper-checked{
		color: #90dc94;
	}
	.feed-name-list .feed-name-item:nth-of-type(8) .ivu-radio-wrapper-checked{
		color: #508cee;
	}
	.feed-name-list .feed-name-item:nth-of-type(9) .ivu-radio-wrapper-checked{
		color: #6ae4da;
	}
	.feed-name-list .feed-name-item:nth-of-type(10) .ivu-radio-wrapper-checked{
		color: #508cee;
	}
	.feed-name-list .feed-name-item:nth-of-type(11) .ivu-radio-wrapper-checked{
		color: #508cee;
	}
	.feed-name-list .feed-name-item:nth-of-type(12) .ivu-radio-wrapper-checked{
		color: #508cee;
	}
	.feed-name-item{
		float: left;
		width: 2rem;
		margin: 0 0.2rem 0.4rem;
		text-align: center;
		position: relative;
		
		-webkit-box-shadow: 0 1px 3px #ccc;
		padding: 0.1rem;
		padding-top: 0.25rem;
	}
	.feed-name-item:before{
		position: absolute;
		content: '';
		width: 100%;
		height: 0.3rem;
		left: 0;
		top: -0.08rem;
		background: url(../assets/image/tip.png) no-repeat center;
		background-size: 80% 100%;
	}
	.feed-name-item .feed-name{
		font-size: 0.28rem;
		color: #aaa;
		text-align: left;
		display: flex;
		height: 0.6rem;
		line-height: 0.6rem;
	}
	.feed-name-item .feed-name .ivu-radio-wrapper{
		display: block;
		width: 100%;
		font-size: 0.28rem;
	}
	.material-num{
		background: #f4faff;
		padding: 0.2rem 0;
		text-align: center;
		border-radius: 0.08rem;
		font-size: 0.32rem;
		color: #aaa;
	}
	.sale-list-tit{
		display: flex;
		padding: 0.2rem;
		background: #f2f2f2;
	}
	.sale-list-tit>span{
		flex: 1;
	}
	.sale-volume{
		text-align: center;
	}
	.sale-num{
		text-align: right;
	}
	.siteSale-list li{
		padding: 0.25rem 0.2rem;
		display: flex;
		background-image: url(../assets/image/border.png);
    background-repeat: repeat-x;
    background-position: 0 bottom;
    background-size: auto 1px;
		color: #333;
	}
	.siteSale-list li>span{
		flex: 1;
	}
</style>
