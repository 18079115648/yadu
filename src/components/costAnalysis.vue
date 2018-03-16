<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<!--<div class="device-select">
				<span v-for="(item, index) in selectKind" v-if="!item.other" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>-->
			<div class="revenue-report-content">
				<!--<div class="revenue-chart">
					<p class="revenue-total">营收总额<span>{{revenueReport.totalPrice}}</span></p>
					<div class="revenue-chart-content">
						<div id="revenue-chart" style="width: 50%; height: 180px;"></div>
						<div class="revenue-detail">
							<div class="revenue-item" v-for="(item,index) in revenueReport.list" :key="index">
								<span class="revenue-name">{{item.goodsName}}</span>
								<span class="revenue-num">{{item.money}}</span>
							</div>
						</div>
					</div>
				</div>-->
				<div class="cost-analysis-list">
					<p class="cost-tit">
						<span class="cost-name">类目</span>
						<span class="cost-num">费用</span>
						<span class="cost-per">占比</span>
					</p>
					<ul>
						<li class="cost-analysis-item">
							<p class="cost-kind">
								<span class="cost-name">原料</span>
								<span class="cost-num">&yen;<i>454545</i></span>
								<span class="cost-per">90%</span>
							</p>
							<div class="progress-bar">
								<span></span>
							</div>
						</li>
					</ul>
				</div>
				
			</div>
			
			<!--<Modal
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
		        		<input type="text" v-model="beginTime" placeholder="开始日期" readonly class="time-input" @click="showTimePicker=true" />
		        		<span class="row-line"></span>
		        		<input type="text" v-model="endTime" readonly placeholder="结束日期" class="time-input" @click="showTimePicker=true" />
		        	</div>
		        </div>
		        <div slot="footer" class="modal-footer">
		        	<span class="btn-cancel" @click="modal_cancel">取消</span>
		        	<span class="btn-confirm" @click="time_confirm">确认</span>
		        </div>
		    </Modal>
		    <time-picker v-show="showTimePicker" @hideTimePicker="hideTimepicker" @confirm="confirm"></time-picker>
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
		        	<mt-picker :slots="material_list" :value-key="'value'" :visibleItemCount='material_list[0].visibleItemCount' :itemHeight="32" @change="onGoodsChange"></mt-picker>
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
		        	<mt-picker :slots="payway" :value-key="'value'" :visibleItemCount='payway[0].visibleItemCount' :itemHeight="32" @change="onPayWayChange" ></mt-picker>
		        </div>
		        <div slot="footer">	</div>
		    </Modal>-->
		    
		    
		    
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import echarts from '@/../static/echarts.js'
import { mapGetters } from 'vuex'
import timePicker from '../components/timePicker'
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
  data () {
    return {
    	showTimePicker: false,
    	beginTime: '',
    	endTime: '',
    	
    	
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
        
        operatorSelected: undefined,
        siteSelected:{},
        goodsSelected: undefined,
        payWaySelected: undefined

	    
	    
	    
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
	      'payway'
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
	   		
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				    goods_id: this.goodsSelected.id,
				    pay_way: this.payWaySelected.id,
				    station_id: this.siteSelected.id
				 }
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
	   	onSiteChange(picker, values) {
	   		const selected=values[0]
		    if(selected){
		    	this.siteSelected=selected	      	
		    }
	   	},
	   	site_confirm() {
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				    goods_id: this.goodsSelected.id,
				    pay_way: this.payWaySelected.id,
				    station_id: this.siteSelected.id
				 }
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
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				    goods_id: this.goodsSelected.id,
				    pay_way: this.payWaySelected.id,
				    station_id: this.siteSelected.id
				 }
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
		    	this.goodsSelected=selected	
		    }
	   		
	   		
	   	},
	   	goods_confirm() {
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				    goods_id: this.goodsSelected.id,
				    pay_way: this.payWaySelected.id,
				    station_id: this.siteSelected.id
				 }
	      	})
	   		this.type=undefined
	   	},
	   	onPayWayChange(picker, values) {
	   		const selected=values[0]
		    if(selected){
		    	this.payWaySelected=selected
		    }
	   		
	   		
	   	},
	   	onPayWay_confirm() {
	   		this.$store.dispatch('getRevenueList',{
	      		 params:{
				    operator_id:this.operatorSelected.id,
				    start_date: this.beginTime,
				    end_date: this.endTime,
				    goods_id: this.goodsSelected.id,
				    pay_way: this.payWaySelected.id,
				    station_id: this.siteSelected.id
				 }
	      	})
	   		this.type=undefined
	   	},

	},

   	created() {
   		document.title = '营收报表';
    	this.$store.dispatch('getOperator')
    	this.$store.dispatch('getStationList')

        this.$store.dispatch('getRevenueList')
        this.$store.dispatch('getRevenueReport')
        
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
		top: 0.8rem;
		overflow-y: auto;
		
	}
	.revenue-chart{
		padding: 0 0.2rem;
		border-top: 0.1rem solid #eee;
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
		display: flex;
		align-items: center;
	}
	.cost-tit{
		background: #f2f2f2;
		padding: 0.2rem 0.2rem 0.2rem 1rem;
		display: flex;
	}
	.cost-tit>span{
		flex: 1;
		color: #333;
	}
	.cost-num{
		text-align: center;
	}
	.cost-per{
		text-align: right;
	}
	.cost-analysis-item{
		padding: 0.25rem 0.2rem 0.25rem 1rem;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	    position: relative;
	}
	.cost-kind{
		display: flex;
	}
	.cost-kind>span{
		flex: 1;
	}
	.cost-kind>span.cost-num>i{
		color: #ed5349;
		margin-left: 4px;
	}
	.progress-bar{
		margin: 0.25rem 0 0.15rem;
		width: 100%;
		height: 0.2rem;
		position: relative;
		background: #ccc;
		border-radius: 0.1rem;
	}
	.progress-bar:before{
		content: '';
		position: absolute;
		left: -0.8rem;
		top: 50%;
		margin-top: -0.15rem;
		display: block;
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 50%;
		background: #508cee;
		
	}
	.progress-bar>span{
		display: block;
		height: 100%;
		border-radius: 0.1rem;
		background: #ed5349;
	}
</style>
