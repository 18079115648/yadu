<template>
	<div class="fullDiv">
		<Tabs value="1" size="small" class="order-content" @on-click="getstatu">
	        <Tab-pane class="order-list" label="待接单" name="1">
	        	<scroller
	        		:on-refresh="refresh1"
	        		:on-infinite="infinite1"
		            ref="scroller1">
		            <div style="height: 1000px;" v-show="scroller_show[0]"></div>
		        	<ul class="waiting-list">
		        		<li v-for="list in waitingOrder" class="order-item">
							<a @click="gotoDetails(list.orderId)">
		        			<p class="order-top">
		        				<span class="device-address">{{list.stationName}}</span>
		        				<span class="device-number">{{list.orderSn}}</span>
		        			</p>
		        			<ul class="abnormal-list clear">
		        				<li v-for="warning in list.warning_list">{{warning.msg}}</li>
		        			</ul>
							</a>
		        			<p class="order-bottom">
		        				<span class="order-time">{{list.createDate}}</span>
		        				<span class="btn-receiveOrder mobile-btn" @click="workOrder(list.orderId)">我要接单</span>
		        			</p>
		        		</li>
		        	</ul>
	        	</scroller>
	        </Tab-pane>
	        <Tab-pane class="order-list" label="处理中" name="2">
	        	<scroller
	        		:on-refresh="refresh2"
	        		:on-infinite="infinite2"
		            ref="scroller2">
		            <div style="height: 1000px;" v-show="scroller_show[1]"></div>
		        	<ul class="waiting-list">
		        		<li v-for="list in processOrder" class="order-item">
							<a @click="gotoDetails(list.orderId)">
		        			<p class="order-top">
		        				<span class="device-address">{{list.stationName}}</span>
		        				<span class="device-number">{{list.orderSn}}</span>
		        			</p>
		        			<ul class="abnormal-list clear">
		        				<li v-for="warning in list.warning_list">{{warning.msg}}</li>
		        			</ul>
		        			<p class="order-bottom">
		        				<span class="receiveOrder-person">{{list.userName}}<i>{{list.mobile}}</i></span>
		        				<span class="order-time">{{list.orderDate}}</span>
		        			</p>
							</a>
							<!--<p class="order-bottom">
		        				<span class="order-time"></span>
		        				<span class="btn-receiveOrder mobile-btn" @click="finishOrder(list.orderId)">处理完成</span>
		        			</p>-->
		        		</li>
		        		
		        	</ul>
	        	</scroller>
	        </Tab-pane>
	        <Tab-pane class="order-list" label="已完成" name="3">
	        	<scroller
	        		:on-refresh="refresh3"
	        		:on-infinite="infinite3"
		            ref="scroller3">
		            <div style="height: 1000px;" v-show="scroller_show[2]"></div>
		        	<ul class="waiting-list">
		        		<li v-for="list in finishOrder" class="order-item">
							<a @click="gotoDetails(list.orderId)">
		        			<p class="order-top">
		        				<span class="device-address">{{list.stationName}}</span>
		        				<span class="device-number">{{list.orderSn}}</span>
		        			</p>
		        			<ul class="abnormal-list clear">
		        				<li v-for="warning in list.warning_list">{{warning.msg}}</li>
		        			</ul>
		        			<p class="order-bottom">
		        				<span class="receiveOrder-person">{{list.userName}}<i>{{list.mobile}}</i></span>
		        				<span class="order-time">{{list.finishDate}}</span>
		        			</p>
							</a>
		        		</li>
		        	</ul>
	        	</scroller>
	        </Tab-pane>
	    </Tabs>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import qs from 'qs'
