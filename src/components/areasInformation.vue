<template>
	<div class="fullDiv">
		<div class="deviceManagement-content">
			<div class="areasInformation-list">
				<div class="areasInformation-item" v-for="(item,index) in areasInfo" :key="index">
					<p class="area-item-tit">
						<span class="area-name">{{item.regionName}}</span>
						<span class="area-admin">{{item.managerName}}<i>{{item.mobile}}</i></span>
					</p>
					<ul>
						<li class="area-site-item" v-for="(obj,key) in item.station_list" :key="key">
							<span class="site-name">{{obj.stationName}}</span>
							<span class="area-admin">{{obj.managerName}}<i>{{obj.mobile}}</i></span>
						</li>
					</ul>
				</div>
				
			</div>
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
	      'areasInfo',
	    ])
    },
	created() {
		document.title = '片区信息';
		this.$store.dispatch('getAreasList')
	    
	}
}
</script>
<style scoped>	
	.deviceManagement-content{
		position: relative;
		font-size: 0.28rem;
	}
	.area-item-tit{
		color: #333;
		padding: 0.28rem 0.2rem;
		background: #eee;
		display: flex;
		justify-content: space-between;
	}
    .area-admin>i{
		margin-left: 0.16rem;
	}
	.area-site-item{
		padding: 0.28rem 0.2rem;
		display: flex;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	.area-site-item>span.area-admin{
		width: 3rem;
		text-align: right;
	}
	.area-site-item>span.site-name{
		flex: 1;
	}
</style>
