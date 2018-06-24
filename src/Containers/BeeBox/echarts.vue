<template>
    <div id="myChart" :style="{width: '96%', height: '96%',marginTop:'3%'}"></div>
</template>
<script>
import echarts from 'echarts';
export default {
	name: 'mychart',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
		};
	},
	// mounted() {
	// 	this.drawLine();
	// },
	methods: {
		drawLine(obj) {
		//	console.log(111111, obj);
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(document.getElementById('myChart'));
			// 绘制图表
			let option = {
				tooltip: {
					trigger: 'item',
					formatter: '',
				},
        // legend:{
        //   orient:'vertical',
        //   right:0,
        //   data:['数量','离线','异常','正常','策略保护','非策略保护'],
        // },
				series: [
					{
						name: '总量',
						type: 'pie',
						selectedMode: 'single',
						radius: [0, '40%'],

						label: {
							normal: {
								position: 'inner',
							},
						},
						labelLine: {
							normal: {
								show: false,
							},
						},
						data: [
							{ value: obj.protectionNum, name: '策略保护', selected: false },
							{ value: obj.noProtectionNum, name: '非策略保护' },
						],
					},
					{
						name: '总量',
						type: 'pie',
						radius: ['50%', '80%'],
						label: {
							normal: {
								// shadowBlur:3,
								// shadowOffsetX: 2,
								// shadowOffsetY: 2,
								// shadowColor: '#999',
								// padding: [0, 7],
								rich: {
									a: {
										color: '#999',
										lineHeight: 22,
										align: 'center',
									},
									// abg: {
									//     backgroundColor: '#333',
									//     width: '100%',
									//     align: 'right',
									//     height: 22,
									//     borderRadius: [4, 4, 0, 0]
									// },
									hr: {
										borderColor: '#aaa',
										width: 2,
										borderWidth: 0.2,
										height: 4,
									},
									b: {
										fontSize: 16,
										lineHeight: 33,
									},
									per: {
										color: '#eee',
										backgroundColor: '#334455',
										padding: [1, 2],
										borderRadius: 2,
									},
								},
							},
						},
						data: [
							{ value: obj.normalBeeBoxNum, name: '正常' },
							{ value: obj.abnormalBeeBoxNum, name: '异常' },
							{ value: obj.offLineBeeBoxNum, name: '离线' },
						],
					},
				],
        backgroundColor:'#eee'
			};
			myChart.setOption(option);
		},
	},
};
</script>
