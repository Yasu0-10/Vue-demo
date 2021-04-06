<template>
	<div>
		<div class="a1">
			<div id="ec1"></div>
		</div>
	</div>
</template>

<script>
// import echarts from 'echarts'
	export default {
		name: 'Echarts',
		data() {
			return {
				eg: 'echarts',
				ec1: null,
				option: {
					color: ['#f44'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { type: 'shadow' }
					},
					xAxis: [
						{
							type: 'category',
							data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
							axisTick: { alignWithLabel: true }
						}
					],
					yAxis: [
						{ type: 'value' }
					],
					series: [
						{
							name: '每月花费',
							type: 'bar',
							barWidth: '60%',
							data: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356]
						}
					]
				}
			};
		},
		// created () {
		//   this.fn()
		// },
		mounted() {
			// dom渲染后绘制图形，可以放在定时器中，有个动画效果(echarts本身好像就有动画效果？)
			// this.ec1Init()
			setTimeout(() => {
				this.ec1Init();
			}, 0);
			// 执行窗口缩放函数
			this.changeEcharts();
		},
		// 销毁时清除监听，定时器是否也要清除呢？严格来说应该要的。
		destroyed() {
			window.removeEventListener('resize', this.changEcharts);
		},
		methods: {
			ec1Init() {
				// this.ec1 = this.$echarts.init(document.getElementById('ec1'))
				this.ec1 = this.$echarts.init(document.querySelector('#ec1'));
				this.ec1.setOption(this.option);
			},
			changeEcharts() {
				const _this = this;
				window.addEventListener('resize', () => {
					// 箭头函数下，其实就不用_this了，直接用this就行了。箭头函数的this是定义函数时的对象，vue中始终指向vue
					// 加定时器是为了有个动画效果，不是必须的
					setTimeout(() => {
						_this.ec1.resize();
					// console.log(this) //vue组件
					}, 300);
				// 常规函数定时器的this是window
				// setTimeout(function () {
				//   _this.ec1.resize()
				//   console.log(this)
				// }, 300)
				});
			}
		}
	};
</script>

<style scoped>
/* 要给一个大小 */
  div.a1{
    width: 50%;
    height: 400px;
  }
</style>
