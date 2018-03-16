<template>
	<div class="fullDiv">
		<div class="operation-content page-content">
			<div class="device-select">
				<span v-for="(item, index) in selectKind" :key="index" @click="selectModal(index)">{{item.text}}<i></i></span>
			</div>
			<div class="operation-radio-group">
				<Radio-group class="operation-radio-inner" v-model="checkedOperationKind" @on-change="changeOperation">
					<li class="operation-radio-list" v-for="data in operationAnalysis">
						<Radio :label="data.type" class="circle-radio">{{data.name}}</Radio>
						<span class="colume-chart">
							<i :style="{width:(data.count/maxCount)*100+'%'}"></i>
						</span>
						<span class="operate-num">{{data.count}}次</span>
					</li>
				</Radio-group>
			</div>
			<dl class="operation-details-list">
				<dt>
					<span class="site-name">站点名称</span>
					<span class="operate-rate">次数</span>
					<span class="operate-person">负责人</span>
				</dt>
				<div class="operation-list-content">
					<scroller 
						:on-infinite="infinite"
		              	ref="scroller">
		              	<div style="height: 1000px;" v-show="scroller_show"></div>
						<dd v-for="data in pageOperationAnalysisList" @click="goSiteOpetationRecord(data)">
							<!--<a :href="'#siteOperationRecord/'+checkedOperation+'&'+data.id+'&'+operatorSelected.id+'&'+beginTime+'&'+endTime">-->
									<span class="site-name">{{data.name}}</span>
									<span class="operate-rate">{{data.count}}</span>
									<span class="operate-person">{{data.managerName}}</span>
							<!--</a>-->
						</dd>
					</scroller>
				</div>
				
			</dl>
			<Modal v-model="moadal_operator" :closable='false' @on-cancel="modal_cancel" class-name="join-modal" :transition-names="['move-down','fade']">
				<div slot="header" class="modal-header">
					<span class="btn-cancel" @click="modal_cancel">取消</span>
					<span class="btn-confirm" @click="operator_confirm">确认</span>
				</div>
				<div class="modal-content">
					<mt-picker :slots="device_operator" :value-key="'value'" :visibleItemCount='device_operator[0].visibleItemCount' :itemHeight="32" @change="onOperatorChange"></mt-picker>
				</div>
				<div slot="footer"> </div>
			</Modal>
			<Modal v-model="moadal_time" :closable='false' @on-cancel="modal_cancel" class-name="join-modal time-modal" :transition-names="['move-down','fade']">
				<div class="modal-content">
					<p class="tip">日期</p>
					<div class="time-select">
						<input type="text" v-model="beginTime" placeholder="开始日期" readonly @focus="blur" class="time-input" @click="showTimePicker=true" />
						<span class="row-line"></span>
						<input type="text" v-model="endTime" readonly @focus="blur" placeholder="结束日期" class="time-input" @click="showTimePicker=true" />
					</div>
				</div>
				<div slot="footer" class="modal-footer">
					<time-picker v-show="showTimePicker" :diffDate=true @hideTimePicker="hideTimepicker" @confirm="confirm"></time-picker>
					<span class="btn-cancel mobile-btn" @click="modal_cancel">取消</span>
					<span class="btn-confirm mobile-btn" @click="time_confirm">确认</span>
				</div>
			</Modal>
			
		</div>

	</div>
</template>

