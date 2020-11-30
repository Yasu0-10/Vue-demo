<template>
	<div>
		<h1>Swiper</h1>
		<swiper :options="swiperOption">
      <swiper-slide class="swiper-slide">第一页</swiper-slide>
      <swiper-slide class="swiper-slide">第二页</swiper-slide>
      <swiper-slide class="swiper-slide">第三页</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>   <!-- 分页 -->
      <div class="swiper-button-prev" slot="button-prev"></div>  <!-- 箭头左 --> 
      <div class="swiper-button-next" slot="button-next"></div>  <!-- 箭头右 -->
		</swiper>
	</div>
</template>
<script>
export default {
	data() {
		return {
			swiperOption: {
				//显示分页
				pagination: {
					el: '.swiper-pagination',
					clickable: true //允许分页点击跳转
				},
				//设置点击箭头
				navigation: {
					nextEl: '.swiper-button-next', 
					prevEl: '.swiper-button-prev'
				},
				//自动轮播
				// autoplay: {
				// 	delay: 400
				// },
				//开启循环模式
				loop: true,
				//开启鼠标滚轮控制Swiper切换
				mousewheel: true
			}
		};
	}
};
</script>