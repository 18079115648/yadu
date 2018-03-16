<template>
	<div class="fullDiv" id="bodyDIV">
		<keep-alive>
		    <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		
		<v-loading v-show="loading"></v-loading>
	</div>
		
</template>

<script>
import load from './components/loading'
import { mapGetters } from 'vuex'
import '../static/iview.css'

export default {
	data () {
	    return {
	      
	    }
	},
	components: {
        'v-loading': load
    },
    computed: {
	  	...mapGetters([
		    'loading'
		])
    }

}
</script>

<style>


/*配置的 全局input样式*/
.config-item{
	color: #333;
	padding: 0.05rem 0.2rem;
	background: #fff;
	background-image: url(assets/image/border.png);
    background-repeat: repeat-x;
    background-position: 0 bottom;
    background-size: auto 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.config-input{
	outline: none;
	flex: 1;
	border: 0;
	text-align: right;
	padding: 0.25rem 0;
}
.config-confirm{
	margin: 0.6rem 0.3rem;
	font-size: 0.3rem;
	border-radius: 0.08rem;
	text-align: center;
	padding: 0.25rem 0;
	color: #fff;
	background: #508cee;
}

.mint-checklist-title{
	display: none;
}
.mint-checklist .mint-checkbox-core{
	width: 0.36rem;
	height: 0.36rem;
	border-radius: 2px;
}
.mint-checklist a.mint-cell, .mint-checklist a:hover.mint-cell{
	color: #333;
	min-height: 0.44rem;
	padding: 0.2rem 0;
	background: transparent !important;
}
.mint-checklist .mint-cell-wrapper{
	font-size: 0.28rem !important;
	background: transparent !important;
	padding: 0 !important;
}
.mint-checklist .mint-checkbox-input:checked + .mint-checkbox-core{
	border-color: #ccc;
	background: url(assets/image/selected.png) no-repeat center;
	background-size: 100% 90%;
}
.mint-checklist .mint-checkbox-core::after{
	display: none;
}
.repair-list-item a.mint-cell{
	width: 50%;
}


.enlargeImg-modal .ivu-modal-close{
	width: 2rem;
    text-align: right;
    padding-right: 0.1rem;
}
.enlargeImg-modal .ivu-modal-footer{
	display: none;
}

/*圆形单选框*/
.circle-radio{
	font-size: 0.28rem !important;
}
.circle-radio .ivu-radio-input{
	width: 100%;
	height: 100%;
}
.circle-radio .ivu-radio-inner{
	border-radius: 50%;
}
.circle-radio .ivu-radio-inner:after {
	width: 100%;
    height: 100%;
    display: table;
    content: " ";
    background: url(assets/image/circle.png) no-repeat center;
    background-size: 70% 70%;
    /*transition: all .2s ease-in-out;
    transform: scale(0);*/
}

input{
	-webkit-appearance:none;
	vertical-align: middle !important;
	line-height: 1.5 !important;
}
input::-webkit-input-placeholder {
	color: #ccc;
}

.data-none{
	text-align: center;
	position: absolute;
	width: 7.5rem;
	padding: 0.2rem 0;
	top: 0.5rem;
	font-size: 0.28rem;
	color: #ccc;
	letter-spacing: 1px;
}


/*按钮效果*/
.mobile-btn::after{
	border-radius: 0.08rem;
	background-color: #000;
    content: " ";
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute
}
.mobile-btn:active::after{
	opacity: 0.3;
}
.modal-footer>span{
	position: relative;
}


/*加载中样式*/
.mint-toast-icon{
	font-size: 45px !important;
}

@-webkit-keyframes rotate {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes rotate {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}
@-webkit-keyframes dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }

    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35
    }

    to {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }

    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35
    }

    to {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124
    }
}

/*@-webkit-keyframes color {
    0%,to {
        stroke: #d62d20
    }

    40% {
        stroke: #0057e7
    }

    66% {
        stroke: #008744
    }

    80%,90% {
        stroke: #ffa700
    }
}

@keyframes color {
    0%,to {
        stroke: #d62d20
    }

    40% {
        stroke: #0057e7
    }

    66% {
        stroke: #008744
    }

    80%,90% {
        stroke: #ffa700
    }
}*/

 
    .loader {
    width: 0.8rem;
    height: 0.8rem;
    position: relative;
    margin: 0 auto
}

.circular {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto
}

.path {
	
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
    stroke: #508CEE;
}




.product-desc img{
	display: block;
	width: 100%;
	height: auto;
}


/*选择栏样式*/
.device-select .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .device-select .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
	text-align: center;
	font-size: 0.28rem;
	color: #000;
}
.device-select  .ivu-select-selection{
	border: 0;
	
}
.device-select .ivu-select-visible .ivu-select-selection{
	border: 0;
	box-shadow: none;
}
.ivu-select-item{
	text-overflow: ellipsis;
	overflow: hidden;
}


/*时间选择器样式*/
.modal-content .ivu-input{
	border-radius: 0;
	border-color: #e0e0e0;
	outline: none;
}



/*checkbox选择样式修改*/
.clean-record .ivu-checkbox{
	margin-right: 0.1rem;
}