<script>
	import timePicker from '../components/timePicker'
	import { Toast } from 'mint-ui';
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
					showTimePicker: false,
					beginTime: '',
					endTime: '',
					
					operatorSelected:{},
	
					type: undefined,
					selectKind: [{
						text: '运营商'
					}, {
						text: '日期'
					}],
					
					checkedOperation: '',
					page: 1
				}
		},
		components: {
				timePicker
		},
		computed: {
				moadal_operator() {
					return this.type == 0 ? true : false
				},
				moadal_time() {
					return this.type == 1 ? true : false
				},
				...mapGetters([
					'device_operator',
					'operationAnalysis',
					'operationAnalysisList',
					'maxCount',
					'scroller_show'
	
				]),
				checkedOperationKind() {
				  	if(this.checkedOperation==''){
				  		if(this.operationAnalysis.length>0){
				  			return this.checkedOperation=this.operationAnalysis[0].type
				  		}
				  		
				  	}
				  	return this.checkedOperation
				},
				pageOperationAnalysisList() {
					setTimeout(() => {
				        this.$refs.scroller.resize();
				    })
					return this.operationAnalysisList.slice(0,this.page*15)
				}
		},
		activated() {
	   	    document.title = '运维分析';
	   	    this.$refs.scroller.resize()
	    },
		created() {
			this.$store.commit('scroller_show_status', true)    
			document.title = '运维分析'
			this.$store.dispatch('getOperator')
			this.$store.dispatch('getOperationAnalysis')
			this.getCurDate()
		},
		beforeRouteLeave(to, from, next) {
			this.type = undefined
			next()
		},

		methods: {
				blur() {
					event.target.blur()
				},
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
		   		this.page=1
		   		this.$refs.scroller.scrollTo(0,0,false)
		   		this.selectKind[0].text=this.operatorSelected.value.substr(0,6)
		   		this.$store.dispatch('getOperationAnalysis',{
		      		 params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					 }
		      	}).then(() =>{
		      		this.checkedOperation=this.operationAnalysis[0].type
		      	})
		   		this.type=undefined
		   	},
		   	
		   	time_confirm() {
		   		if(!this.beginTime){
		   			Toast({
					  message: '请选择日期',
					  position: 'bottom',
					  duration: 1500
					});
					return
		   		}
		   		this.page=1
		   		this.$refs.scroller.scrollTo(0,0,false)
		   		this.selectKind[1].text=this.beginTime.substr(5)+'/'+this.endTime.substr(5)
		   		this.$store.dispatch('getOperationAnalysis',{
		      		 params:{
					    operator_id:this.operatorSelected.id,
					    start_date: this.beginTime,
					    end_date: this.endTime,
					 }
		      	}).then(() =>{
		      		this.checkedOperation=this.operationAnalysis[0].type
		      	})
		   		this.type=undefined
		   		
		   	},
		   	
		   	changeOperation(id) {
		   		    this.page=1
		   		    this.$refs.scroller.scrollTo(0,0,false)
			   		this.checkedOperation=id
			   		this.$store.dispatch('getOperationAnalysisType',{
			   			 params:{
						    operator_id:this.operatorSelected.id,
						    type: this.checkedOperation,
						    start_date: this.beginTime,
						    end_date: this.endTime
						 }
			   		})
		   	},
		   	goSiteOpetationRecord(data) {
		   		localStorage.setItem('siteOperationRecord', data.name)
		   		window.location.hash='#siteOperationRecord/'+this.checkedOperation+'&'+data.id+'&'+this.operatorSelected.id+'&'+this.beginTime+'&'+this.endTime
		   	},
		   	getCurDate() {
		 		let date = new Date()
	            let year = date.getFullYear()
	            let month = (date.getMonth() + 1) >9 ? date.getMonth() + 1 : '0'+(date.getMonth() + 1)
            	let today = date.getDate()>9 ? date.getDate() : '0'+date.getDate()
	            this.beginTime = year + '-' + month + '-' + '01'
	            this.endTime = year + '-' + month + '-' + today
		 	},
		 	infinite() {
		 		setTimeout(() => {
		 			this.page++
		 			if(this.operationAnalysisList.slice(this.page*15).length==0){
		 				this.$refs.scroller.finishInfinite(true)
		 				return
		 			}
		 			setTimeout(() => {
			            this.$refs.scroller.finishInfinite();
			        })
		   			   
					  
		        }, 400)
		 	}
		}
	}
</script>

