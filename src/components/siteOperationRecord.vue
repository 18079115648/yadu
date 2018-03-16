<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<div class="feed-list">
				<scroller 
					 :on-refresh="refresh"
					 :on-infinite="infinite"
		             ref="scroller">
					<ul v-if="type==1">
						<li class="feed-item" v-for="(item, index) in operationAnalysisStation" :key="index" >
							<a :href="'#feedDetail/'+item.id">
								<p class="feed-tit">
									<span class="feed-station">{{item.stationName}}</span>
									<span class="feed-person">{{item.name}}</span>	
									<span class="feed-time">{{item.date}}</span>
								</p>
								<div class="feed-detail clear">
									<div class="feed-kind-item" v-for="(obj, key) in item.materiel_list" :key="key" >
										<span class="feed-name">{{obj.name}}</span>
										<span class="feed-num">{{obj.unitName}}</span>
									</div>
									
								</div>
							</a>
						</li>
					</ul>
					<ul v-if="type==2">
						<li class="feed-item" v-for="(item, index) in operationAnalysisStation" :key="index" >
							<a :href="'#cleanDetail/'+item.id">
								<p class="feed-tit">
									<span class="feed-station">{{item.stationName}}</span>
									<span class="feed-person">{{item.name}}</span>	
									<span class="feed-time">{{item.date}}</span>
								</p>
								<div class="feed-detail clear">
									<div class="feed-kind-item" v-for="(obj, key) in item.clean_list" :key="key" >
										<span class="feed-name">{{obj.name}}</span>
										<span class="feed-num not" v-if="obj.status==0">未清洁</span>
										<span class="feed-num" v-else>已清洁</span>
									</div>
									
								</div>
							</a>
						</li>
					</ul>
					<ul v-if="type==3">
						<li class="feed-item" v-for="(item, index) in operationAnalysisStation" :key="index" >
							<a :href="'#repairDetail/'+item.id">
								<p class="feed-tit">
									<span class="feed-station">{{item.stationName}}</span>
									<span class="feed-person">{{item.name}}</span>	
									<span class="feed-time">{{item.date}}</span>
								</p>
								<div class="repair-content">
									<div class="repair-kind"  >
										<span class="repair-kind-item" v-for="(obj, key) in item.repair_list" v-if='obj.status==1' :key="key">{{obj.name}}</span>
									</div>
									<div class="repair-case" >
										<span class="repair-case-item" v-for="(obj,key) in item.repairCase.split(',')" :key="key">{{obj}}</span>
										<!--<span class="feed-num">{{obj.unitName}}</span>-->
									</div>
								</div>
							</a>
						</li>
					</ul>
				</scroller>
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
    	type:undefined,
    	operator_id:undefined,
        station_id:undefined,
        start_date:undefined,
        end_date:undefined,
        
        page:1,
        page_size: 15
        
    }
  },
  computed: {
  	  ...mapGetters([
	      'operationAnalysisStation'
	  	])
  },
  methods :{
  	
  	    getOperationAnalysisStation() {
  	    	this.page=1
  	    	this.$store.commit('loading_status', true)
  	    	var data=window.location.hash.split('/')[2].split('&')
			this.type = data[0]
			this.station_id=data[1]
			this.operator_id=data[2]
			this.start_date=data[3]
			this.end_date=data[4]
	   		api.getOperationAnalysisStation({
	       		params:{
					    type: this.type,
		      		 	operator_id: this.operator_id,
					    station_id: this.station_id,
					    start_date: this.start_date,
					    end_date: this.end_date,
					    page:this.page,
					    page_size: this.page_size  
					 }
	        }).then(res => {   
	        		this.$store.commit('loading_status', false)
	            	this.$store.commit('get_operation_analysis_station', res)
	            	this.page++   
				    this.$nextTick(() => {
					    this.$refs.scroller.resize()
					})
	        }, err => {
					this.$store.commit('loading_status', false)
	        })
	   	},
	   	refresh() {
	  		this.page=1
	        setTimeout(() => {
	          this.getOperationAnalysisStation()
	          if (this.$refs.scroller)
	            this.$refs.scroller.finishPullToRefresh()
	        }, 400)
	    },
	   	
	   	infinite(){
	   		setTimeout(() => {  
	   			api.getOperationAnalysisStation({
		       		params:{
						    type: this.type,
			      		 	operator_id: this.operator_id,
						    station_id: this.station_id,
						    start_date: this.start_date,
						    end_date: this.end_date,
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
		            	this.$store.commit('get_operation_analysis_station', res)
		            	this.page++   
					    this.$nextTick(() => {
					    	this.$refs.scroller.finishInfinite();
				        })
		        }, err => {
						this.$refs.scroller.finishInfinite(true)
		        })
	   			   
				  
	        }, 400)
	   		
			
	 	}
		
	   	
		
	},
	deactivated(){
    	this.page=1000000
    },
	activated() {
		document.title=localStorage.getItem('siteOperationRecord') ? localStorage.getItem('siteOperationRecord') : "亚都咖啡机"
		this.getOperationAnalysisStation() 	
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
	.feed-item>a{
		color: #666;
	}
	.feed-tit{
		padding: 0.28rem 0.2rem;
		font-size: 0.28rem;
		display: flex;
		color: #333;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px
	}
	.feed-tit>span{
		flex: 1;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.feed-tit>span.feed-person{
		text-align: center;
	}
	.feed-tit>span.feed-time{
		text-align: right;
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
		flex: 1.5;
		padding: 0.08rem 0;
		font-size: 0.28rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.feed-kind-item>span.feed-num{
		flex: 1;
		position: relative;
		text-align: center;
	}
	.feed-kind-item>span.feed-num.not{
		color: #F44336;
	}
	.feed-detail .feed-kind-item:nth-child(even)>span.feed-num{
		text-align: right;
		
	}
	.feed-detail .feed-kind-item:nth-child(even)>span.feed-name{
		text-align: center;
		border-left: 1px solid #eee;
	}
	.repair-content{
		display: flex;
		padding: 0.2rem;
		background: #F4FAFF;
		font-size: 0.28rem;
	}
	.repair-content>div{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.repair-content>div>span{
		padding: 0.06rem 0;
	}
	.repair-case{
		border-left: 1px solid #eee;
		text-align: right;
	}
</style>
