<template>
	<div class="result-wrapper">
		<button @click="toggle">按钮</button>
		<dynamic-table v-if="dynamicTableShow" :table-data="tableData" :table-header="tableConfig"></dynamic-table>
	</div>
</template>

<script>
	import DynamicTable from './DynamicTable';
	export default {
		components: { DynamicTable },
		data() {
			return {
				dynamicTableShow: true, // 使得DynamicTable组件重新渲染变量
				// 表数据
				tableData: [
					{
						districtName: '1',
						timeDimension: '2',
						residentPopNum: '3',
						residentPopDst: '4',
						liveLandArea: '5',
						liveLandDst: '6',
						employmentLandArea: '7',
						employmentLandDst: '8'
					}
				],
				// 表头数据
				tableConfig: [
					{
						id: 100,
						label: '一级表头',
						prop: '',
						children: [
							{
								id: 110,
								label: '二级表头1',
								prop: 'districtName'
							},
							{
								id: 120,
								label: '二级表头2',
								prop: 'timeDimension'
							}
						]
					},
					{
						id: 200,
						label: '一级表头1',
						prop: '',
						children: [
							{
								id: 210,
								label: '二级表头2',
								prop: '',
								children: [
									{
										id: 211,
										label: '三级表头3',
										prop: 'residentPopNum'
									},
									{
										id: 212,
										label: '三级表头',
										prop: 'residentPopDst'
									}
								]
							}
						]
					},
					{
						id: 300,
						label: '一级表头1',
						prop: '',
						children: [
							{
								id: 310,
								label: '二级表头2',
								prop: '',
								children: [
									{
										id: 311,
										label: '三级表头3',
										prop: 'liveLandArea'
									},
									{
										id: 312,
										label: '三级表头3',
										prop: 'liveLandDst'
									}
								]
							},
							{
								id: 320,
								label: '二级表头1',
								prop: '',
								children: [
									{
										id: 321,
										label: '三级表头3',
										prop: 'employmentLandArea'
									},
									{
										id: 322,
										label: '三级表头3',
										prop: 'employmentLandDst'
									}
								]
							}
						]
					}
				]
			};
		},
		methods: {
			toggle() {
				this.dynamicTableShow = !this.dynamicTableShow;
			},
			// 服务类型改变的时候，需要重新请求表头信息和表格数据
			handleServiceCategoryChange(val) {
				// 设置dynamicTableShow为false，使得DynamicTable组件重新渲染
				this.dynamicTableShow = false;
				if (val === '1') {
					this.tableData = [
						{
							districtName: '1',
							timeDimension: '2',
							residentPopNum: '3',
							residentPopDst: '4',
							liveLandArea: '5',
							liveLandDst: '6',
							employmentLandArea: '7',
							employmentLandDst: '8'
						}
					];
					this.tableConfig = [
						{
							id: 100,
							label: '一级表头',
							prop: '',
							children: [
								{
									id: 110,
									label: '二级表头1',
									prop: 'districtName'
								},
								{
									id: 120,
									label: '二级表头2',
									prop: 'timeDimension'
								}
							]
						},
						{
							id: 200,
							label: '一级表头1',
							prop: '',
							children: [
								{
									id: 210,
									label: '二级表头2',
									prop: '',
									children: [
										{
											id: 211,
											label: '三级表头3',
											prop: 'residentPopNum'
										},
										{
											id: 212,
											label: '三级表头',
											prop: 'residentPopDst'
										}
									]
								}
							]
						},
						{
							id: 300,
							label: '一级表头1',
							prop: '',
							children: [
								{
									id: 310,
									label: '二级表头2',
									prop: '',
									children: [
										{
											id: 311,
											label: '三级表头3',
											prop: 'liveLandArea'
										},
										{
											id: 312,
											label: '三级表头3',
											prop: 'liveLandDst'
										}
									]
								},
								{
									id: 320,
									label: '二级表头1',
									prop: '',
									children: [
										{
											id: 321,
											label: '三级表头3',
											prop: 'employmentLandArea'
										},
										{
											id: 322,
											label: '三级表头3',
											prop: 'employmentLandDst'
										}
									]
								}
							]
						}
					];
				} else {
					this.tableData = [
						{
							districtName: '111',
							timeDimension: '222'
						}
					];
					this.tableConfig = [
						{
							id: 100,
							label: '一级表头',
							prop: '',
							children: [
								{
									id: 110,
									label: '二级表头1',
									prop: 'districtName'
								},
								{
									id: 120,
									label: '二级表头2',
									prop: 'timeDimension'
								}
							]
						}
					];
				}
				// 此处是DOM还没有更新，此处的代码是必须的
				this.$nextTick(() => {
					// DOM 现在更新了
					this.dynamicTableShow = true;
				});
			}
		}
	};
</script>

<style scoped>
.policy-wrapper{
  margin-top: 10px;
}
.result-wrapper{
  margin-top: 22px;
}
</style>
