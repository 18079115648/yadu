<template>
	<div class="fullDiv" style="background: #eee; font-size: 0.28rem; color: #333;">
		<div class="feedOperate-content">
			<p class="feedOperate-tit">
				<a>
					<span class="feed-site">站点</span>
					<span class="feed-site-name" v-if="selectedStation.value">{{selectedStation.value}}</span>
					<!--<span class="feed-site-name" v-if="!selectedStation.value">选择站点</span>-->
				</a>
				
			</p>
			<div class="repair-select-content">
				<div class="repair-list-item">
					<p class="repair-tit">1.选择故障类型</p>
					<mt-checklist
				      class="fault-list"
				      v-model="repairDetailSlected"
				      :options="repairDetail.list">
				    </mt-checklist>
					<!--<Checkbox-group v-model="repairDetailSlected" class="fault-list">
				        <Checkbox v-for="(item, index) in repairDetail.list" :disabled="repairDetail.flag==0" :key="index" :label="item.id">{{item.name}}</Checkbox>   
				    </Checkbox-group>-->
				</div>
				<div class="repair-list-item">
					<p class="repair-tit">2.选择维修方案</p>
					<mt-checklist
				      class="fault-list"
				      v-model="repairCase"
				      :options="repairDetail.caseList">
				    </mt-checklist>
					<!--<Checkbox-group v-model="repairCase" class="fault-list">
				        <Checkbox v-for="(item, index) in repairDetail.caseList" :disabled="repairDetail.flag==0" :key="index" :label="item.id">{{item.name}}</Checkbox>   
				    </Checkbox-group>-->
				</div>
			</div>
			<div class="updata-content">
				<div class="updata-tit">
					<div class="updata-tip">
						<p style="padding-top: 0.2rem;">现场照片</p>
						<span v-if="repairDetail.flag==1">仅支持拍照上传</span>
					</div>
					<label v-if="repairDetail.flag==1"  class="btn-updata" for="file-input2" @click="openCamera">
						
					</label>
					<!--<input type="file" capture="camera" @change="onFileChange" accept="image/*" id="file-input2" />-->
				</div>
				<div class="updata-img-list" v-if="imgSrc.length>0 || oldImgSrc.length>0">
					
					<span class="updata-img-item" v-for="(value,index) in oldImgSrc" :key="index">
						<i class="deleteImg" v-if="repairDetail.flag==1" @click="deleteOldImg(index)"></i>
						<img :src="value"  @click="enlarge(value,'old')" />
					</span>
					<span class="updata-img-item" v-for="(value,index) in imgSrc" :key="index">
						<i class="deleteImg" v-if="repairDetail.flag==1" @click="deleteImg(index)"></i>
						<img :src="'data:image/png;base64,'+value"  @click="enlarge(value,'new')" />
					</span>
				</div>
			</div>
			<div class="btn-feed-confirm" v-if="repairDetail.flag==1"  :class="{'disabled':repairDetail.flag==0}" @click="addRepairConfirm">确认</div>
			<Modal
				class-name="enlargeImg-modal"
		        v-model="moadal_enlargeImg"
		        :transition-names="['fade','fade']"
		        title="查看图片">
		        <div class="modal-enlargeImg-content">
		        	<img  :src="enlargeImg"  />
		        </div>
		        <div slot="footer">	</div>
		    </Modal>
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui';
import qs from 'qs'
import * as _ from '@/fetch/tool.js'
import api from '@/fetch/api'
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
  data () {
    return {
    	id: undefined,
        repairDetailSlected:[],
        repairCase: [],
        imgSrc:[],
        oldImgSrc:[],
	    moadal_enlargeImg: false,
	    enlargeImg:undefined
    }
  },
	computed: {
	  	  ...mapGetters([
		      'repairDetail',
		      'selectedStation',
		      
		      
		  ])
    },
	methods :{
		getRepairDetail() {
			this.repairDetailSlected.length=0
			this.repairCase.length=0
			this.oldImgSrc.length=0
			this.imgSrc.length=0
			this.id = window.location.hash.split('/')[2]
			var self=this
			this.$store.commit('loading_status', true)
	   		api.getRepairDetail({
	       		params:{
					    id: this.id
					 }
	        }).then(res => {   
	        		this.$store.commit('loading_status', false)
	            	this.$store.commit('get_repair_detail', res)
	            	res.result.list.forEach(function(item){
						if(item.status==1){
							self.repairDetailSlected.push(item.id)
						}
					})
					res.result.caseList.forEach(function(item){
						if(item.status==1){
							self.repairCase.push(item.id)
						}
					})
					if(res.result.pictures){
						res.result.pictures.split(',').forEach((item) =>{
							if(item){
								this.oldImgSrc.push(item)
							}
						})
					}
	        }, err => {
					this.$store.commit('loading_status', false)
	        })
	   	},	

		openCamera() {
			if(this.repairDetail.flag==0){
				Toast({
				  message: '无法修改维修详情',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			if(this.imgSrc.length+this.oldImgSrc.length>3){
				Toast({
				  message: '最多上传4张图片',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			window.location.href="yd://yadu.ydd100.cn?page=camera"
			window.webkit.messageHandlers.Redirect.postMessage("yd://yadu.ydd100.cn?page=camera")

			
			
		},
//		createImage(files) {
////			this.imgSrc = URL.createObjectURL(files)
//			
//			var allLeng=this.imgSrc.length+1;
//			if(allLeng>4){
//				Toast({
//				  message: '最多上传4张图片',
//				  position: 'bottom',
//				  duration: 2000
//				});
//				return
//			}
//			if(!(files.type=='image/png' || files.type=='image/jpg' || files.type=='image/jpeg')){
//				Toast({
//				  message: '请选择图片',
//				  position: 'bottom',
//				  duration: 2000
//				});
//				return
//			}
//          var src=window.URL.createObjectURL(files)
//			this.imgSrc.push(src)          
//      },
        enlarge(value,status) {
			this.moadal_enlargeImg = true
			if(status=='new'){
				this.enlargeImg = 'data:image/png;base64,'+value
			}else{
				this.enlargeImg = value
			}
			
		},
        deleteImg(index) {
        	if(this.repairDetail.flag==0){
				Toast({
				  message: '无法修改维修详情',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
        	this.imgSrc.splice(index, 1);
        },
        deleteOldImg(index) {
			if(this.repairDetail.flag==0){
				Toast({
				  message: '无法修改维修详情',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			this.oldImgSrc.splice(index, 1);
		},
		addRepairConfirm() {
			if(this.repairDetail.flag==0){
				Toast({
				  message: '无法修改维修详情',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			if(this.imgSrc.length+this.oldImgSrc.length<1){
				Toast({
				  message: '请拍照上传现场图片',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			var repair_detail=''
			var repair_case=''
			this.repairDetailSlected.forEach(function(item){
				repair_detail+=','+item
			})
			this.repairCase.forEach(function(item){
				repair_case+=','+item
			})
			if(!repair_detail){
				Toast({
				  message: '请选择故障类型',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			if(!repair_case){
				Toast({
				  message: '请选择维修方案',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			repair_detail=repair_detail.substr(1)
			repair_case=repair_case.substr(1)
			this.uploadImg(repair_detail,repair_case)
			
		},
		uploadImg(repair_detail,repair_case) {
			this.$store.commit('loading_status', true)
			axios.post('/upload/image/base64',  this.imgSrc,{
			    headers: {
			        'Content-Type': 'application/json'
			    }
			})
			.then(res => {
				if(res.data.err_code==0){
					var pictures = res.data.result.join(',') ? res.data.result.join(',')+','+this.oldImgSrc.join(',') : this.oldImgSrc.join(',')
					this.$store.dispatch('addRepair',qs.stringify({
						repair_detail: repair_detail,
						station_id: this.selectedStation.id,
						case_detail : repair_case,
						pictures: pictures,
						id: this.id
					}))
				}else{
					Toast({
					  message: '图片上传失败',
					  position: 'bottom',
					  duration: 2000
					});
				}
				
				
			},err => {
				Toast({
				  message: '图片上传失败',
				  position: 'bottom',
				  duration: 2000
				});
			});
		},
		showPicUrlFromJava(data){
	   	  this.imgSrc.push(data)
	  },
	  initData() {
		  	window.showPicUrlFromJava=this.showPicUrlFromJava
			  document.title = '维修详情';
			  _.getLocation()
		
        this.getRepairDetail()
	  }
		
	},
	mounted(){
		
	},
    deactivated(){
    	this.moadal_enlargeImg = false
    },
	 activated() {
	 	
    	this.initData()
   }

}
</script>
<style scoped>	
	.feedOperate-tit>a{
		padding: 0.25rem 0.2rem;		
		font-size: 0.28rem;
		color: #333;
		background: #fff;
		flex: 1;
		display: flex;
		justify-content: space-between;
	}
	.feed-site-name{
		position: relative;
		padding-right: 0.1rem;
	}
	/*.feed-site-name:before{
		position: absolute;
		content: '';
		width: 0.12rem;
		height: 0.3rem;
		right: 0;
		top: 50%;
		margin-top: -0.17rem;
		background: url(../assets/image/right_arror.png) no-repeat center;
		background-size: 100%;	
	}*/
	.repair-tit{
		padding: 0.2rem;
	}
	.fault-list{
		padding: 0.15rem 0.2rem;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
	}
	.fault-list .ivu-checkbox-wrapper{
		width: 50%;
		margin-right: 0;
		padding: 0.1rem 0;
	}
	.updata-content{
		background: #fff;
		margin-top: 0.2rem;
	}
	.updata-tit{
		padding: 0.2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.updata-tip>p{
		font-size: 0.28rem;
		color: #000;
	}
	.updata-tip>span{
		color: #999;
	}
	.btn-updata{
		width: 1.4rem;
		height: 1.4rem;
		border: 1px solid #eee;
		position: relative;
	}
	.btn-updata:before{
		position: absolute;
		content: '';
		width: 0.56rem;
		height: 0.56rem;
		left: 50%;
		top: 50%;
		margin-left: -0.28rem;
		margin-top: -0.28rem;
		background: url(../assets/image/add.png) no-repeat center;
		background-size: 100%;
	}
	#file-input2{
		display: none;
		opacity: 0;
	}
	.updata-img-list{
		display: flex;
		padding: 0.2rem 0.23rem;
	}
	.updata-img-list>span{
		width: 1.4rem;
		height: 1.4rem;
		position: relative;
		border: 1px solid #eee;
		margin: 0 0.18rem;
	}
	.deleteImg{
		position: absolute;
		width: 0.36rem;
		height: 0.36rem;
		background: url(../assets/image/delete.png) no-repeat;
		background-size: 100% 100%;
		right: 0;
		top: 0;
		z-index: 10;
	}
	.updata-img-list>span>img{
		display: block;
		max-width: 100%;
		max-height: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.btn-feed-confirm{
		margin: 0.5rem 0.3rem;
		font-size: 0.3rem;
		border-radius: 0.08rem;
		text-align: center;
		padding: 0.25rem 0;
		color: #fff;
		background: #508cee;
	}
	.btn-feed-confirm.disabled{
		background: #ccc;
		color: #eee;
	}
	.modal-enlargeImg-content{
		height: auto;
		margin: 0 auto;
		position: relative;
	}
	.modal-enlargeImg-content img{
		display: block;
		width: 100%;
		height: auto;
		
	}
</style>
