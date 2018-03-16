<template>
	<div class="fullDiv" style="background: #eee; font-size: 0.28rem;">
		<div class="orderDetail-content">
			<div class="orderDetail-top">
				<span class="order-status" v-if="orderDetails.status === 1">等待接单</span>
				<span class="status-content mobile-btn" v-if="orderDetails.status === 1" @click="workOrder">我要接单</span>
				<span class="order-status" v-if="orderDetails.status === 2" style="color:#13cc43">处理中</span>
				<!--<span class="status-content mobile-btn" v-if="orderDetails.status === 2" @click="finishOrder">处理完成</span>-->
				<span class="order-status" v-if="orderDetails.status === 3" style="color:#13cc43">已完成订单</span>
				
				
			</div>
			<div class="orderDetail-mid">
				<p class="order-maintain" v-if="orderDetails.status != 1">
					<span>运维人员</span>
					<span class="order-person" >{{orderDetails.userName}}<i style="margin-left: 8px;">{{orderDetails.mobile}}</i></span>
				</p>
				<p class="device-message">
					<span class="device-site">{{orderDetails.stationName}}</span>
					<span class="device-number">{{orderDetails.deviceSn}}</span>
				</p>
				<p class="device-address">{{orderDetails.address}}</p>
			</div>
			<div class="orderDetail-bottom">
				<ul class="abnormal-list">
					<li v-for="list in orderDetails.warning_list">
		    			<span class="abnormal-kind">{{list.msg}}</span>
		    			<!--<span class="abnormal-desc" v-if="list.status==1">已处理</span>
		    			<span class="abnormal-desc" v-if="list.status==0">未处理</span>-->
		    			<span class="abnormal-time">{{list.date}}</span>
					</li>
				</ul>
			</div>
			<div class="orderDetail-footer">
				<p>派单号：{{orderDetails.orderSn}}</p>
				<p>派单时间：{{orderDetails.createDate}}</p>
				<p v-if="orderDetails.status!==1">接单时间：{{orderDetails.orderDate}}</p>
				<p v-if="orderDetails.status===3">完成时间：{{orderDetails.finishDate}}</p>
			</div>
		</div>	
	</div>
	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import qs from 'qs'
import { MessageBox } from 'mint-ui'
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
  data () {
    return {
        orderId: undefined
    }
  },
   created() {
    	this.initData()
   },
  computed: {
  	    ...mapGetters([
	        'orderDetails'
	    ])
	},
  methods: {
  	  initData() {
    		this.orderId = window.location.hash.split('/')[2]
		  	document.title = '派单详情';
			this.$store.dispatch('getOrderDetails',{
		    	params:{
				    order_id: this.orderId
				}
		    })
    	},
	  workOrder() {
	  	MessageBox.confirm('确定执行接单?').then(action => {
				  this.$store.dispatch('getWokerOrder', [qs.stringify({order_id: this.orderId}),this.orderId])
				  window.location.reload(true)
		  },err =>{
				
			});
		 
	  },
	  finishOrder() {
	  	MessageBox.confirm('确定订单处理完成?').then(action => {
				  this.$store.dispatch('getFinishOrder', [qs.stringify({order_id: this.orderId}),this.orderId])
				  window.location.reload(true)
		  },err =>{
				
			});
		 
	  }
	  
  }
  

}
</script>
<style scoped>	
	.orderDetail-top{
		padding: 0.1rem 0.2rem;
		display: flex;
		background: #fff;
		justify-content:space-between;
		align-items: center;
		color: #333;
		margin-bottom: 0.2rem;
	}
	.status-content{
		padding: 0.12rem 0.4rem;
		background: #13cc43;	
		color: #fff;
		border-radius: 0.06rem;
		position: relative;
		padding: 0.16rem 0.4rem 0.15rem;
		
		line-height: 1;
	}
	.orderDetail-mid{
		padding: 0.3rem 0.2rem 0.3rem 0.7rem;
		background: #fff;
		margin-bottom: 0.2rem;
	}
	.order-maintain{
		display: flex;
		margin-left: -0.45rem;
		padding-bottom: 0.3rem;
		color: #333;
	}
	.order-maintain>span{
		flex: 1;
	}
	.order-maintain>span.order-person{
		flex: 2;
		text-align: right;
	}
	.device-message{
		display: flex;
		justify-content:space-between;
		color: #000;
		padding-bottom: 0.1rem;
	}
	.device-message .device-site{
		position: relative;
	}
	.device-message .device-site:before{
		position: absolute;
		content: '';
		left: -0.5rem;
		top: 0;
		width: 0.3rem;
		height: 0.4rem;
		background: url(../assets/image/address.png) no-repeat center;
		background-size: 100%;
	}
	.orderDetail-bottom{
		background: #fff;
	}
	.abnormal-list li{
		display: flex;
		padding: 0.25rem 0.2rem;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	.abnormal-list li>span{
		flex: 2;
	}
	.abnormal-list li>span.abnormal-kind{
		flex: 3;
		overflow: hidden;
		text-overflow:ellipsis ;
		white-space: nowrap;
	}
	.abnormal-desc{
		text-align: center;
	}
	.abnormal-time{
		text-align: right;
	}
	.orderDetail-footer{
		padding: 0.1rem 0.2rem;
	}
	.orderDetail-footer>p{
		color: #aaa;
		padding: 0.1rem 0;
	}
</style>
