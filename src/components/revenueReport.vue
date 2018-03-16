<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<div class="device-select">
				<span v-for="(item, index) in selectKind" v-if="!item.other" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>
			<div class="revenue-report-content">
				<scroller 
						:on-infinite="infinite"
		              	ref="scroller">
		            <div style="height: 1000px;" v-show="scroller_show"></div>
					<div class="revenue-chart">
						<p class="revenue-total" v-if="revenueReport.totalPrice>0">营收总额<span>&yen;{{revenueReport.totalPrice}}</span></p>
						<p class="revenue-total" style="color: #bbb;" v-else>暂无营收</span></p>
						<div class="revenue-chart-content">
							<div id="revenue-chart" style="width: 100%; height: 5.6rem;"></div>
							<div class="revenue-detail">
								<div class="revenue-item" v-for="(item,index) in revenueReport.list" :key="index">
									<span class="revenue-name">{{item.goodsName}}</span>
									<span class="revenue-rate">{{(item.money*100/revenueReport.totalPrice).toFixed(2)+'%'}}</span>
									<span class="revenue-num">&yen;{{item.money}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="device-select other">
						<span v-for="(item, index) in selectKind" v-if="item.other" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
					</div>
					<div class="revenue-record">
					    <div class="revenue-record-total">合计<span>&yen;{{revenueList.totalPrice}}</span></div>
						<ul class="revenue-record-list" v-if="revenueList.totalPrice>0">
							<li class="revenue-record-item" v-for="(item,index) in pageRevenueList" :key="index">
								<span class="revenue-name">{{item.goodsName}}</span>
								<span class="revenue-payway">{{item.payType}}</span>
								<span class="revenue-amount">&yen;{{item.money}}</span>
							</li>
						</ul>
					</div>
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
		    
		    <Modal
		        v-model="moadal_site"
		        :closable='false'
		        @on-cancel="modal_cancel"
		        class-name="join-modal"
		        :transition-names="['move-down','fade']">
		        <div slot="header" class="modal-header">
		        	<span class="btn-cancel" @click="modal_cancel">取消</span>
		        	<span class="btn-confirm" @click="site_confirm">确认</span>
		        </div>
		        <div class="modal-content">
		        	<mt-picker :slots="site_list" :value-key="'value'" :visibleItemCount='site_list[0].visibleItemCount' :itemHeight="32" @change="onSiteChange"></mt-picker>
		        </div>
		        <div slot="footer">	</div>
		    </Modal>
		    <Modal
		        v-model="moadal_product"
		        :closable='false'
		        @on-cancel="modal_cancel"
		        class-name="join-modal"
		        :transition-names="['move-down','fade']">
		        <div slot="header" class="modal-header">
		        	<span class="btn-cancel" @click="modal_cancel">取消</span>
		        	<span class="btn-confirm" @click="goods_confirm">确认</span>
		        </div>
		        <div class="modal-content">
		        	<mt-picker :slots="material_list" :value-key="'value'"  :itemHeight="32" @change="onGoodsChange"></mt-picker>
		        </div>
		        <div slot="footer">	</div>
		    </Modal>
		    <Modal
		        v-model="moadal_payway"
		        :closable='false'
		        @on-cancel="modal_cancel"
		        class-name="join-modal"
		        :transition-names="['move-down','fade']">
		        <div slot="header" class="modal-header">
		        	<span class="btn-cancel" @click="modal_cancel">取消</span>
		        	<span class="btn-confirm" @click="onPayWay_confirm">确认</span>
		        </div>
		        <div class="modal-content">
		        	<mt-picker :slots="payway" :value-key="'value'"  :itemHeight="32" @change="onPayWayChange" ></mt-picker>
		        </div>
		        <div slot="footer">	</div>
		    </Modal>
		    
		    
		    
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import echarts from '@/../static/echarts.js'
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
        	text: '运营商',
        	other:false
        },{
        	text: '日期',
        	other:false
        },{
        	text: '站点',
        	other:false
        },{
        	text: '产品',
        	other:true
        },{
        	text: '支付方式',
        	other:true
        }],
        
        operatorSelected: {},
        siteSelected:{},
        goodsSelected: {},
        payWaySelected: {},
        
        operatorChange: {},
        siteChange:{},
        goodsChange: {},
        payWayChange: {},
        
        page:1

	    
	    
	    
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
  		
  	  moadal_site() {
  		  return this.type==2 ? true : false
  	  },
  	  moadal_product() {
  		  return this.type==3 ? true : false
  	  },
  	  moadal_payway() {
  		  return this.type==4 ? true : false
  	  },
  	  ...mapGetters([
	      'device_operator',
	      'site_list',
	      'revenueList',
	      'revenueReport',
	      'options',
	      'material_list',
	      'payway',
	      'scroller_show'
	  ]),
	   pageRevenueList() {
			setTimeout(() => {
		        this.$refs.scroller.resize();
		    })
			return this.revenueList.list.slice(0,this.page*15)
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
	   		this.selectKind[2].text='站点'
	   		this.siteSelected={
	   			id:0,
	   			value:'全部'
	   		}
	   		this.selectKind[3].text='产品'
	   		this.selectKind[4].text='支付方式'
	   		this.$store.dispatch('getStationList',{
	      		 params:{
				    operator_id:this.operatorSelected.id
				 }
	      	}).then(() =>{
	      		this.$store.dispatch('getRevenueList',{
		      		 params:{
		      		 	params:{
						    operator_id:this.operatorSelected.id,
						    start_date: this.beginTime,
						    end_date: this.endTime,
						    goods_id: 0,
						    pay_way: 0,
						    station_id: this.siteSelected.id
						}
		      		 },
		      		 data: true
		      	})
		   		this.$store.dispatch('getRevenueReport',{
		      		 params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					    station_id: this.siteSelected.id
					 }
		      	})
	      	})
	   		
	   		this.type=undefined
	   	},
	   	onSiteChange(picker, values) {
	   		const selected=values[0]
		    if(selected){
		    	this.siteChange=selected	      	
		    }
	   	},
	   	site_confirm() {
	   		this.siteSelected=this.siteChange      
	   		this.page=1
	   		this.$refs.scroller.scrollTo(0,0,false)
	   		this.selectKind[2].text=this.siteSelected.value.substr(0,6)
	   		this.selectKind[3].text='产品'
	   		this.selectKind[4].text='支付方式'
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
	      		 	params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					    goods_id: 0,
					    pay_way: 0,
					    station_id: this.siteSelected.id
					}
	      		 },
	      		 data: true
	      	})
	   		this.$store.dispatch('getRevenueReport',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				    station_id: this.siteSelected.id
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
	   		this.selectKind[1].text=this.beginTime.substr(5)+'/'+this.endTime.substr(5)
	   		this.selectKind[3].text='产品'
	   		this.selectKind[4].text='支付方式'
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
	      		 	params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					    goods_id: 0,
					    pay_way: 0,
					    station_id: this.siteSelected.id
					}
	      		 },
	      		 data: true
	      	})
	   		this.$store.dispatch('getRevenueReport',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				    station_id: this.siteSelected.id
				 }
	      	})
	   		this.type=undefined
	   	},
	   	
	   	onGoodsChange(picker, values) {
	   		const selected=values[0]
		    if(selected){
		    	this.goodsChange=selected	
		    }
	   		
	   		
	   	},
	   	goods_confirm() {
	   		this.goodsSelected=this.goodsChange
	   		this.page=1
	   		this.selectKind[3].text=this.goodsSelected.value.substr(0,6)
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
	      		 	params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					    goods_id: this.goodsSelected.id,
					    pay_way: this.payWaySelected.id,
					    station_id: this.siteSelected.id
					}
	      		 },
	      		 data: false
	      	})
	   		this.type=undefined
	   	},
	   	onPayWayChange(picker, values) {
	   		
	   		const selected=values[0]
		    if(selected){
		    	this.payWayChange=selected
		    }
	   		
	   		
	   	},
	   	onPayWay_confirm() {
	   		this.payWaySelected=this.payWayChange
	   		this.page=1
	   		this.selectKind[4].text=this.payWaySelected.value.substr(0,6)
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
	      		 	params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					    goods_id: this.goodsSelected.id,
					    pay_way: this.payWaySelected.id,
					    station_id: this.siteSelected.id
					}
	      		 },
	      		 data: false
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
	 	infinite() {
	 		setTimeout(() => {
	 			this.page++
	 			if(this.revenueList.list.slice(this.page*15).length==0){
	 				this.$refs.scroller.finishInfinite(true)
	 				return
	 			}
	 			setTimeout(() => {
		            this.$refs.scroller.finishInfinite();
		        })
	   			   
				  
	        }, 400)
	 	}

	},

   	created() {
   		this.$store.commit('scroller_show_status', true)    
   		document.title = '营收报表';
    	this.$store.dispatch('getOperator')
    	this.$store.dispatch('getStationList')
//      this.$store.dispatch('getGoodsList')
//      this.$store.dispatch('getPayWay')
        this.$store.dispatch('getRevenueList',{
      		 data: true
      	})
        this.$store.dispatch('getRevenueReport')
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
	.revenue-report-content{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0.9rem;
		overflow-y: auto;
		border-top: 0.1rem solid #eee;
		
	}
	#revenue-chart{
		margin: 0.4rem 0 0.2rem;
	}
	.revenue-chart{
		padding: 0 0.2rem;
		
		border-bottom: 0.2rem solid #eee;
	}
	.revenue-total{
		padding: 0.3rem 0 0.1rem;
		text-align: center;
		font-size: 0.3rem;
	}
	.revenue-total>span{
		color: #f72222;
		font-size: 0.32rem;
		font-weight: 600;
		margin-left: 0.2rem;
	}
	.revenue-chart-content{
		/*display: flex;
		align-items: center;*/
	}
	.revenue-detail{
		padding: 0.2rem 0;
	}
	.revenue-item{
		padding: 0 0.25rem;
		display: flex;
		height: 0.54rem;
		line-height: 0.54rem;
	}
	.revenue-item .revenue-name{
		position: relative;
		padding-left: 0.48rem;
		overflow: hidden;
		width: 3.2rem;
		
	}
	.revenue-item .revenue-rate{
		text-align: right;
		width: 1.3rem;
		padding-right: 0.2rem;
		
	}
	.revenue-item .revenue-num{
		
		flex: 1;
		text-align: right;
		
	}
	.revenue-item .revenue-name:before{
		position: absolute;
		content: '';
		width: 0.3rem;
		height: 0.3rem;
		left: 0;
		top: 50%;
		margin-top: -0.15rem;
	}
	
	.revenue-detail .revenue-item:nth-of-type(1){
		color: #852120;
	}
	.revenue-detail .revenue-item:nth-of-type(1) .revenue-name:before{
		background: #852120;
	}
	.revenue-detail .revenue-item:nth-of-type(2){
		color: #b05a21;
	}
	.revenue-detail .revenue-item:nth-of-type(2) .revenue-name:before{
		background: #b05a21;
	}
	.revenue-detail .revenue-item:nth-of-type(3){
		color: #957727;
	}
	.revenue-detail .revenue-item:nth-of-type(3) .revenue-name:before{
		background: #957727;
	}
	.revenue-detail .revenue-item:nth-of-type(4){
		color: #928b27;
	}
	.revenue-detail .revenue-item:nth-of-type(4) .revenue-name:before{
		background: #928b27;
	}
	.revenue-detail .revenue-item:nth-of-type(5){
		color: #efea3f;
	}
	.revenue-detail .revenue-item:nth-of-type(5) .revenue-name:before{
		background: #efea3f;
	}
	.revenue-detail .revenue-item:nth-of-type(7){
		color: #004226;
	}
	.revenue-detail .revenue-item:nth-of-type(7) .revenue-name:before{
		background: #004226;
	}
	.revenue-detail .revenue-item:nth-of-type(8){
		color: #00a548;
	}
	.revenue-detail .revenue-item:nth-of-type(8) .revenue-name:before{
		background: #00a548;
	}
	.revenue-detail .revenue-item:nth-of-type(9){
		color: #9dce89;
	}
	.revenue-detail .revenue-item:nth-of-type(9) .revenue-name:before{
		background: #9dce89;
	}
	.revenue-detail .revenue-item:nth-of-type(6){
		color: #cede6a;
	}
	.revenue-detail .revenue-item:nth-of-type(6) .revenue-name:before{
		background: #cede6a;
	}
	.revenue-detail .revenue-item:nth-of-type(10){
		color: #005934;
	}
	.revenue-detail .revenue-item:nth-of-type(10) .revenue-name:before{
		background: #005934;
	}
	.revenue-detail .revenue-item:nth-of-type(11){
	    color: #00516e;
	}
	.revenue-detail .revenue-item:nth-of-type(11) .revenue-name:before{
		background: #00516e;
	}
	.revenue-detail .revenue-item:nth-of-type(12){
		color: #1bcedf;
	}
	.revenue-detail .revenue-item:nth-of-type(12) .revenue-name:before{
		background: #1bcedf;
	}
	.revenue-detail .revenue-item:nth-of-type(13){
		color: #00aceb;
	}
	.revenue-detail .revenue-item:nth-of-type(13) .revenue-name:before{
		background: #00aceb;
	}
	.revenue-detail .revenue-item:nth-of-type(14){
		color: #7584c1;
	}
	.revenue-detail .revenue-item:nth-of-type(14) .revenue-name:before{
		background: #7584c1;
	}
	.revenue-detail .revenue-item:nth-of-type(15){
		color: #4d98d3;
	}
	.revenue-detail .revenue-item:nth-of-type(15) .revenue-name:before{
		background: #4d98d3;
	}
	.revenue-detail .revenue-item:nth-of-type(17){
		color: #874c9a;
	}
	.revenue-detail .revenue-item:nth-of-type(17) .revenue-name:before{
		background: #874c9a;
	}
	.revenue-detail .revenue-item:nth-of-type(18){
		color: #1f2b61;
	}
	.revenue-detail .revenue-item:nth-of-type(18) .revenue-name:before{
		background: #1f2b61;
	}
	.revenue-detail .revenue-item:nth-of-type(19){
		color: #ba0073;
	}
	.revenue-detail .revenue-item:nth-of-type(19) .revenue-name:before{
		background: #ba0073;
	}
	.revenue-detail .revenue-item:nth-of-type(16){
		color: #043883;
	}
	.revenue-detail .revenue-item:nth-of-type(16) .revenue-name:before{
		background: #043883;
	}
	.revenue-detail .revenue-item:nth-of-type(20){
		color: #f3a292;
	}
	.revenue-detail .revenue-item:nth-of-type(20) .revenue-name:before{
		background: #f3a292;
	}
	.revenue-detail .revenue-item:nth-of-type(21){
		color: #f72222;
	}
	.revenue-detail .revenue-item:nth-of-type(21) .revenue-name:before{
		background: #f72222;
	}
	.revenue-detail .revenue-item:nth-of-type(22){
		color: #b21e23;
	}
	.revenue-detail .revenue-item:nth-of-type(22) .revenue-name:before{
		background: #b21e23;
	}
	.revenue-record-total{
		padding: 0.45rem 0;
		text-align: center;
		background: #f8b551;
		color: #fff;
		font-size: 0.3rem;
	}
	.revenue-record-total>span{
		margin-left: 0.15rem;
		font-size: 0.32rem;
	}
	.revenue-record-list .revenue-record-item:nth-of-type(even){
		background: #f4faff;
	}
	.revenue-record-item{
		padding: 0.28rem 0.2rem;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
		display: flex;
	}
	.revenue-record-item>span{
		flex: 1;
	}
	.revenue-payway{
		text-align: center;
	}
	.revenue-amount{
		text-align: right;
	}
	
	
	
	
	
	
	
	
</style>
