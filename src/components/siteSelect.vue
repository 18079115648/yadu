<template>
	<div class="fullDiv">
		<div class="siteSelect-content">
			<p class="search-tit">附近</p>
			<ul class="clear">
				<li v-for="(item,index) in stationList.near" :key="index" @click="selectStation(item)">{{item.value}}</li>
			</ul>
			<p class="search-tit">全部</p>
			<ul class="clear">
				
				<li v-for="(obj,key) in stationList.all" v-if="key!=0" :key="key" @click="selectStation(obj)">{{obj.value}}</li>
			</ul>
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
	data () {
	    return {
	      
	    }
	},
  	computed: {
	   
  	    ...mapGetters([
	        'stationList'
	    ])
  	},
	methods :{
		selectStation(item) {
			this.$store.commit('save_station',item)
			window.history.back()
		}
	},
	created() {
		document.title = '选择站点';
		var lat=localStorage.getItem('lat')
		var lng=localStorage.getItem('lng')
//		if(lat==null || lng==null){
//	    	return
//	    }
    this.$store.dispatch('getStationList',{
	    	params:{
				    location:lng+','+lat  
			}
    })
//  this.$store.dispatch('getStationList') 
  }
}
</script>
<style scoped>	
	.search-tit{
		font-size: 0.28rem;
		position: relative;
		padding: 0.2rem 0.15rem;
	}
	.search-tit:before{
		content: '';
		display: block;
		position: absolute;
	}
	.siteSelect-content ul{
		margin-bottom: 0.2rem;
	}
	.siteSelect-content li{
		height: 0.55rem;
		border-radius: 0.25rem;
		padding: 0 0.4rem;
		line-height: 0.55rem;
		margin: 0.15rem;
		background: #eff2f5;
		float: left;
	}
	
</style>