<style scoped>
	.device-select {
		display: flex;
		position: relative;
	}
	
	.device-select>span {
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
	
	.device-select>span>i {
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
	
	.modal-content {
		padding: 0.3rem 0;
	}
	
	.modal-content>span {
		display: inline-block;
		padding: 0 0.2rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border-radius: 0.1rem;
		background: #2DB7F5;
		margin: 0 0.1rem;
		color: #fff;
	}
	
	.modal-content .tip {
		color: #333333;
		padding-bottom: 0.2rem;
		font-size: 0.28rem;
	}
	
	.time-select {
		display: flex;
	}
	
	.time-select .time-input {
		width: 2.9rem;
		outline: none;
		border: 1px solid #eee;
		padding: 0.15rem 0;
		font-size: 0.28rem;
		text-align: center;
	}
	
	.row-line {
		float: left;
		width: 0.7rem;
		height: 0;
		border-bottom: 1px solid #ddd;
		margin: 0 0.2rem;
		position: relative;
		top: 0.3rem;
	}
	
	.modal-footer {
		margin: 0 -0.1rem;
		display: flex;
		padding: 0.6rem 0;
	}
	
	.modal-footer>span {
		flex: 1;
		margin: 0 0.1rem;
		text-align: center;
		padding: 0.2rem 0;
		font-size: 0.28rem;
		background: #d2d2d2;
		color: #fff;
		border-radius: 0.08rem;
	}
	
	.modal-footer>span.btn-confirm {
		background: #13cc43;
	}
	
	.operation-radio-group {
		width: 100%;
		padding: 0.15rem 0.2rem;
		border-top: 0.1rem solid #eee;
		height: 2.54rem;
	}
	
	.operation-radio-inner {
		width: 100%;
	}
	
	.operation-radio-list {
		width: 100%;
		list-style: none;
		display: flex;
		align-items: center;
		line-height: 0.3rem;
	}
	
	.circle-radio {
		padding: 0.15rem 0;
	}
	
	.operation-radio-list .colume-chart {
		flex: 1;
		height: 0.3rem;
		margin: 0rem .5rem 0 .3rem;
		position: relative;
	}
	
	.operation-radio-list .colume-chart>i {
		display: block;
		height: 100%;
		width: 50%;
		background-color: #8FC31F;
		text-align: center;
		color: #fff;
	}
	
	.operation-radio-list>span.operate-num {
		height: 0.3rem;
		font-size: .28rem;
		color: #666;
		font-family: pingfangSC-Light;
		width: 1.3rem;
	}
	
	.operation-radio-group .ivu-radio-group-vertical .ivu-radio-wrapper {
		height: .3rem;
		line-height: .3rem;
		font-size: .28rem;
		color: #333;
		font-family: pingfangSC-Regular;
	}
	
	.operation-details-list {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 3.44rem;
	}
	
	.operation-details-list dt,
	.operation-details-list dd {
		height: .8rem;
		text-align: center;
		line-height: .8rem;
		font-size: .28rem;
		padding: 0 0.2rem;
		font-family: pingfangSC-Regular;
		display: flex;
		background-color: #F4FAFF;
	}
	
	.operation-details-list dd {
		height: auto;
		line-height: 1.5;
		padding: 0;
		color: #333;
		background-image: url(../assets/image/border.png);
		background-repeat: repeat-x;
		background-position: 0 bottom;
		background-size: auto 1px;
		padding: 0.25rem 0.2rem;
		flex: 1;
		display: flex;
	}
	.operation-details-list dd>a{
		
	}
	
	.operation-details-list dt {
		background-color: #f2f2f2;
	}
	
	.operation-details-list dd:nth-of-type(odd) {
		background-color: #fff;
	}
	
	.operation-details-list dt span,
	.operation-details-list dd span {
		flex: 1;
	}
	
	.operation-details-list .site-name {
		text-align: left;
	}
	
	.operation-details-list .operate-person {
		text-align: right;
	}
	.operation-list-content{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0.8rem;
		overflow-y: auto;
	}
</style>