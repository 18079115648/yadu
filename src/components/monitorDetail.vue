<template>
	<div class="fullDiv" style="background: #eee; font-size: 0.28rem;">
		<div class="deviceDetail-content">
			<div class="deviceDetail-top">
				<div class="device-status" v-if="curMonitorDetail.status==1">正常</div>
				<div class="device-status error" v-else >预警</div>
				<div class="device-message1">
					<p class="device-number">设备号：{{curMonitorDetail.sn}}</p>
					<p class="device-site">站点：{{curMonitorDetail.stationName}}</p>
				</div>
			</div>
			<div class="deviceDetail-bottom">
				<p class="device-tit">运营状态</p>
				<ul class="abnormal-list">
					<li v-for="(item,index) in curMonitorDetail.warning_list" :key="index">
						<!--<span class="abnormal-number">{{item.sn}}</span>-->
		    			<span class="abnormal-desc">{{item.msg}}</span>
		    			<span class="abnormal-time">{{item.warningDate}}</span>
					</li>
				</ul>
				<p class="remain-date" v-if="curMonitorDetail.remain_list"><span style="color: #000;">物料剩余记录时间：</span><span>{{curMonitorDetail.remainDate}}</span></p>
				<ul class="abnormal-list remain-list" v-if="curMonitorDetail.remain_list">
					<li class="remain-num" v-for="(item,index) in curMonitorDetail.remain_list" :key="index">
						<!--<span class="abnormal-number">{{item.sn}}</span>-->
		    			<span class="abnormal-num" v-for="(value,key) in item"><i>{{key}}</i><i>{{value}}</i></span>
					</li>
				</ul>
				<ul class="device-message2">
					<li class="device-address" @click="goMap">{{curMonitorDetail.address}}</li>
					<li class="device-operate" @click="callPhone(curMonitorDetail.mobile)">{{curMonitorDetail.managerName}}<span class="phone">{{curMonitorDetail.mobile}}</span></li>
				</ul>
			</div>
			
			<!--<p class="operate-btn">
    			<span class="btn-restart mobile-btn" @click="rebootConfirm">远程重启</span>
    			<span class="btn-openDoor mobile-btn" @click="opendoorConfirm">远程开门</span>
    		</p>-->
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
	        
	    }
    },
    computed: {
  	    ...mapGetters([
	        'curMonitorDetail'
	    ])
    },
    methods: {
    	goMap() {
    		var lat=this.curMonitorDetail.latitude
    		var lng=this.curMonitorDetail.longitude
    		window.location.href="yd://yadu.ydd100.cn?page=map&lat="+lat+"&lng="+lng
    		window.webkit.messageHandlers.Redirect.postMessage("yd://yadu.ydd100.cn?page=map&lat="+lat+"&lng="+lng)
    	},
    	callPhone(phone) {
    		console.log("yd://yadu.ydd100.cn?page=phone&phone="+phone)
    		window.location.href="yd://yadu.ydd100.cn?page=phone&phone="+phone
			window.webkit.messageHandlers.Redirect.postMessage("yd://yadu.ydd100.cn?page=phone&phone="+phone)
    	},
    	
    	opendoorConfirm(e) {
    		var btn=e.target
    		if(btn.classList.contains('disabled')){
    			return
    		}
    		MessageBox.confirm('确定执行远程开门?').then(action => {
			    btn.classList.toggle('disabled')
				this.$store.dispatch('remoteOperate',qs.stringify({
					device_id: this.curMonitorDetail.id,
					clevel: 'OPENDOOR'
				}))
	    		setTimeout(function(){
	    			btn.classList.toggle('disabled',false)
	    		},4000)
			},err =>{
				
			});
    		
    		
    	},
    	rebootConfirm(e) {
    		var btn=e.target
    		if(btn.classList.contains('disabled')){
    			return
    		}
    		MessageBox.confirm('确定执行远程重启?').then(action => {
			    btn.classList.toggle('disabled')
	    		this.$store.dispatch('remoteOperate',qs.stringify({
					device_id: this.curMonitorDetail.id,
					clevel: 'REBOOT'
				}))
	    		setTimeout(function(){
	    			btn.classList.toggle('disabled',false)
	    		},4000)
			},err =>{
				
			});
    		
    	},
    	initData() {
    		document.title = '预警详情';
	  		const id = window.location.hash.split('/')[2]
	//		if(this.curMonitorDetail.id==id){
	//			return
	//		}
	        this.$store.dispatch('getMonitorDetail',{
	        	params:{
				    station_id:id
				}
	        })
    	}
    	
    },
  	created() {
    	this.initData()
    }

}
</script>
<style scoped>	
	.deviceDetail-top{
		height: 3.1rem;
		background: #508cee;
		position: relative;
		padding-top: 0.6rem;
		color: #fff;
	}
	.device-status{
		margin: 0 auto 0.3rem;
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 50%;
		background: #13cc43;
		text-align: center;
		line-height: 1rem;
		border: 0.05rem solid #38a6aa;
		font-size: 0.28rem;
	}
	.device-status.error{
		background: #f9752b;
		border-color: #9483a0;
	}
	.device-message1{
		text-align: center;
	}
	.device-message1>p{
		padding: 0.05rem 0;
	}
	.device-number{
		font-size: 0.28rem;
	}
	
	.deviceDetail-bottom{
		background: #fff;
		padding-top: 0.2rem;
	}
	.device-tit{
		height: 0.42rem;
		line-height: 0.42rem;
		padding-left: 0.8rem;
		position: relative;
		font-size: 0.28rem;
		color: #000;
		margin-bottom: 0.2rem;
	}
	.device-tit:before{
		position: absolute;
		left: 0.2rem;
		top: 0;
		content: '';
		height: 0.42rem;
		width: 0.42rem;
		background: url(../assets/image/device.png) no-repeat center;
		background-size: 100%;
	}
	.abnormal-list, .device-message2{
		padding: 0 0.2rem;
		border-bottom: 0.2rem solid #eee;
	}
	.abnormal-list>li{
		display: flex;
		padding: 0.22rem 0;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
		position: relative;
		bottom: -1px;
	}
	.device-message2>li{
		padding: 0.22rem 0;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
		position: relative;
		bottom: -1px;
		padding-left: 0.6rem;
		position: relative;
	}
	.device-message2>li:before{
		position: absolute;
		content: '';
		left: 0;
		top: 0.12rem;
		width: 0.36rem;
		height: 0.5rem;
		
	}
	.device-message2>li:after{
		position: absolute;
		content: '';
		width: 0.12rem;
		height: 0.3rem;
		right: 0;
		top: 50%;
		margin-top: -0.17rem;
		background: url(../assets/image/right_arror.png) no-repeat center;
		background-size: 100%;	
	}
	.device-address:before{
		background: url(../assets/image/address.png) no-repeat center;
		background-size: 100%;
	}
	.device-operate:before{
		background: url(../assets/image/person.png) no-repeat center;
		background-size: 100%;
	}
	.device-operate .phone{
		margin-left: 0.2rem;
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
		padding: 0.4rem 0.1rem 0;
	}
	.operate-btn>span{
		flex: 1;
		margin: 0 0.1rem;
		text-align: center;
		background: #ed5349;
		padding: 0.2rem 0;
		border-radius: 0.08rem;
		color: #fff;
		font-size: 0.28rem;
		position: relative;
	}
	.operate-btn>span.disabled{
		background: #ccc !important;
		color: #eee;
	}
	.operate-btn>span.btn-openDoor{
		background: #13cc43;
	}
	.abnormal-num{
		display: flex;
		flex: 1;
		justify-content: space-between;
	}
	.remain-list.abnormal-list{
		display: flex;
		flex-wrap: wrap;
	}
	.abnormal-list li.remain-num:nth-child(odd){
		width: 50%;
		padding-right: 0.6rem;
	}
	.abnormal-list li.remain-num:nth-child(even){
		width: 50%;
		padding-left: 0.6rem;
	}
	.remain-date{
		height: 0.8rem;
		line-height: 0.8rem;
		padding: 0 0.2rem;
		display: flex;
		justify-content: space-between;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	
</style>
