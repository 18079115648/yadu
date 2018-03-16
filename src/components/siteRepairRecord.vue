<template>
	<div class="fullDiv">
		<div class="page-content">
			<ul class="page-content-list">
				<li class="page-content-item">
					<p class="item-tit">
						<span class="clean-person">224</span>
						<span class="clean-time">
							<p>2015-05-07</p>
							<p>2015-05-07</p>
						</span>
					</p>
					<div class="item-detail">
						<span>fsfsf</span>
						<span>未清洁</span>
						<span>已清洁</span>
					</div>
				</li>
			</ul>
			
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
	.page-content-item{
		border-bottom: 0.2rem solid #eee;
		font-size: 0.28rem;
	}
	.item-tit{
		padding: 0.28rem 0.2rem;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px
	}
	.item-tit>span{
		flex: 1;
	}
	.item-tit>span.clean-time{
		text-align: right;
	}
	.item-detail{
		background: #f4faff;
		padding: 0.2rem;
		display: flex;
		flex-wrap: wrap;
	}
	.item-detail>span{
		width: 50%;
		padding: 0.06rem 0;
		text-align: right;
	}
	.item-detail>span:nth-of-type(odd){
		text-align: left;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-y;
	    background-position: right 0;
	    background-size: auto 1px
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
	.clean-site{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
</style>
