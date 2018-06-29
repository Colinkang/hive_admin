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
						radius: [0, '30%'],

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
						radius: ['35%', '50%'],
						label: {
							normal: {
                label: {
    							normal: {
    								position: 'outside',
    							},
    						},
							},
						},
            labelLine:{
              length:5
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
