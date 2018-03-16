<template>
	<div class="fullDiv" style="background: #eee;">
		<div class="page-content">
			<div class="financeConfig-content">
				<p class="operate-select">
					<a href="">
						<span>运营商</span>
						<span class="operate-name">选择运营商</span>
					</a>
				</p>
				<div class="config-detail">
					<div class="config-item">
						<span>结算周期（天）</span>
						<input type="tel" placeholder="请输入" class="config-input" />
					</div>
					<div class="config-item">
						<span>提现费率（%）</span>
						<input type="tel" placeholder="请输入" class="config-input" />
					</div>
				</div>
				<div class="config-confirm">确认</div>
			</div>
			
			
		</div>
	</div>
	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui';
import qs from 'qs'
import * as _ from '@/fetch/tool.js'
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
	.financeConfig-content{
		padding-top: 0.2rem;
		font-size: 0.28rem;
	}
	.operate-select{
		margin-bottom: 0.2rem;
	}
	.operate-select>a{
		color: #333;
		display: block;
		display: flex;
		justify-content: space-between;
		padding: 0.3rem 0.2rem;
		background: #fff;
	}
	.operate-name{
		position: relative;
		padding-right: 0.3rem;
	}
	.operate-name:before{
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
	.config-detail{
		background: #fff;
	}
	
</style>
