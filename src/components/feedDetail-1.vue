<template>
	<div class="fullDiv" style="background: #eee;">
		<div class="feedOperate-content">
			<form ref="addMaterieForm">
				<p class="feedOperate-tit">
					<a>
						<span class="feed-site">站点</span>
						<span class="feed-site-name" v-if="selectedStation.value">{{selectedStation.value}}</span>
						<!--<span class="feed-site-name" v-if="!selectedStation.value">选择站点</span>-->
					</a>
					
				</p>
				<div class="feed-name-list clear">
					<div class="feed-name-item" v-for="(item, index) in materielList" :key="index">
						<p class="feed-name" :class="{'active':item.active}">{{item.name}}</p>
						<input type="tel" autocomplete="off" name="item.id" @input="edit_feed_num(item)" :class="{'active':item.active}" class="feed-num" v-model="item.num" placeholder="请输入" />
					</div>
				</div>
				<div class="updata-content">
					<div class="updata-tit">
						<div class="updata-tip">
							<p>现场照片</p>
							<span>仅支持拍照上传</span>
						</div>
						<div class="btn-updata" @click="openCamera">
							
						</div>
						<!--<input type="file" capture="camera" @change="onFileChange" accept="image/*" id="file-input1" />-->
					</div>
					<div class="updata-img-list" v-if="imgSrc.length>0">
						<span class="updata-img-item" v-for="(value,index) in imgSrc" :key="index" >
							<i class="deleteImg" @click="deleteImg(index)"></i>
							<img :src="'data:image/png;base64,'+value"  @click="enlarge(value)" />
						</span>
					</div>
				</div>
			</form>
			
			<div class="btn-feed-confirm" @click="addMaterielConfirm">确认</div>
			<Modal
				class-name="enlargeImg-modal"
		        v-model="moadal_enlargeImg"
		        :transition-names="['fade','fade']"
		        title="查看图片">
		        <div class="modal-enlargeImg-content">
		        	<img v-if="enlargeImg" :src="'data:image/png;base64,'+enlargeImg"  />
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
import Router from 'vue-router'
import * as _ from '@/fetch/tool.js'
import api from '@/fetch/api'
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
	data () {
	    return {
	      imgSrc:[],
	      moadal_enlargeImg: false,
	      enlargeImg:undefined
	    }
	},
  
	computed: {
	  	  ...mapGetters([
	  	  	  'materielList',
		      'feedDetail',
		      'selectedStation'
		  ])
    },
	methods :{
		
		getFeedDetail() {
			var id = window.location.hash.split('/')[2]
			var self=this
			this.$store.commit('loading_status', true)
	   		api.getMaterielDetail({
	       		params:{
					    id: id
					 }
	        }).then(res => {   
	        		this.$store.commit('loading_status', false)
	            	this.$store.commit('get_feed_detail', res)
//	            	res.result.list.forEach(function(item){
//						if(item.status==1){
//							self.repairDetailSlected.push(item.id)
//						}
//					})
//					res.result.caseList.forEach(function(item){
//						if(item.status==1){
//							self.repairCase.push(item.id)
//						}
//					})
	        }, err => {
					this.$store.commit('loading_status', false)
	        })
	   	},	
		
		edit_feed_num(item){
			var number=item.num
			
			if (!/^[1-9]\d*$/.test(number)) {				
                number=number.replace(/^0|\D+/g,'')            
            }
			if(number){
				item.active=true
				item.num=number + item.unitName
				item.number=number
				
				var obj=event.target
				if(obj.setSelectionRange){
					setTimeout(function() { 
						obj.setSelectionRange(number.length, number.length)
					}, 0); 
					
				}
				
				return
			}
			item.active=false
			item.num=''
			item.number=''
			
			
		},
		
		openCamera() {
			if(!this.selectedStation.value){
				Toast({
				  message: '请选择站点',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			if(this.imgSrc.length>3){
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
//		onFileChange(e) {
//			var files = e.target.files[0] || e.dataTransfer.files[0]; 
//			
//			if (!files){
//				return;
//			}
//			this.data.push(files)
////			this.formData.append('name',files)
////			console.log(this.formData)
//          this.createImage(files);
//		},
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
		enlarge(value){
			this.moadal_enlargeImg=true
			this.enlargeImg=value
		},
        deleteImg(index) {
        	this.imgSrc.splice(index, 1);
        },
		addMaterielConfirm() {
			if(!this.selectedStation){
				Toast({
				  message: '请选择站点',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			var materiel_detail=''
			this.materielList.forEach(function(item){
				if(item.active){
					materiel_detail+=','+item.id+':'+item.number
				}
			})
			if(!materiel_detail){
				Toast({
				  message: '请输入所加物料',
				  position: 'bottom',
				  duration: 2000
				});
				return
			}
			materiel_detail=materiel_detail.substr(1)
			this.uploadImg(materiel_detail)
			
			
			
		},
		uploadImg(materiel_detail) {
			this.$store.commit('loading_status', true)
			axios.post('/upload/image/base64',  this.imgSrc,{
			    headers: {
			        'Content-Type': 'application/json'
			    }
			})
			.then(res => {
				if(res.data.err_code==0){
					var pictures=res.data.result.join(',')
					
					this.$store.dispatch('addMateriel',qs.stringify({
						materiel_detail: materiel_detail,
						station_id: this.selectedStation.id,
						pictures: pictures
					}))
				}else{
					Toast({
					  message: '图片上传失败',
					  position: 'bottom',
					  duration: 2000
					});
				}
				
				
			},err=> {
				Toast({
				  message: '图片上传失败',
				  position: 'bottom',
				  duration: 2000
				});
			});
		},
		clearMaterielList() {
			 this.materielList.forEach(function(item){
			 		item.active=false
					item.num=''
					item.number=''
			 })
		},
		showPicUrlFromJava(data){
	   	  this.imgSrc.push(data)
	   }
		
	},
	created() {
		window.showPicUrlFromJava=this.showPicUrlFromJava
		document.title = '加料详情';
		_.getLocation()
		if(this.materielList.length==0){
			  this.$store.dispatch('getMaterielList')
		}
		this.getFeedDetail()
//		this.clearMaterielList()
   }
   
	
}
</script>
<style scoped>	
	.feedOperate-tit>a{
		padding: 0.25rem 0.2rem;		
		border-bottom: 0.2rem solid #eee;
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
	.feed-name-list{
		padding: 0.3rem 0.15rem 0;
		border-bottom: 0.2rem solid #eee;
		background: #fff;
	}
	.feed-name-item{
		float: left;
		width: 1.8rem;
		margin: 0 0.3rem 0.4rem;
		text-align: center;
		position: relative;
		
		-webkit-box-shadow: 0 1px 3px #ccc;
		padding: 0.1rem;
		padding-top: 0.3rem;
	}
	.feed-name-item:before{
		position: absolute;
		content: '';
		width: 100%;
		height: 0.3rem;
		left: 0;
		top: -0.08rem;
		background: url(../assets/image/tip.png) no-repeat center;
		background-size: 80% 100%;
	}
	.feed-name-item .feed-name{
		padding: 0.12rem 0;
		font-size: 0.28rem;
		color: #aaa;
	}
	.feed-name-item .feed-name.active{
		color: #508cee;
	}
	.feed-num{
		display: block;
		width: 100%;
		outline: none;
		border: 0;
		background: #f9f9f9;
		padding: 0.2rem 0;
		text-align: center;
		border-radius: 0.08rem;
		font-size: 0.32rem;
		vertical-align: middle;
	}
	.feed-num.active{
		background: #508cee;
		color: #fff;
	}
	.feed-num::-webkit-input-placeholder{
		color: #ccc;
	}
	.updata-content{
		background: #fff;
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
	#file-input1{
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
		font-size: 0.28rem;
		border-radius: 0.08rem;
		text-align: center;
		padding: 0.25rem 0;
		color: #fff;
		background: #508cee;
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
