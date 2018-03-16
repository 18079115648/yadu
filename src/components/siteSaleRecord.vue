<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<div class="device-select">
				<span v-for="(item, index) in selectKind" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>
			<div class="sale-total-content">
				<div class="machine-num">
					<p>{{consumeList.totalNum}}</p>
					<p>台数</p>
				</div>
				<div class="total-sale-volume">
					<p v-if="consumeList.totalCup"><span style="font-size: 0.36rem; margin-right: 0.08rem;">&yen;</span>{{consumeList.totalPrice}}</p>
					<p v-else>0</p>
					<p>销售额</p>
				</div>
				<div class="total-sale-num">
					<p>{{consumeList.totalCup}}</p>
					<p>杯数</p>
				</div>
			</div>
			<div class="siteSale-list">
				<p class="sale-list-tit">
					<span class="site-name">站点名称</span>
					<span class="sale-volume">销售额</span>
					<span class="sale-num ">杯数</span>
				</p>
				<div class="siteSale-list-content">
		            <scroller 
						:on-infinite="infinite"
		              	ref="scroller">
		              	<div style="height: 1000px;" v-show="scroller_show"></div>
						<ul>
							<li class="siteSale-item" @click="goEverySaleRecord(item)" v-for="(item, index) in pageConsumeList" :key="index">
								<!--<a :href="'#everySaleRecord/'+item.stationId+'&'+beginTime+'&'+endTime">-->
									<span class="site-name">{{item.stationName}}</span>
									<span class="sale-volume">&yen;{{item.stationPrice}}</span>
									<span class="sale-num enter-icon">{{item.stationCup}}</span>
								<!--</a>-->
							</li>
						</ul>
					</scroller>
				</div>
				
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
        operatorSelected: {},
        operatorChange: {},
        
        page: 1
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
	      'consumeList',
	      'scroller_show'
	  ]),
	  pageConsumeList() {
			setTimeout(() => {
		        if(this.$refs.scroller){
		   	    	this.$refs.scroller.resize()
		   	    }
		   	})
			if(this.consumeList.stationList){
				return this.consumeList.stationList.slice(0,this.page*15)
			}
			
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
		
		
		onOperatorChange(picker, values) {
			const selected=values[0]
		    if(selected){
		    	this.operatorChange=selected	
		    }
	   	},
	   	operator_confirm() {
	   		this.operatorSelected=this.operatorChange
	   		this.page=1
	   		this.$refs.scroller.scrollTo(0,0,false)
	   		this.selectKind[0].text=this.operatorSelected.value.substr(0,6)
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
	   		this.page=1
	   		this.$refs.scroller.scrollTo(0,0,false)
	   		this.selectKind[1].text=this.beginTime.substr(2)+'/'+this.endTime.substr(2)
	   		this.$store.dispatch('getConsumeList',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				 }
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
	 	},
	 	goEverySaleRecord(item) {
	 		localStorage.setItem('everySiteRecord', item.stationName)
		   	window.location.hash='#everySaleRecord/'+item.stationId+'&'+this.beginTime+'&'+this.endTime
	 	},
	 	infinite() {
	 		setTimeout(() => {
	 			this.page++
	 			if(this.consumeList.stationList.slice(this.page*15).length==0){
	 				this.$refs.scroller.finishInfinite(true)
	 				return
	 			}
	 			setTimeout(() => {
		            this.$refs.scroller.finishInfinite();
		        })
	   			   
				  
	        }, 400)
	 	}
	},
	activated() {
   	    document.title = '销售概览';
   	    setTimeout(() => {
	        if(this.$refs.scroller){
	   	    	this.$refs.scroller.resize()
	   	    }
	   	})
		
		this.getCurDate()
    },
	created() {
		this.$store.commit('scroller_show_status', true)    
		document.title = '销售概览';
    	this.$store.dispatch('getOperator')
        this.$store.dispatch('getConsumeList')
        this.getCurDate()
    },
    beforeRouteLeave(to, from, next) {
		this.type = undefined
		next()
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
	.sale-total-content{
		padding: 0.2rem;
		background: #f8b551;
		display: flex;
		color: #fff;
		height: 1.7rem;
	}
	.sale-total-content>div{
		flex: 2;
		text-align: center;
	}
	.sale-total-content>div.total-sale-volume{
		flex: 3;
	}
	.sale-total-content>div p:first-child{
		font-size: 0.44rem;
		padding: 0.14rem 0 0.05rem;
	}
	.sale-list-tit{
		display: flex;
		padding: 0.2rem;
		background: #f2f2f2;
		height: 0.8rem;
	}
	.sale-list-tit>span{
		flex: 1;
	}
	.site-name{
		flex: 1.5 !important;
	}
	.sale-volume{
		text-align: center;
		flex: 1.5 !important;
	}
	.sale-num{
		text-align: right;
		padding-right: 0.7rem;
		position: relative;
		flex: 1 !important;
	}
	.sale-num.enter-icon:before{
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
	.siteSale-list{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 2.5rem;
	}
	.siteSale-list-content{
		position: absolute;
		top: 0.8rem;
		bottom: 0;
		left: 0;
		right: 0;
		overflow-y: auto;
		
	}
	.siteSale-list ul li:nth-of-type(even){
		background: #f4faff;
	}
	.siteSale-list li{
		padding: 0.25rem 0.2rem;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
		color: #333;
		display: block;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.siteSale-list li>span{
		flex: 1;
	}
</style>
