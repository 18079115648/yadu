<template>

	<div class="fullDiv">
		<div class="deviceManagement-content page-content" style="font-size: 0.28rem;">
			<div class="device-select">
				<span v-for="(item, index) in selectKind" v-if="status!=2 || index!=1" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>
			<div class="device-list">
				<scroller 
					:on-refresh="refresh"
					:on-infinite="infinite"
		             ref="scroller">
		             <div style="height: 1000px;" v-show="scroller_show"></div>
					<div class="device-list-content" v-if="monitor_list.length>0">
						<div class="device-list-item" v-for="(item,index) in monitor_list"  :key="index">
							<Collapse v-if="item.status==2" @on-change="resizeHeight">
								<Panel name="1">
								    <div class="deviceItem-show clear">
							        	<div class="device-status error">预警</div>
							        	<div class="device-detail">
							        		<p class="clear"><span class="device-number">{{item.sn}}</span><span class="device-site">{{item.stationName}}</span></p>
							        		<p class="device-address">{{item.address}}</p>
							        		<p class="operate">{{item.managerName}}<span>{{item.mobile}}</span></p>
							        	</div>
							        </div>
								    <div slot="content">
								    	<div class="abnormal-list">
								    		<p v-for="(obj,key) in item.warning_list" :key="key">
								    			<!--<span class="abnormal-number">{{obj.sn}}</span>-->
								    			<span class="abnormal-desc">{{obj.msg}}</span>
								    			<span class="abnormal-time">{{obj.warningDate}}</span>
								    		</p>
								    	</div>
								    	<p class="operate-btn">
							    			<a :href="'#monitorDetail/'+item.id" class="btn-checkDetail mobile-btn">查看详情</a>
							    		</p>
								    </div>
								</Panel>
								
							</Collapse>
							
							<div class="device-item" v-if="item.status==1">
								<a :href="'#/monitorDetail/'+item.id">
									<div class="deviceItem-show clear">
							        	<div class="device-status">正常</div>
							        	<div class="device-detail">
							        		<p class="clear"><span class="device-number">{{item.sn}}</span><span class="device-site">{{item.stationName}}</span></p>
							        		<p class="device-address">{{item.address}}</p>
							        		<p class="operate">{{item.managerName}}<span>{{item.mobile}}</span></p>
							        	</div>
							        </div>
								</a>
								
							</div>
						</div>
					    
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
		        	<mt-picker :slots="device_operator" :value-key="'value'"  :itemHeight="32" @change="onOperatorChange"></mt-picker>
		        </div>
		        <div slot="footer">	</div>
		    </Modal>
		    <Modal
		        v-model="moadal_status"
		        :closable='false'
		        @on-cancel="modal_cancel"
		        class-name="join-modal"
		        :transition-names="['move-down','fade']">
		        <div slot="header" class="modal-header">
		        	<span class="btn-cancel" @click="modal_cancel">取消</span>
		        	<span class="btn-confirm" @click="status_confirm" >确认</span>
		        </div>
		        <div class="modal-content">
		        	<mt-picker :slots="monitor_status" :value-key="'status'" :itemHeight="32" @change="onStatusChange"></mt-picker>
		        </div>
		        <div slot="footer">	</div>
		    </Modal>
		    <Modal
		        v-model="moadal_worker"
		        :closable='false'
		        @on-cancel="modal_cancel"
		        class-name="join-modal"
		        :transition-names="['move-down','fade']">
		        <div slot="header" class="modal-header">
		        	<span class="btn-cancel" @click="modal_cancel">取消</span>
		        	<span class="btn-confirm" @click="worker_confirm">确认</span>
		        </div>
		        <div class="modal-content">
		        	<mt-picker :slots="device_worker" :value-key="'value'"  :itemHeight="32" @change="onWorkerChange" ></mt-picker>
		        </div>
		        <div slot="footer">	</div>
		    </Modal>
		</div>
	</div>
	
	
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import api from '@/fetch/api'
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
    data () {
	    return {
	        type:undefined,
	        selectKind:[{
	        	text: '运营商'
	        },{
	        	text: '状态'
	        },{
	        	text: '责任人'
	        }],
	        
	        operatorChange:{},
	        statusChange:{},
	        workerChange:{},
	        
	        operatorSelected:{},
	        statusSelected:{},
	        workerSelected:{},
	        
	        page:1,
      		page_size: 15,
      		savePage: 1,
      		status: 0,
	        
	    }
    },
    computed: {
	  	  moadal_operator() {
	  		  return this.type==0 ? true : false
	  	  },
	  	  moadal_status() {
	  		  return this.type==1 ? true : false
	  	  },
	  	  moadal_worker() {
	  		  return this.type==2 ? true : false
	  	  },
	  	  ...mapGetters([
		      'device_operator',
		      'monitor_status',
		      'device_worker',
		      'monitor_list',
		      'scroller_show'
		  ])
    },
	methods :{
		resizeHeight() {
			setTimeout(() => {
				this.$refs.scroller.resize()
			},0)
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
	   		this.page=1
	   		this.selectKind[0].text=this.operatorSelected.value.substr(0,6)
	   		
	   		this.selectKind[2].text='责任人'
	   		this.workerSelected={
	   			id:0,
	   			value:'全部'
	   		}
	   		this.$store.dispatch('getWorker',{
	      		 params:{
				    operator_id:this.operatorSelected.id
				 }
	      	}).then(() =>{
	      		this.getMonitorList()
	      	})
	   		this.type=undefined
	   	},
	    onStatusChange(picker, values) {
            	const selected=values[0]
			    if(selected){
			    	this.statusChange=selected	  
			    }
	    },
	    status_confirm() {
	    	this.statusSelected=this.statusChange
	   		this.page=1
	   		this.selectKind[1].text=this.statusSelected.status.substr(0,6)
	   		this.getMonitorList()
	   		this.type=undefined
	   	},
	   	onWorkerChange(picker, values) {
//			console.log(values[0])
			const selected=values[0]
		    if(selected){
		    	this.workerChange=selected      	
		    }
	   	},
	   	worker_confirm() {
	   		this.workerSelected=this.workerChange
	   		this.page=1
	   		this.selectKind[2].text=this.workerSelected.value.substr(0,6)
	   		this.getMonitorList()
	   		this.type=undefined
	   	},
	   	
	   	getMonitorList() {
	   		api.getMonitorList({
	       		params:{
					    operator_id:this.operatorSelected.id,
					    status:this.statusSelected.id,
					    user_id:this.workerSelected.id,
					    page:this.page,
					    page_size: this.page_size  
					 }
	        }).then(res => {   
	            	this.$store.commit('get_monitor_list', res)
	            	this.page++  
	            	this.$store.commit('scroller_show_status', false)    
				    this.$nextTick(() => {
				    	this.$refs.scroller.scrollTo(0,0,false)
					    this.$refs.scroller.resize()
					})
	        }, err => {
	
	        })
	   	},
	   	refresh() {
	  		this.page=1
	        setTimeout(() => {
	          this.getMonitorList()
	          if (this.$refs.scroller)
	            this.$refs.scroller.finishPullToRefresh()
	        }, 400)
	    },
	   	infinite(){
	   		setTimeout(() => {  
	   			api.getMonitorList({
		       		params:{
						    operator_id:this.operatorSelected.id,
						    status:this.statusSelected.id,
						    user_id:this.workerSelected.id,
						    page:this.page,
						    page_size: this.page_size  
						 }
		        }).then(res => {   
	   					if(res.result.data.length==0){
					      	this.$nextTick(() => {
							    this.$refs.scroller.finishInfinite(true)
							})	
							return
				        }
		            	this.$store.commit('get_monitor_list', res)
		            	this.page++  
		            	this.savePage=this.page
					    this.$nextTick(() => {
					    	this.$refs.scroller.finishInfinite();
				        })
		        }, err => {
						this.$refs.scroller.finishInfinite(true)
		        })
	   			   
				  
	        }, 800)
	   		
			
	 	}
    },
    activated() {
    	document.title = '预警量';
    	this.page=this.savePage
    	this.$refs.scroller.resize()
    },
    deactivated(){
    	this.savePage=this.page
    	this.page=100000
    },
    created() {
    	this.$store.commit('scroller_show_status', true)
    	this.status = window.location.hash.split('?')[0].split('/')[2]
    	if(this.status==2){
    		this.monitor_status[0].defaultIndex=2
    		this.statusSelected={
    			status: '预警',
          		id:2
    		}
    		this.statusChange={
    			status: '预警',
          		id:2
    		}
    		document.title = '预警量';
    	}else{
    		document.title = '预警量';
    	}
    	this.$store.dispatch('getOperator')
    	this.$store.dispatch('getWorker')
    	this.getMonitorList()
    },
    beforeRouteLeave(to, from, next) {
		this.type = undefined
		next()
	}

}
</script>
<style scoped>	
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
	.device-status{
		float: left;
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 50%;
		background: #13cc43;
		text-align: center;
		line-height: 1rem;
		color: #fff;
		font-size: 0.28rem;
		border: 0.05rem solid #d0f5d9;
	}
	.device-status.error{
		background: #f9752b;
		border: 0.05rem solid #fee3d5;
		
	}
	.device-detail{
		margin-left: 1.4rem;
		overflow: hidden;
	}
	.device-detail>p{
		padding-bottom: 0.1rem;
	}
	.device-number{
		float: left;
		font-size: 0.28rem;
		color: #000;
	}
	.operate>span{
		margin-left: 0.2rem;
	}
	.device-site{
		float: right;
	}
	.abnormal-list>p{
		display: flex;
		padding: 0.1rem 0;
		color: #333;
	}
	.abnormal-number{
		flex: 3;
	}
	.abnormal-desc{
		flex: 4;
	}
	.abnormal-time{
		flex: 2.5;
		text-align: right;
	}
	.operate-btn{
		text-align: right;
		padding: 0.2rem 0 0.1rem;
		margin: 0 -0.2rem;
	}
	.btn-checkDetail{
		display: inline-block;
		width: 2rem;
		margin: 0 0.2rem;
		text-align: center;
		background: #508cee;
		padding: 0.1rem 0;
		color: #fff;
		border-radius: 0.06rem;
		position: relative;
	}
	.device-item{
		padding: 0.3rem 0.25rem 0.2rem;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px
	}
	.device-item>a{
		display: block;
		width: 100%;
		height: 100%;
		color: #666;
	}
	.ivu-collapse-item .deviceItem-show{
		position: relative;
	}
	.ivu-collapse-item .deviceItem-show:before{
		position: absolute;
		content: '';
		width: 0.3rem;
		height: 0.2rem;
		background: url(../assets/image/updown.png) no-repeat center;
		background-size: 100% 100%;
		right: 0.2rem;
		bottom: 0.24rem;
	}
	.ivu-collapse-item-active.ivu-collapse-item .deviceItem-show:before{
		transform: rotate(180deg);
	}
	.modal-content{
		padding: 0.3rem 0;
	}
</style>
