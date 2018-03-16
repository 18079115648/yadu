<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<div class="feed-list">
				<!--<scroller 
					 :on-infinite="infinite"
		             ref="scroller">-->
					<ul>
						<li class="feed-item">

							<p class="feed-tit">
								<span class="feed-person">11</span>
								<span class="feed-time">11</span>
							</p>
							<div class="feed-detail clear">
								<div class="feed-kind-item" >
									<span class="feed-name">11</span>
									<span class="feed-num">11</span>
								</div>
								<div class="feed-kind-item" >
									<span class="feed-name">11</span>
									<span class="feed-num">11</span>
								</div>
								<div class="feed-kind-item" >
									<span class="feed-name">11</span>
									<span class="feed-num">11</span>
								</div>
								<div class="feed-kind-item" >
									<span class="feed-name">11</span>
									<span class="feed-num">11</span>
								</div>
							</div>
						</li>
					</ul>
				<!--</scroller>-->
			</div>
			
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
    	
        
        page:1,
        page_size: 8
        
    }
  },
  computed: {
  	  ...mapGetters([
	      'device_operator',
	      'site_list',
	      'addMaterielList'
	  	])
  },
	methods :{
		
		
//	   	infinite(){
//	   		setTimeout(() => {  
//	   			api.getAddMaterielList({
//		       		params:{
//						    operator_id:this.operatorSelected.id,
//						    start_date: this.beginTime,
//						    end_date: this.endTime,
//						    station_id: this.siteSelected.id,
//						    page:this.page,
//						    page_size: this.page_size  
//						 }
//		        }).then(res => {   
//	   					if(res.result.data.length==0){
//					      	this.$nextTick(() => {
//							    this.$refs.scroller.finishInfinite(true)
//							})	
//							return
//				        }
//		            	this.$store.commit('get_add_materiel_list', res)
//		            	this.page++   
//					    this.$nextTick(() => {
//					    	this.$refs.scroller.finishInfinite();
//				        })
//		        }, err => {
//						this.$refs.scroller.finishInfinite(true)
//		        })
//	   			   
//				  
//	        }, 800)
//	   		
//			
//	 	}
	   	
		
	},
	created() {
    	
       	
       	
    }

}
</script>
<style scoped>	
	.deviceManagement-content{
		position: relative;
	}
	.feed-list{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
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
	.feed-kind-item{
		float: left;
		width: 50%;
		
		display: flex;
	}
	.feed-kind-item>span{
		flex: 1;
		padding: 0.08rem 0;
		font-size: 0.28rem;
	}
	.feed-kind-item>span.feed-num{
		position: relative;
		text-align: center;
	}
	.feed-detail .feed-kind-item:nth-child(even)>span.feed-num{
		text-align: right;
		
	}
	.feed-detail .feed-kind-item:nth-child(even)>span.feed-name{
		text-align: center;
		border-left: 1px solid #eee;
	}
</style>
