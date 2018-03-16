<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<div class="device-select">
				<span v-for="(item, index) in selectKind" @click="selectModal(index)" :key="index">{{item.text}}<i></i></span>
			</div>
			<div class="feed-list">
				<scroller 
					 :on-refresh="refresh"
					 :on-infinite="infinite"
		             ref="scroller">
		             <div style="height: 1000px;" v-show="scroller_show"></div>
					<ul>
						<li class="feed-item" v-for="(item, index) in repairList" :key="index">
							<a :href="'#repairDetail/'+item.id">
								<p class="feed-tit">
									<span class="feed-site">{{item.stationName}}</span>
									<span class="feed-person">{{item.name}}</span>
									<span class="feed-time">{{item.date}}</span>
								</p>
								<div class="feed-detail clear">
									<div class="feed-kind-item" v-for="(obj,key) in item.repair_list" :key="key">
										<span class="feed-name">{{obj.name}}</span>
										<!--<span class="feed-num">{{obj.unitName}}</span>-->
									</div>
									<div class="feed-kind-item" v-for="(obj,key) in item.repairCase.split(',')" :key="key">
										<span class="feed-name">{{obj}}</span>
										<!--<span class="feed-num">{{obj.unitName}}</span>-->
									</div>
								</div>
							</a>
							
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
		    
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import timePicker from '../components/timePicker'
import api from '@/fetch/api'
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
        },{
        	text: '站点'
        }],
        operatorSelected:{},
        siteSelected:{},
        
        operatorChange:{},
        siteChange:{},
        
        page:1,
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
  	  moadal_site() {
  		  return this.type==2 ? true : false
  	  },
  	  ...mapGetters([
	      'device_operator',
	      'site_list',
	      'repairList',
	      'keepAlive',
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
	   		this.selectKind[2].text='站点'
	   		this.siteSelected={
	   			id:0,
	   			value:'全部'
	   		}
	   		this.$store.dispatch('getStationList',{
	      		 params:{
				    operator_id:this.operatorSelected.id
				 }
	      	}).then(() =>{
	      		this.getRepairList()
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
	   		this.selectKind[2].text=this.siteSelected.value.substr(0,6)
	   		this.getRepairList()
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
	   		this.selectKind[1].text=this.beginTime.substr(5)+'/'+this.endTime.substr(5)
	   		this.getRepairList()
	   		this.type=undefined
	   	},
	   	getRepairList() {
	   		api.getRepairList({
	       		params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					    station_id: this.siteSelected.id,
					    page:this.page,
					    page_size: this.page_size  
					 }
	        }).then(res => {   
	            	this.$store.commit('get_repair_list', res)
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
	          this.getRepairList()
	          if (this.$refs.scroller)
	            this.$refs.scroller.finishPullToRefresh()
	        }, 400)
	    },
	   	infinite(){
	   		setTimeout(() => {  
	   			api.getRepairList({
		       		params:{
						    operator_id:this.operatorSelected.id,
						    start_date: this.beginTime,
						    end_date: this.endTime,
						    station_id: this.siteSelected.id,
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
		            	this.$store.commit('get_repair_list', res)
		            	this.page++  
					    this.$nextTick(() => {
					    	this.$refs.scroller.finishInfinite();
				        })
		        }, err => {
						this.$refs.scroller.finishInfinite(true)
		        })
	   			   
				  
	        }, 400)
	   		
			
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
		this.$store.commit('scroller_show_status', true)    
		document.title="维修记录"
    	this.$store.dispatch('getOperator')
    	this.$store.dispatch('getStationList')
        this.getRepairList()
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
		float: left;
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
	.feed-list{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0.9rem;
	}
	.feed-item{
		border-bottom: 0.2rem solid #eee;
	}
	.feed-tit{
		padding: 0.28rem 0.2rem;
		font-size: 0.28rem;
		display: flex;
		justify-content: space-between;
		color: #333;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px
	}
	.feed-detail{
		background: #f4faff;
		padding: 0.2rem;
	}
	.feed-item a{
		color: #666;
	}
	.feed-kind-item>span.feed-name{
		flex: 1.5;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.feed-kind-item{
		float: left;
		width: 50%;
		
		display: flex;
	}
	.feed-kind-item>span{
		flex: 1;
		padding: 0.08rem 0;
		font-size: 0.28rem;
		border-right: 1px solid #eee;
	}
	.feed-detail .feed-kind-item:nth-child(even)>span.feed-name{
		text-align: right;
		border-right: 0;
	}
</style>
