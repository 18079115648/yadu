<template>
	<div class="fullDiv">
		<div class="page-content">
			<div class="siteOrderRecord">
				<div class="siteOrder-item">
					<span class="maintain-name">李四</span>
					<span class="order-time">2015-05-07</span>
				</div>
				<div class="siteOrder-item">
					<span class="maintain-name">李四</span>
					<span class="order-time">2015-05-07</span>
				</div>
				<div class="siteOrder-item">
					<span class="maintain-name">李四</span>
					<span class="order-time">2015-05-07</span>
				</div>
				<div class="siteOrder-item">
					<span class="maintain-name">李四</span>
					<span class="order-time">2015-05-07</span>
				</div>
			</div>
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import timePicker from '../components/timePicker'
import api from '@/fetch/api'
export default {
  data () {
    return {
       
    }
  }
}
</script>
<style scoped>	
	.siteOrderRecord .siteOrder-item:nth-of-type(even){
		background: #F4FAFF;
	}
	.siteOrderRecord .siteOrder-item{
		padding: 0.3rem 0.2rem 0.3rem 0.3rem;
		font-size: 0.28rem;
		color: #333;
		display: flex;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	.siteOrder-item>span{
		flex: 1;
		position: relative;
	}
	.order-time{
		text-align: right;
		padding-right: 0.3rem;
	}
	.order-time:before{
		position: absolute;
	    content: '';
	    width: 0.14rem;
	    height: 0.33rem;
	    right: 0;
	    top: 50%;
	    margin-top: -0.14rem;
	    background: url(../assets/image/right_arror.png) no-repeat;
	    background-size: 100%;	
	}
</style>
