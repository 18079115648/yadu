<template>
	<transition name="fade">
		<div class="loading">
			<div class="loading-bg"></div>
            <mt-spinner color="#26a2ff" :size="36" class="loading-icon" type="snake"></mt-spinner>
		</div>
	</transition>
</template>

<style scoped>
	.loading.fade-enter-avtive,.loading.fade-leave{
	    opacity: 1;
	}
	.loading.fade-enter{
	    opacity: 0;
	}
	.loading.fade-leave-active{
		opacity: 0;
	}
	.loading{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 2000;
		transition: opacity .3s ease;
	}
	.loading .loading-bg{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 2100;
		background: rgba(0,0,0,0.7);
	}
	.loading-icon{
		position: absolute;
		top: 50%;
		z-index: 2105;
		left: 50%;
		margin-left: -18px;
	}
	
</style>


