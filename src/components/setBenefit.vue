<template>
	<div class="fullDiv" style="background: #eee;">
		<div class="setBenefit-content">
			<div class="config-item">
				<span>优惠名称</span>
				<input type="tel" placeholder="请输入优惠名称" class="config-input" />
			</div>
			<div class="select-benefit">
				<p class="benefit-tit">优惠类型</p>
				<div class="benefit-list">
					<Radio-group class="benefit-list-content" v-model="selectedBenefit">
						<Radio :label="item.id" class="circle-radio" v-for="(item,index) in benefitList" :key="index" >{{item.value}}</Radio>	
					</Radio-group>
				</div>
			</div>
			<div class="benefit-detail">
				<p class="benefit-tit">优惠内容</p>
				<div class="benefit-info">
					<!--<div class="config-item">
						<span>优惠金额（元）</span>
						<input type="tel" placeholder="请输入优惠金额" class="config-input" />
					</div>-->
					<!--<div class="suit-goods">
						<p class="suit-goods-tit">赠送产品</p>
						<div class="goods-select">
							<Radio-group class="goods-list-content" v-model="selectedGoods">
								<Radio :label="list.id" class="circle-radio" v-for="(list,index) in goodsList" :key="index" >{{list.value}}</Radio>	
							</Radio-group>
						</div>
					</div>-->
					<div class="exchange-rule">
						<p class="suit-goods-tit">积分兑换规则</p>
						<div class="goods-select">
							<Checkbox-group class="goods-list-rule" v-model="selectedGoods">
								<div class="goods-rule-item" v-for="(list,index) in goodsList" :key="index">
									<Checkbox :label="list.id"  >{{list.value}}</Checkbox>	
									<span class="integral-tit">所需积分</span>
									<input type="tel" class="integral-num" placeholder="请输入" />
								</div>
								
							</Checkbox-group>
						</div>
					</div>
					<div class="config-item">
						<span>使用限制（元）</span>
						<input type="tel" placeholder="请输入优惠订单起始金额" class="config-input" />
					</div>
					<div class="config-item">
						<span>使用限制（元）</span>
						<div class="time-select">
			        		<input type="text" v-model="endTime" placeholder="结束日期" readonly @focus="blur" class="time-input" @click="showTimePicker=true" />
			        		<span class="row-line"></span>
			        		<input type="text" v-model="beginTime" readonly @focus="blur" placeholder="开始日期" class="time-input" @click="showTimePicker=true" />
			        	</div>
					</div>
					<div class="suit-goods">
						<p class="suit-goods-tit">适用产品</p>
						<div class="goods-select">
							<Checkbox-group class="goods-list-content" v-model="selectedGoods">
								<Checkbox :label="list.id" v-for="(list,index) in goodsList" :key="index" >{{list.value}}</Checkbox>	
							</Checkbox-group>
						</div>
					</div>
					
				</div>
			</div>
			<div class="goods-shelves-set">
				<span>状态：</span>
				<div class="shelves-status">
					<Radio-group class="shelves-list-content" v-model="selectedShelves">
						<Radio :label="1" class="circle-radio" >上架</Radio>	
						<Radio :label="0" class="circle-radio" >下架</Radio>
					</Radio-group>
				</div>
			</div>
			<div class="config-confirm benefit-confirm">确认</div>
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
    	showTimePicker: false,
    	beginTime: '',
    	endTime: '',
    	
    	
        benefitList:[{
        	id:1,
        	value:'优惠卷'
        },{
        	id:2,
        	value:'赠送'
        },{
        	id:3,
        	value:'红包'
        },{
        	id:4,
        	value:'优惠卷1'
        },{
        	id:5,
        	value:'赠送1'
        },{
        	id:6,
        	value:'红包1'
        }],
        goodsList:[{
        	id:1,
        	value:'优惠卷'
        },{
        	id:2,
        	value:'赠送'
        },{
        	id:3,
        	value:'红包'
        },{
        	id:4,
        	value:'优惠卷1'
        },{
        	id:5,
        	value:'赠送1'
        },{
        	id:6,
        	value:'红包1'
        }],
        selectedBenefit:'1',
        selectedGoods:[],
        selectedShelves: '1'
    }
  },
  methods: {
  	 blur() {
		event.target.blur()
	 }
  }

}
</script>
<style scoped>	
	.setBenefit-content{
		position: relative;
		font-size: 0.28rem;
		color: #333;
		background: #eee;
		padding-bottom: 0.4rem;
	}
	.select-benefit{
		background: #fff;
		margin: 0.2rem 0;
	}
	.benefit-tit{
		padding: 0.25rem 0.2rem;
		
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	}
	.benefit-list-content, .goods-list-content{
		padding: 0.15rem 0.2rem;
		display: flex;
		flex-wrap: wrap;
		
	}
	.benefit-list-content .circle-radio{
		margin-right: 0;
		width: 33.3333%;
		padding: 0.15rem 0;
	}
	.goods-list-content .ivu-checkbox-wrapper, .goods-list-content .ivu-radio-wrapper{
		margin-right: 0;
	    width: 33.3333%;
	    padding: 0.15rem 0;
	    font-size: 0.28rem !important;
	}
	.benefit-detail{
		background: #fff;
	}
	.time-select{
		display: flex;
		flex: 1;
		padding: 0.2rem 0;
		flex-direction: row-reverse
	}
	.time-select .time-input{
		width: 2rem;
		outline: none;
		border: 1px solid #eee;
		padding: 0.15rem 0;
		font-size: 0.28rem;
		text-align: center;
	}
	.row-line{
		float: left;
		width: 0.2rem;
		height: 0;
		border-bottom: 1px solid #ddd;
		margin: 0 0.1rem;
		position: relative;
		top: 0.3rem;
	}
	.suit-goods-tit{
		padding-top: 0.2rem;
		padding-left: 0.2rem;
	}
	.goods-shelves-set{
		display: flex;
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.3rem 0.2rem;
	}
	.shelves-status{
		flex: 1;
		text-align: center;
	}
	.shelves-list-content .circle-radio{
		width: 2rem;
	}
	.config-confirm.benefit-confirm{
		margin: 0.4rem 0.3rem 0;
	}
	.exchange-rule{
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
	    padding-bottom: 0.15rem;
	}
	.goods-rule-item{
		padding: 0 0.2rem;
		display: flex;
	    align-items: center;
	    font-size: 0.28rem;
	}
	.goods-rule-item .ivu-checkbox-wrapper{
		width: 35%;
		padding: 0.25rem 0;
		font-size: 0.28rem !important;
		margin-right: 0;
	}
	.integral-num{
		outline: none;
		border: 1px solid #eee;
		width: 2.4rem;
		text-align: center;
		line-height: 1;
		padding: 0.15rem 0;
	}
	.integral-tit{
		flex: 1;
		color: #999;
	}
</style>
