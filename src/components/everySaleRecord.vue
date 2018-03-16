<template>
	<div class="fullDiv">
		<div class="deviceManagement-content page-content">
			<div class="sale-total-content">
				<div class="total-sale-volume">
					<p><span style="margin-right: 0.08rem; font-size: 0.36rem;">&yen;</span>{{consumeDetail.totalPrice}}</p>
					<p>销售额</p>
				</div>
				<div class="total-sale-num">
					<p>{{consumeDetail.totalCup}}</p>
					<p>杯数</p>
				</div>
			</div>
			<div class="everySale-list">
				<scroller 
					:on-infinite="infinite"
	              	ref="scroller">
	        <div style="height: 1000px;" v-show="scroller_show"></div>
					<ul>
						<li class="everySale-item" v-for="(item, index) in pageConsumeDetail" :key="index">
							<div class="sale-time">{{item.orderDate}}</div>
							<div class="sale-detail">
								<p class="order-sn">
									<span style="width: 1.3rem;">订单号：</span>
									<span style="width: 4.4rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{item.orderSn}}</span>
								</p>
								<p class="sale-kind">
									<span class="sale-name">{{item.goodsName}}</span>
									<span class="sale-num">x{{item.orderAmount}}</span>
									
								</p>
								<p class="sale-price">
									<span class="present-price">单价：&yen;{{item.orderPrice}}</span>
									<span class="original-price">原价：&yen;{{item.goodsPrice}}</span>
								</p>
								<p class="sale-desc">
									<span class="total-sale-price"><i>&yen;</i>{{item.orderPrice}}</span>
									<span class="pay-way">{{item.payType}}</span>
								</p>
								
							</div>
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
//import { addWord ,editWord} from '@/vuex/actions'
//import VueRouter from 'vue-router'
export default {
	data () {
	    return {
	        page: 1
	    }
	},
	computed: {
	  	...mapGetters([
		      'consumeDetail',
		      'scroller_show'
		]),
		pageConsumeDetail() {
			setTimeout(() => {
		        if(this.$refs.scroller){
		   	    	this.$refs.scroller.resize()
		   	    }
		   	})
			if(this.consumeDetail.orderList){
				return this.consumeDetail.orderList.slice(0,this.page*15)
			}
			
	   }
	},
	methods: {
		infinite() {
	 		setTimeout(() => {
	 			this.page++
	 			if(this.consumeDetail.orderList.slice(this.page*15).length==0){
	 				this.$refs.scroller.finishInfinite(true)
	 				return
	 			}
	 			setTimeout(() => {
		            this.$refs.scroller.finishInfinite();
		        })
	   			   
				  
	        }, 400)
	 	}
	},
	created() {
		this.$store.commit('scroller_show_status', true)    
		document.title=localStorage.getItem('everySiteRecord') ? localStorage.getItem('everySiteRecord') : "亚都咖啡机"
		const id = window.location.hash.split('/')[2].split('&')[0]
		const start_date=window.location.hash.split('/')[2].split('&')[1]
		const end_date=window.location.hash.split('/')[2].split('&')[2]
        this.$store.dispatch('getConsumeDetail',{
      		 params:{
			    station_id: id,
			    start_date: start_date,
			    end_date: end_date
			 }
      	})
    }
}
</script>
<style scoped>	
	.deviceManagement-content{
		position: relative;
		font-size: 0.28rem;
	}
	.sale-total-content{
		padding: 0.2rem;
		background: #f8b551;
		display: flex;
		color: #fff;
		height: 1.67rem;
	}
	.sale-total-content>div{
		flex: 2;
		text-align: center;
	}
	.sale-total-content>div p:first-child{
		font-size: 0.44rem;
		padding: 0.14rem 0 0.05rem;
	}
	.everySale-list{
		position: absolute;
		left: 0;
		right: 0;
		top: 1.67rem;
		bottom: 0;
		overflow-y: auto;
	}
	.everySale-list ul .everySale-item:nth-of-type(even){
		background: #F4FAFF;
	}
	.everySale-item{
		display: flex;
		background-image: url(../assets/image/border.png);
	    background-repeat: repeat-x;
	    background-position: 0 bottom;
	    background-size: auto 1px;
		padding: 0.2rem;
		align-items: center;
	}
	.everySale-item .sale-time{
		width: 1.3rem;
		text-align: center;
		line-height: 1.3;
		margin-right: 0.2rem;
		margin-left: -0.1rem;
		color: #ababab;
	}
	.sale-detail{
		width: 5.7rem;
	}
	.sale-detail>p{
		display: flex;
		justify-content: space-between;
		line-height: 1.7;
		align-items: center;
	}
	.sale-detail .order-sn{
		color: #333;
		justify-content: flex-start;
		margin-right: -0.2rem;
		padding-bottom: 0.08rem;
	}
	.sale-kind .sale-name{
		color: #333;
		font-size: 0.30rem;
	}
	.sale-kind .sale-num{
		color: #ed5349
	}
	.sale-desc .total-sale-price{
		color: #ed5349;
		font-size: 0.36rem;
		
	}
	.sale-desc .total-sale-price>i{
		margin-right: 0.06rem;
		font-size: 0.28rem;
	}
	.sale-desc .pay-way{
		color: #333;
		font-size: 0.30rem;
	}
</style>
