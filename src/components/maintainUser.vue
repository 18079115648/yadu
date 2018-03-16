<template>
	<div class="fullDiv">
		<div class="deviceManagement-content">
			<div class="device-select">
				<span v-for="(item, index) in selectKind" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>
			<div class="maintainUser-list device-list">
				<scroller 
					
					:on-infinite="infinite"
	              	ref="scroller">
					<div class="maintainUser-list-content">
						<!--<Collapse>
							<Panel name="1">
							    <div class="userItem-show">
						        	<span class="user-name">刘德华</span>
						        	<span class="user-phone">18079115648</span>
						        	<span class="user-kind">代理商</span>
						        	<span class="user-status">正常</span>
						        </div>
							    <div slot="content">
							    	<p class="user-area">苏州科技园启迪区</p>
							    	<p class="user-message">
							    		<span class="user-email">18833337@163.com</span>
							    		<span class="time">2017.07.01</span>
							    	</p>
							    </div>
							</Panel>
							
						</Collapse>-->
						<div style="height: 2000px;" v-show="scroller_show"></div>
						<div class="maintainUser-list-item" v-for="(item,index) in pageOperatorList" :key="index">
							<div class="userItem-show">
					        	<span class="user-name">{{item.name}}</span>
					        	<span class="user-phone">{{item.mobile}}</span>
					        	<span class="user-kind">代理商</span>
					        	<span class="user-status" v-if="item.status==1">正常</span>
					        	<span class="user-status error" v-else>禁用</span>
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
		        	<mt-picker :slots="device_operator" :value-key="'value'" :visibleItemCount='device_operator[0].visibleItemCount' :itemHeight="32" @change="onOperatorChange"></mt-picker>
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
		        	<mt-picker :slots="operator_status" :value-key="'status'"  :itemHeight="32" @change="onStatusChange"></mt-picker>
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

Vue.component(Picker.name, Picker);

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
        }],
        operatorSelected:undefined,
	    statusSelected:undefined,
	    
	    page: 1
    }
  },
  computed: {
  	   moadal_operator() {
  		  return this.type==0 ? true : false
  	   },
  	   moadal_status() {
  		  return this.type==1 ? true : false
  	   },
  	   ...mapGetters([
	      'device_operator',
	      'operator_status',
	      'operatorList',
	      'scroller_show'
	   ]),
	   pageOperatorList() {
			setTimeout(() => {
		        this.$refs.scroller.resize();
		    })
			
			return this.operatorList.slice(0,this.page*15)
		}
  },

	methods :{
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
	   		this.page=1
	   		this.selectKind[0].text=this.operatorSelected.value.substr(0,6)
	   		this.$store.dispatch('getOperatorList',{
	      		 params:{
	      		 	params:{
					     operator_id:this.operatorSelected.id,
					    status:this.statusSelected.id
					}
	      		 },
	      		 data: this
	      	})
	   		this.$refs.scroller.scrollTo(0,0,false)
	   		this.type=undefined
	   		
	   	},
	    onStatusChange(picker, values) {
            	const selected=values[0]
			    if(selected){
			    	this.statusSelected=selected	 
			    }
	    },
	    status_confirm() {
	    	this.page=1
	    	this.selectKind[1].text=this.statusSelected.status.substr(0,6)
	   		this.$store.dispatch('getOperatorList',{
	      		 params:{
	      		 	params:{
					     operator_id:this.operatorSelected.id,
					     status:this.statusSelected.id
					}
	      		 },
	      		 data: this
	      	})
	   		this.$refs.scroller.scrollTo(0,0,false)
	   		this.type=undefined
	   	},
	   	infinite() {
	 		setTimeout(() => {
	 			this.page++
	 			if(this.operatorList.slice(this.page*15).length==0){
	 				this.$refs.scroller.finishInfinite(true)
	 				return
	 			}
	 			setTimeout(() => {
		            this.$refs.scroller.finishInfinite();
		        })
	   			   
				  
	        }, 400)
	 	}
	},
	mounted() {
		
	},
	created() {
		this.$store.commit('scroller_show_status', true)    
		document.title = '运维用户';
    	this.$store.dispatch('getOperator')
    	this.$store.dispatch('getOperatorList',{
	      		 params:{
		      		 	params:{
			        }
	      		 },
	      		 data: this
	    })
    	
    	
    },
    beforeRouteLeave(to, from, next) {
		this.type = undefined
		next()
	}
	
}
</script>
<style scoped>	
	.deviceManagement-content{
		position: absolute;
		font-size: 0.28rem;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
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
	.maintainUser-list{
		position: absolute;
		top: 0.9rem;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.userItem-show{
		display: flex;
	}
	.userItem-show>span{
		flex: 2;
	}
	.userItem-show>span.user-phone{
		flex: 3;
		text-align: center;
	}
	.userItem-show>span.user-status{
		text-indent: 0.4rem;
		position: relative;
		color: #44c63c;
	}
	.userItem-show>span.user-status.error{
		color: #ed5349;
	}
	/*.userItem-show>span.user-status:before{
		position: absolute;
		content: '';
		width: 0.3rem;
		height: 0.2rem;
		background: url(../assets/image/updown.png) no-repeat center;
		background-size: 100% 100%;
		right: 0;
		top: 50%;
		margin-top: -0.13rem;
	}*/
	.ivu-collapse-item-active .userItem-show>span.user-status:before{
		transform: rotate(180deg);
	}
	.user-kind{
		text-align: center;
	}
	.user-area, .user-message{
		padding: 0.06rem 0;
	}
	.user-message{
		display: flex;
		justify-content: space-between;
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
	.maintainUser-list-item{
		padding: 0.3rem 0.25rem;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
</style>
