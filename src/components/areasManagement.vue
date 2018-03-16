<template>
	<div class="fullDiv">
		<div class="page-content">
			<p class="areasManagement-tit">共<i>16</i>个运营商</p>
			<div class="areasManagement-content">
				<ul class="operate-item">
					<li>
						<p class="operate-total">
							<span class="operate-kind">合作伙伴</span>
							<span class="operate-num">2个</span>
						</p>
						<Collapse>
							<Panel>
							    <div class="operate-show">
						        	<span class="operate-name">李四</span>
						        	<span class="operate-status">正常</span>
						        </div>
							    <div slot="content">
							    	<div class="operate-detail">
							    		<p class="operate-contact">
							    			<span class="mobile">180232211</span>
							    			<span class="email">180232211@qq.com</span>
							    		</p>
							    		<p class="operate-areas">腾飞</p>
							    		<p class="operate-set">
							    			<span class="operate-close">停用</span>
							    		</p>
							    	</div>
							    	
							    </div>
							</Panel>
							
						</Collapse>
						<Collapse>
							<Panel>
							    <div class="operate-show">
						        	<span class="operate-name">李四</span>
						        	<span class="operate-status">正常</span>
						        </div>
							    <div slot="content">
							    	<div class="operate-detail">
							    		<p class="operate-contact">
							    			<span class="mobile">180232211</span>
							    			<span class="email">180232211@qq.com</span>
							    		</p>
							    		<p class="operate-areas">腾飞</p>
							    		<p class="operate-set">
							    			<span class="operate-close">停用</span>
							    		</p>
							    	</div>
							    	
							    </div>
							</Panel>
							
						</Collapse>
					</li>
					<li>
						<p class="operate-total">
							<span class="operate-kind">合作伙伴</span>
							<span class="operate-num">2个</span>
						</p>
						<Collapse>
							<Panel>
							    <div class="operate-show">
						        	<span class="operate-name">李四</span>
						        	<span class="operate-status">正常</span>
						        </div>
							    <div slot="content">
							    	<div class="operate-detail">
							    		<p class="operate-contact">
							    			<span class="mobile">180232211</span>
							    			<span class="email">180232211@qq.com</span>
							    		</p>
							    		<p class="operate-areas">腾飞</p>
							    		<p class="operate-set">
							    			<span class="operate-close">停用</span>
							    		</p>
							    	</div>
							    	
							    </div>
							</Panel>
							
						</Collapse>
						<Collapse>
							<Panel>
							    <div class="operate-show">
						        	<span class="operate-name">李四</span>
						        	<span class="operate-status">正常</span>
						        </div>
							    <div slot="content">
							    	<div class="operate-detail">
							    		<p class="operate-contact">
							    			<span class="mobile">180232211</span>
							    			<span class="email">180232211@qq.com</span>
							    		</p>
							    		<p class="operate-areas">腾飞</p>
							    		<p class="operate-set">
							    			<span class="operate-close">停用</span>
							    		</p>
							    	</div>
							    	
							    </div>
							</Panel>
							
						</Collapse>
					</li>
				</ul>
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
	.areasManagement-tit{
		background: #FFF4EE;
		text-align: center;
		padding: 0.2rem;
		color: #fe7a45;
		font-size: 0.30rem;
		
	}
	.areasManagement-content{
		position: relative;
		font-size: 0.28rem;
	}
	.operate-item>li{
		margin-bottom: 0.3rem;
	}
	.operate-item .operate-total{
		background: #eee;
		padding: 0.2rem;
		display: flex;
		justify-content: space-between;
		color: #000;
	}
	.operate-item .operate-show{
		position: relative;
		display: flex;
		justify-content: space-between;
		padding-right: 0.5rem;
	}
	.operate-item .operate-show .operate-status{
		color: #44c63c;
	}
	.operate-item .operate-show:before{
		position: absolute;
		content: '';
		width: 0.3rem;
		height: 0.2rem;
		background: url(../assets/image/updown.png) no-repeat center;
		background-size: 100% 100%;
		right: 0;
		top: 50%;
		margin-top: -0.12rem;
	}
	.ivu-collapse-item-active.ivu-collapse-item .operate-show:before{
		transform: rotate(180deg);
	}
	.operate-detail>p{
		padding: 0.06rem 0;
	}
	.operate-detail .operate-contact{
		display: flex;
		justify-content: space-between;
	}
	.operate-detail .operate-areas{
		color: #333;
	}
	.operate-set{
		text-align: right;
	}
	.operate-close{
		display: inline-block;
		padding: 0.1rem 0;
		width: 2rem;
		text-align: center;
		background: #ed5349;
		color: #fff;
		border-radius: 0.06rem;
	}
</style>
