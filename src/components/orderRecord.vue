<template>
	<div class="fullDiv" style="background: #eee;">
		<div class="deviceManagement-content page-content">
			<div class="device-select">
				<span v-for="(item, index) in selectKind" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>
			<div class="orderRecord-content">
				<scroller 
					:on-refresh="refresh"
					:on-infinite="infinite"
	              	ref="scroller">
	              	<div style="height: 1000px;" v-show="scroller_show"></div>
					<ul class="orderRecord-list">
						<li class="everySale-item" v-for="(item, index) in orderRecord" :key="index">
							<div class="sale-time">{{item.orderDate}}</div>
							<div class="sale-detail">
								<p class="order-sn">
									<span style="width: 1.3rem;">订单号：</span>
									<span style="width: 4.4rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{item.orderSn}}</span>
								</p>
								<p class="sale-price">
									<span class="present-price" v-if="item.orderStatus==1">未付款</span>
									<span class="present-price" v-if="item.orderStatus==2">待制作</span>
									<span class="present-price" style="color: #13cc43;" v-if="item.orderStatus==3">已完成</span>
									<span class="present-price" v-if="item.orderStatus==4">制作失败</span>
									<span class="original-price" style="color: #ed5349;" v-if="item.refundStatus==1">已退款</span>
									<span class="original-price" style="color: #ed5349;" v-if="item.refundStatus==2">退款失败</span>
								</p>
								<p class="sale-kind">
									<span class="sale-name">{{item.goodsName}}</span>
									<span class="sale-num">x{{item.orderAmount}}</span>
									
								</p>
								
								<p class="sale-desc">
									<span class="total-sale-price"><i>&yen;</i>{{item.orderPrice}}</span>
									<span class="pay-way">{{item.payType}}</span>
								</p>
								
								
							</div>
						</li>
					</ul>
				</scroller>
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
import api from '@/fetch/api'
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
        
        orderRecord: [],
        
        page: 1,
        page_size: 15
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
	      'scroller_show'
	  ])
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
	   		this.selectKind[0].text=this.operatorSelected.value.substr(0,6)
	   		this.getOrderRecord()
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
	   		this.selectKind[1].text=this.beginTime.substr(2)+'/'+this.endTime.substr(2)
	   		this.getOrderRecord()
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
	 	refresh() {
	  		this.page=1
	        setTimeout(() => {
	          this.getOrderRecord()
	          if (this.$refs.scroller)
	            this.$refs.scroller.finishPullToRefresh()
	        }, 400)
	    },
	   	infinite(){
	   		setTimeout(() => {
	   			api.getOrderRecord({
		       		params:{
						    operator_id:this.operatorSelected.id,
						    start_date: this.beginTime,
						    end_date: this.endTime,
						    page:this.page,
						    page_size: this.page_size  
						 }
		        }).then(res => {  
		 			if(res.result.list.length==0){
				      	this.$nextTick(() => {
						    this.$refs.scroller.finishInfinite(true)
						})	
						return
			        }
		 			if(res.result.page==1){
			    		this.orderRecord=res.result.list
			    	}else {
			    		this.orderRecord = this.orderRecord.concat(res.result.list) 
			    	}
	            	this.page++ 
				    this.$nextTick(() => {
				    	this.$refs.scroller.finishInfinite();
			        })
		        }, err => {
					this.$refs.scroller.finishInfinite(true)
		        })
	   			   
				  
	        }, 400)
	   		
			
	 	},
	 	getOrderRecord() {
	 		api.getOrderRecord({
	       		params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					    page:this.page,
					    page_size: this.page_size  
					 }
	        }).then(res => {  
	 			this.orderRecord=res.result.list
	            this.page++  
	            this.$store.commit('scroller_show_status', false)  
			    this.$nextTick(() => {
			    	this.$refs.scroller.scrollTo(0,0,false)
				    this.$refs.scroller.resize()
				})
	        }, err => {
	
	        })
	 	}
	},
	created() {
		this.$store.commit('scroller_show_status', true)    
		document.title = '订单列表';
    	this.$store.dispatch('getOperator')
        this.getOrderRecord()
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
	.orderRecord-content{
		position: absolute;
		left: 0;
		right: 0;
		top: 1rem;
		bottom: 0;
		background: #fff;
	}
	.orderRecord-list .everySale-item:nth-of-type(even){
		background: #F4FAFF;
	}
	.everySale-item{
		
		display: flex;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
		padding: 0.2rem;
		align-items: center;
	}
	.everySale-item .sale-time{
		width: 1.5rem;
		text-align: center;
		line-height: 1.3;
		margin-right: 0.2rem;
		margin-left: -0.1rem;
		color: #ababab;
		font-size: 0.26rem;
	}
	.sale-detail{
		width: 5.5rem;
		overflow: hidden;
	}
	.sale-detail>p{
		display: flex;
		justify-content: space-between;
		line-height: 1.7;
		align-items: center;
	}
	.sale-detail .order-sn{
		color: #333;
		justify-content: flex-start;
		margin-right: -0.2rem;
		padding-bottom: 0.08rem;
	}
	.sale-kind .sale-name{
		color: #333;
		font-size: 0.30rem;
	}
	.sale-price{
		padding-bottom: 0.08rem;
	}
	.sale-kind .sale-num{
	}
	.sale-desc .total-sale-price{
		font-size: 0.36rem;
		
	}
	.sale-desc .total-sale-price>i{
		margin-right: 0.06rem;
		font-size: 0.28rem;
	}
	.sale-desc .pay-way{
		color: #333;
		font-size: 0.30rem;
	}
	
</style>