/*设备管理手风琴效果样式修改*/
.device-list{
	border-top: 0.1rem solid #eee;
}
.device-list .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
	height: auto;
	line-height: 1.5;
	padding: 0.3rem 0.25rem 0.2rem;
	background: #fff;
	background-image: url(assets/image/border.png);
    background-repeat: repeat-x;
    background-position: 0 bottom;
    background-size: auto 1px
}
.areasManagement-content .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
	height: auto;
	line-height: 1.5;
	padding: 0.2rem 0.25rem;
	background: #fff;
	background-image: url(assets/image/border.png);
    background-repeat: repeat-x;
    background-position: 0 bottom;
    background-size: auto 1px
}

.maintainUser-list .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
	height: auto;
	line-height: 1.5;
	padding: 0.3rem  0.25rem;
	background: #fff;
	
}
.ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header{
	background: #f9f9f9 !important;
}
.ivu-collapse-content{
	background: #f2f2f2 !important;
}
.ivu-collapse-header .ivu-icon{
	/*position: absolute;
	left: 0.7rem;
	bottom: 0.2rem;*/
	display: none !important;
}
.ivu-collapse-content{
	padding: 0 0.25rem !important;
	border: 0 !important;
}
.ivu-collapse-content-box{
	padding: 0.2rem 0 !important;
}
.ivu-collapse{
	border: 0 !important;
	
}



/*弹框样式修改*/
.ivu-modal-mask{
	background-color:rgba(55, 55, 55, .8);
}
.join-modal{
	overflow-y: hidden !important;
}
.join-modal .ivu-modal{
	position: absolute;
	top: auto;
	bottom: 0;
	margin: 0;
	width: 100% !important;
	
}

.join-modal.time-modal .ivu-modal{
	background: #fff;
}

.materialModal.join-modal .ivu-modal{
	top: 1.8rem;
}

.join-modal .ivu-modal-footer{
	display: none;
}
.join-modal.time-modal .ivu-modal-footer{
	display: block;
	border-top: 0;
}
.join-modal .ivu-modal-content{
	border-radius: 0;
	padding: 0 0.3rem;
}
.join-modal .ivu-modal-header{
	padding: 0;
}
.join-modal .modal-header{
	display: flex;
	justify-content: space-between;
}
.join-modal .modal-header>span{
	flex: 1;
	padding: 0.25rem 0;
	font-size: 0.32rem;
}
.join-modal .modal-header>span.btn-confirm{
	color: #508CEE;
	text-align: right;
}
.join-modal .ivu-modal-header .ivu-modal-header-inner{
	font-weight: normal;
}
.join-modal .ivu-modal-body{
	padding: 0;
}
.join-modal .ivu-modal-footer{
	padding: 12px 0;
}


.enlargeImg-modal .ivu-modal-header-inner{
	font-weight: normal;
	font-size: 0.28rem;
}
.enlargeImg-modal .ivu-modal-footer{
	border: 0;
}
.enlargeImg-modal .ivu-modal{
	top: 0;
}



/*滑动选择表单样式修改*/
.picker-item{
	font-size: 0.32rem !important;
	color: #888;
}
/*.picker{
	max-height: 3.2rem;
}*/
/*.picker .picker-items{
	top: 50%;
	transform: translateY(-50%);
	
}*/



/*tab选择栏样式修改*/
.ivu-tabs-nav{
	width: 100%;
	display: flex;
	background: #fff;
}
.ivu-tabs-nav .ivu-tabs-tab{
	flex: 1;
	text-align: center;
}
.order-content .ivu-tabs-content{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 1rem;
}
.order-content  .ivu-tabs-tab{
	font-size: 0.28rem !important;
	padding: 0.24rem 0 !important;
}
.order-content .ivu-tabs-bar{
	border-bottom: 0.1rem solid #eee;
	color: #999 !important;
	
}
.order-content .ivu-tabs-nav .ivu-tabs-tab-active{
	color: #333;
}
.order-content .ivu-tabs-mini .ivu-tabs-tab{
	font-size: 0.28rem;
	padding: 0;
	height: 0.8rem;
	line-height: 0.8rem;
}

.order-content.ivu-tabs .ivu-tabs-content-animated{
	/*transition: transform .2s ease-in-out*/
}


/*我的红包tab选择栏样式修改*/
.myPackage-container .ivu-tabs-bar{
	width: 100%;
}
.myPackage-container .ivu-tabs-nav .ivu-tabs-tab{
	height: 0.8rem;
	line-height: 0.8rem;
	padding: 0;
}


/*添加地址的地址选择样式*/
.addAddress-edit .ivu-input{
	height: auto;
	padding: 0.2rem 0;
	border: 0;
	border-bottom: 1px solid #eee;
}
.addAddress-edit .ivu-input:focus,.addAddress-edit .ivu-input:hover{
	border: 0;
	box-shadow: none;
}
.addAddress-edit .ivu-cascader-menu .ivu-cascader-menu-item i{
	right: 5px;
}
.addAddress-edit .ivu-cascader-menu .ivu-cascader-menu-item{
	padding: 7px 15px 7px 10px;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
}
.addAddress-edit .ivu-cascader-menu{
	width: 1.76rem;
	min-width: 0;
}
.clear:before{
	content: ' ';
	display: table;
}
.clear:after{
				clear: both;
				content: '';
				display: table;
			}
			.fullDiv{
				overflow-y: auto;
				-webkit-overflow-scrolling:touch;
				width: 100%;
				height: 100%;
			}

.page-content{
	position: absolute !important;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.page-content .device-list{
	position: absolute;
	top: 0.9rem;
	bottom: 0;
	left: 0;
	right: 0;
}
.page-content .device-select{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
			
</style>
