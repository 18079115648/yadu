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
						<div class="device-list-content">
							
							<div class="device-list-item" v-for="(item,index) in device_list" :key="index">
								<Collapse v-if="item.status==2" @on-change="resizeHeight">
									<Panel name="1">
									    <div class="deviceItem-show clear">
								        	<div class="device-status error">异常</div>
								        	<div class="device-detail">
								        		<p class="clear"><span class="device-number">{{item.sn}}</span><span class="device-site">{{item.stationName}}</span></p>
								        		<p class="device-address">{{item.address}}</p>
								        		<p class="operate">{{item.managerName}}<span>{{item.mobile}}</span></p>
								        	</div>
								        </div>
									    <div slot="content">
									    	<div class="abnormal-list">
									    		<p v-for="(obj,key) in item.warning_list" :key="key">
									    			<span class="abnormal-number">{{obj.sn}}</span>
									    			<span class="abnormal-desc">{{obj.msg}}</span>
									    			<span class="abnormal-time">{{obj.warningDate}}</span>
									    		</p>
									    	</div>
									    	<p class="operate-btn">
									    		<span style="visibility: hidden;" class="btn-restart" @click="rebootConfirm(item)">重启</span>
								    			<span style="visibility: hidden;" class="btn-openDoor" @click="opendoorConfirm(item)">开门</span>
								    			<span class="btn-checkDetail"><a :href="'#/deviceDetail/'+item.id">查看详情</a></span>
								    			
								    		</p>
									    </div>
									</Panel>
									
								</Collapse>
								
								<div class="device-item" v-if="item.status==1">
									<a :href="'#/deviceDetail/'+item.id">
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
		        	<mt-picker :slots="device_status" :value-key="'status'"  :itemHeight="32" @change="onStatusChange"></mt-picker>
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
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Picker } from 'mint-ui';
import qs from 'qs'
Vue.component(Picker.name, Picker);
import { MessageBox } from 'mint-ui'
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
      		status: 0
      		
	        
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
		      'device_status',
		      'device_worker',
		      'device_list',
		      'scroller_show'
		  ])
    },
	methods :{
		resizeHeight() {
			setTimeout(() => {
				this.$refs.scroller.resize()
			},0)
		},
		opendoorConfirm(item) {
    		var btn=event.target
    		if(btn.classList.contains('disabled')){
    			return
    		}
    		MessageBox.confirm('确定执行远程开门?').then(action => {
			    btn.classList.toggle('disabled')
				this.$store.dispatch('remoteOperate',qs.stringify({
					device_id: item.id,
					clevel: 'OPENDOOR'
				}))
	    		setTimeout(function(){
	    			btn.classList.toggle('disabled',false)
	    		},4000)
			},err =>{
				
			});
    		
    		
    	},
    	rebootConfirm(item) {
    		var btn=event.target
    		if(btn.classList.contains('disabled')){
    			return
    		}
    		MessageBox.confirm('确定执行远程重启?').then(action => {
			    btn.classList.toggle('disabled')
	    		this.$store.dispatch('remoteOperate',qs.stringify({
					device_id: item.id,
					clevel: 'REBOOT'
				}))
	    		setTimeout(function(){
	    			btn.classList.toggle('disabled',false)
	    		},4000)
			},err =>{
				
			});
    		
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
	      		this.getDeviceList()
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
	   		this.getDeviceList()
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
	   		this.getDeviceList()
	   		this.type=undefined
	   	},
	   	getDeviceList() {
	   		api.getDeviceList({
	       		params:{
					    operator_id:this.operatorSelected.id,
					    status:this.statusSelected.id,
					    user_id:this.workerSelected.id,
					    page:this.page,
					    page_size: this.page_size  
					 }
	       }).then(res => {   
	            	this.$store.commit('get_device_list', res)
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
	          this.getDeviceList()
	          if (this.$refs.scroller)
	            this.$refs.scroller.finishPullToRefresh()
	        }, 400)
	    },
	   	infinite(){
	   		console.log('1')
	   		setTimeout(() => {
	   			api.getDeviceList({
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
		            	this.$store.commit('get_device_list', res)
		            	this.page++ 
		            	this.savePage=this.page
					    this.$nextTick(() => {
					    	this.$refs.scroller.finishInfinite();
				        })
		        }, err => {
						this.$refs.scroller.finishInfinite(true)
		        })
	   			   
				  
	        }, 400)
	   		
			
	 	}
    },
    activated() {
    	if(this.status==2){
    		document.title = '故障量';
    	}else{
    		document.title = '设备总量';
    	}
    	
    	this.page=this.savePage
    	this.$refs.scroller.resize()
    },
    deactivated(){
    	this.savePage=this.page
    	this.page=100000
    },
    mounted() {
    	this.$store.commit('scroller_show_status', true)    
    	this.status = window.location.hash.split('?')[0].split('/')[2]
    	if(this.status==2){
    		this.device_status[0].defaultIndex=2
    		this.statusChange={
    			status: '异常',
          		id:2
    		}
    		this.statusSelected={
    			status: '异常',
          		id:2
    		}
    		document.title = '故障量';
    	}else{
    		document.title = '设备总量';
    	}
    	
    	this.$store.dispatch('getOperator')
    	this.$store.dispatch('getWorker')
    	this.getDeviceList()
    	
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
		color: #333;
		position: relative;
		background: #fff;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
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
		background: #ed5349;
		border-color: #fcdddb;
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
		display: flex;
		padding: 0.2rem 0 0.1rem;
		margin: 0 -0.2rem;
	}
	.operate-btn>span{
		flex: 1;
		margin: 0 0.2rem;
		text-align: center;
		background: #508cee;
		padding: 0.1rem 0;
		color: #fff;
		border-radius: 0.06rem;
	}
	.operate-btn>span.disabled{
		background: #ccc !important;
		color: #eee;
	}
	.btn-checkDetail>a{
		display: block;
		width: 100%;
		height: 100%;
		color: #fff;
	}
	.device-item{
		padding: 0.3rem 0.25rem 0.2rem;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	.device-item>a{
		display: block;
		width: 100%;
		height: 100%;
		color: #666;
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
</style>
