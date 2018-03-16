<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<ul class="operateDetail-content">
				<li class="operateDetail-item">
					<span class="detail-tit">编号</span>
					<span class="detail-text">001</span>
				</li>
				<li class="operateDetail-item">
					<span class="detail-tit">名称</span>
					<span class="detail-text">12554454</span>
				</li>
				<li class="operateDetail-item">
					<span class="detail-tit">类型</span>
					<span class="detail-text">001</span>
				</li>
				<li class="operateDetail-item">
					<span class="detail-tit">联系人</span>
					<span class="detail-text">001<i class="mobile">182255525</i></span>
				</li>
				<li class="operateDetail-item">
					<span class="detail-tit">分成比例</span>
					<span class="detail-text">0.3</span>
				</li>
				<li class="operateDetail-item">
					<span class="detail-tit">邮箱地址</span>
					<span class="detail-text">001</span>
				</li>
				<li class="operateDetail-item">
					<span class="detail-tit">场所</span>
					<span class="detail-text address">邮箱地址、邮箱地址、邮箱地址、邮箱地址、邮箱地址、邮箱地址、邮箱地址、邮箱地址</span>
				</li>
				<li class="operateDetail-item remarks">
					<span class="detail-tit">备注</span>
					<span class="detail-text">001</span>
				</li>
				
				
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
	}
}
</script>
<style scoped>	
	.deviceManagement-content{
		position: relative;
		font-size: 0.28rem;
		background: #eee;
	}
	.operateDetail-item{
		display: flex;
		padding: 0.28rem 0.2rem;
		background: #fff;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	.operateDetail-item span.detail-tit{
		flex:1
	}
	.operateDetail-item span.detail-text{
		flex:2;
		text-align: right;
		color: #333;
	}
	.operateDetail-item span.detail-text.address{
		text-align: left;
	}
	.operateDetail-item.remarks{
		flex-direction: column;
	}
	.operateDetail-item.remarks span.detail-text{
		text-align: left;
		padding-top: 0.14rem;
	}
</style>