import { MessageBox } from 'mint-ui'
import api from '@/fetch/api'
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
  data () {
    return {
		statusAct: 1,
		
		page:[1,1,1],
		savePage:[1,1,1],
		
      	page_size: 15,
      	scroller_show: [true, true, true]
    }
  },
   activated() {
   	    document.title = '派单管理';
    	this.page[this.statusAct-1]=this.savePage[this.statusAct-1]
    	if(this.statusAct==1){
    		this.$refs.scroller1.resize()
    	}else if(this.statusAct==2){
    		this.$refs.scroller2.resize()
    	}else if(this.statusAct==3){
    		this.$refs.scroller3.resize()
    	}
    	
    },
    deactivated(){
    	this.savePage=[1,1,1]
    	this.savePage[this.statusAct-1]=this.page[this.statusAct-1]
    	this.page=[1000000,1000000,1000000]
    },
  created() {
  	document.title = '派单管理';
	this.statusAct = 1
	this.getOrderList()
	this.scroller_show=[true, true, true]
  },
  computed: {
  	    ...mapGetters([
	        'waitingOrder',
	        'processOrder',
	        'finishOrder'
	    ])
	},
  methods: {
  	    getOrderList() {
  	    	this.$store.commit('clearOrder')
			api.getOrderList({
		   		params:{
					    status: this.statusAct,
					    page: this.page[this.statusAct-1],
					    page_size: this.page_size
					 }
		    }).then(res => { 
		    		this.scroller_show=[true, true, true]
		    		if(this.statusAct==1){
		    			this.scroller_show[0]=false
		    			this.$store.commit('get_waiting_order', res)
		    			this.$nextTick(() => {
		    				this.$refs.scroller1.scrollTo(0,0,false)
						    this.$refs.scroller1.resize()
						})
		    		}else if(this.statusAct==2){
		    			this.scroller_show[1]=false
		    			this.$store.commit('get_process_order', res)
		    			this.$nextTick(() => {
		    				this.$refs.scroller2.scrollTo(0,0,false)
						    this.$refs.scroller2.resize()
						})
		    		}else if(this.statusAct==3){
		    			this.scroller_show[2]=false
		    			this.$store.commit('get_finish_order', res)
		    			this.$nextTick(() => {
		    				this.$refs.scroller3.scrollTo(0,0,false)
						    this.$refs.scroller3.resize()
						})
		    		}
		        	this.page[this.statusAct-1]++   
				    
		    }, err => {
		
		    })
	    },
	    refresh1() {
	  		this.page[0]=1
	        setTimeout(() => {
	          this.getOrderList()
	          if(this.$refs.scroller1){
	          	  this.$refs.scroller1.finishPullToRefresh()
	          }
	        }, 400)
	    },
	    refresh2() {
	  		this.page[1]=1
	        setTimeout(() => {
	          this.getOrderList()
	          if(this.$refs.scroller2){
	          	  this.$refs.scroller2.finishPullToRefresh()
	          }
	        }, 400)
	    },
	    refresh3() {
	  		this.page[2]=1
	        setTimeout(() => {
	          this.getOrderList()
	          if(this.$refs.scroller3){
	          	  this.$refs.scroller3.finishPullToRefresh()
	          }
	        }, 400)
	    },
	    infinite1(){
	   		setTimeout(() => { 
	   			api.getOrderList({
		       		params:{
						    status: 1,
						    page: this.page[0],
						    page_size: this.page_size 
						 }
		        }).then(res => {   
	   					if(res.result.data.length==0){
					      	this.$nextTick(() => {
							    this.$refs.scroller1.finishInfinite(true)
							})	
							return
				        }
		            	this.$store.commit('get_waiting_order', res)
		            	this.page[0]++  
		            	this.savePage[0]=this.page[0]
					    this.$nextTick(() => {
					    	this.$refs.scroller1.finishInfinite();
				        })
		        }, err => {
						this.$refs.scroller1.finishInfinite(true)
		        })
	   			   
				  
	        }, 400)
	   		
			
	 	},
	 	infinite2(){
	 		
	   		setTimeout(() => { 
	   			
	   			api.getOrderList({
		       		params:{
						    status: 2,
						    page: this.page[1],
						    page_size: this.page_size 
						 }
		        }).then(res => {   
	   					if(res.result.data.length==0){
					      	this.$nextTick(() => {
							    this.$refs.scroller2.finishInfinite(true)
							})	
							return
				        }
		            	this.$store.commit('get_process_order', res)
		            	this.page[1]++  
		            	this.savePage[1]=this.page[1]
					    this.$nextTick(() => {
					    	this.$refs.scroller2.finishInfinite();
				        })
		        }, err => {
						this.$refs.scroller2.finishInfinite(true)
		        })
	   			   
				  
	        }, 400)
	   		
			
	 	},
	 	infinite3(){
	   		setTimeout(() => { 
	   			
	   			api.getOrderList({
		       		params:{
						    status: 3,
						    page: this.page[2],
						    page_size: this.page_size 
						 }
		        }).then(res => {   
	   					if(res.result.data.length==0){
					      	this.$nextTick(() => {
							    this.$refs.scroller3.finishInfinite(true)
							})	
							return
				        }
		            	this.$store.commit('get_finish_order', res)
		            	this.page[2]++  
		            	this.savePage[2]=this.page[2]
					    this.$nextTick(() => {
					    	this.$refs.scroller3.finishInfinite();
				        })
		        }, err => {
						this.$refs.scroller3.finishInfinite(true)
		        })
	   			   
				  
	        }, 400)
	   		
			
	 	},
  	
	  getstatu(name) {
		this.statusAct = name
		this.page[this.statusAct-1]=1
		this.savePage[this.statusAct-1]=1
		this.getOrderList()
	  },
	  workOrder(orderId) {
	  	  MessageBox.confirm('确定执行接单?').then(action => {
				  this.$store.dispatch('getWokerOrder', [qs.stringify({order_id: orderId}),orderId])
				  
		  },err =>{
				
			});
    		
		  
			
	  },
	  finishOrder(orderId) {
	  	  MessageBox.confirm('确定订单处理完成?').then(action => {
				  this.$store.dispatch('getFinishOrder', [qs.stringify({order_id: orderId}),orderId])
				  
		  },err =>{
				
			});
	  },
	  gotoDetails(orderId) {
		  window.location.href="#waitingOrderDetail/"+orderId
	  }
  }
  

}
</script>
<style scoped>	
	.order-content{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: #eee;
	}
	.order-content .order-item{
		background: #fff;
		margin-bottom: 0.2rem;
		padding: 0 0.2rem;
	}
	.order-list{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.order-top{
		display: flex;
		padding: 0.25rem 0;
		font-size: 0.28rem;
		justify-content: space-between;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
		color: #000;
	}
	.device-address{
		flex: 2;
		padding-left: 0.55rem;
		position: relative;
	}
	.device-address:before{
		position: absolute;
		content: '';
		width: 0.4rem;
		height: 0.42rem;
		left: 0;
		top: 0;
		background: url(../assets/image/site.png) no-repeat center;
		background-size: 100%;
	}	
	.device-number{
		flex: 1;
		text-align: right;
		
	}
	.abnormal-list{
		padding: 0.15rem 0;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	.abnormal-list li{
		float: left;
		padding: 0.06rem 0.4rem;
		margin: 0.15rem 0.2rem;
		color: #ed5349;
		border: 1px solid #ed5349;
		border-radius: 0.06rem;
	}
	.order-bottom{
		display: flex;
		justify-content: space-between;
		padding: 0.1rem 0;
		align-items: center;
		font-size: 0.28rem;
	}
	.order-time{
		color: #bdbdbd;
	}
	.btn-receiveOrder{
		padding: 0.16rem 0.4rem 0.15rem;
		background: #13cc43;
		position: relative;
		color: #fff;
		border-radius: 0.06rem;
		line-height: 1;
	}
	.receiveOrder-person{
		color: #000;
		padding: 0.12rem 0;
	}
	.receiveOrder-person>i{
		margin-left: 0.2rem;
	}
</style>
