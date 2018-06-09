<template>
  <div class="outer-box">
    <div class="hive-top">
            <div class="hive-control-btn">
                <span><i class="iconfont icon-add"></i>
                  <el-button type="text" @click="toSomePage('/addbeebox')">添加</el-button>
                </span>
                <span><i class="iconfont icon-069delete"></i>
                  <el-button type="text" >删除</el-button>
                </span>
                <span><i class="iconfont icon-shuaxin1"></i>
                  <el-button type="text" >刷新</el-button>
                </span>
            </div>
            <div class="hive-top-input">
                <el-input size="mini" placeholder="请输入查询内容"
                v-model="search"
                clearable
                prefix-icon="el-icon-search"
                ></el-input>
            </div>
        </div>
    <div class="box">
      <div class="section-left">
        <table border="0">
          <tr>
            <th>蜂箱ID</th>
            <th>温度</th>
            <th>湿度</th>
            <th>重量</th>
            <th>压强</th>
            <th>状态</th>
            <th>电量</th>
          </tr>
          <tr v-for="(item) in hiveList" :key="item.boxId" @click="slectThisRow(item.boxId)">
            <td>{{item}}</td>
            <td>{{item}}</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
        </table>
      </div>
      <div class="section-right">
        <div class="section-right-top">
          <div class="section-right-top-left">
            <div class="overview">
              <div class="overview-chart">
                <div class="overview-chart-left">
                  <div class="overview-chart-left-row">
                    <div class="section-title">
                      总览
                    </div>
                    <div class="overview-row">
                      <div class="overview-row-left">
                        数量: {{pai.totalBeeBoxNum}}
                      </div>
                      <div class="overview-row-right">
                        正常:{{pai.normalBeeBoxNum}}
                      </div>
                    </div>
                    <div class="overview-row">
                      <div class="overview-row-left">
                        策略维护:{{pai.protectionNum}}
                      </div>
                      <div class="overview-row-right">
                        异常:{{ pai.abnormalBeeBoxNum }}
                      </div>
                    </div>
                    <div class="overview-row">
                      <div class="overview-row-left">
                        非策略维护:{{pai.noProtectionNum}}
                      </div>
                      <div class="overview-row-right">
                        离线:{{pai.offLineBeeBoxNum}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="overview-chart-right">
                  这里显示饼图
                </div>
              </div>

            </div>
            <div class="detail-box">
              <div class="section-title">
                蜂箱信息
              </div>
              <div class="dtail-row">
                <div class="detail-col">
                  蜂箱ID:{{beeBoxInfo.beeBoxId}}
                </div>
                <div class="detail-col">
                  出厂批次: {{beeBoxInfo.batchNo}}
                </div>
                <div class="detail-col">
                  厂商:{{beeBoxInfo.manufacturer}}
                </div>
              </div>
              <div class="dtail-row">
                <div class="detail-col">
                  蜂箱定位:{{beeBoxInfo.lat,beeBoxInfo.lng}}
                </div>
                <div class="detail-col">
                  生产日期:{{beeBoxInfo.productionDate}}
                </div>
                <div class="detail-col">
                  状态:{{beeBoxInfo.status}}
                </div>
              </div>
            </div>
            <div class="line-chart-box">
              这里显示曲线图
            </div>
          </div>
          <div class="section-right-top-right">
            这里显示地图
          </div>
        </div>
        <div class="section-right-bottom">
          <div class="section-right-bottom-left">
            <div class="form-title">
              编组
            </div>
            <div class="form-row">
              <span>名称</span>
              <input type="text" name="" value="" class="name-input">
            </div>
            <div class="form-row">
              <div class="tiaojian">
                <div class="">
                  条件
                </div>
                <select style="width:90%;">
                  <option value ="volvo">Volvo</option>
                  <option value ="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div class="canshu">
                <div class="">
                  参数
                </div>
                <input type="text" name="" value="" style="width:90%">
              </div>
            </div>
            <div class="form-row">
                <div class="sure-btn">
                    确认
                </div>
            </div>
            <div class="form-row">
              <div class="tiaojian">
                <div class="">
                  已有条件
                </div>

              </div>
              <div class="canshu" style="text-align:right">
                <span style="margin-right:20px"><i class="iconfont icon-add"></i>添加</span>
                <span> <i class="iconfont icon-069delete"></i>删除</span>

              </div>
            </div>
            <div class="form-row">
              <div class="exit-rule" ></div>
            </div>
            <div class="form-row">
              筛选结果
            </div>
          </div>
          <div class="section-right-bottom-right">
            <div class="form-title">
              现有组
            </div>
            <div class="form-row group-table">
              <table border="0" style="border:none">
                <tr style="border:none;background:#40577f;color:white">
                  <th style="border:none;width:25%;color:white"><el-checkbox v-model="checked">名称<i class="iconfont icon-duibi" style="font-size:12px"></i></el-checkbox></th>
                  <th style="border:none;width:25%;color:white">蜂箱数量<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
                  <th style="border:none;width:50%;color:white">备注</th>
                </tr>
                <tr >
                  <td style="width:25%;">-</td>
                  <td style="width:25%;">1</td>
                  <td style="width:50%;">2</td>
                </tr>
                <tr >
                  <td style="width:25%;">-</td>
                  <td style="width:25%;">1</td>
                  <td style="width:50%;">2</td>
                </tr>
                <tr >
                  <td style="width:25%;">-</td>
                  <td style="width:25%;">1</td>
                  <td style="width:50%;">2</td>
                </tr>
                <tr >
                  <td style="width:25%;">-</td>
                  <td style="width:25%;">1</td>
                  <td style="width:50%;">2</td>
                </tr>
              </table>
            </div>
            <div class="form-row">
              <span>共（2）</span>
              <span class="icon-span"><i class="iconfont icon-shuaxin1">删除</i> </span>
              <span class="icon-span"><i class="iconfont icon-shuaxin1">刷新</i> </span>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { get, post } from '../../common/post.js';
import moment from 'moment';
export default {
	components: {},
	data() {
		return {
			hiveList: [1, 2, 3, 4, 5, 6, 7, 8, 8, 98, 7, 6, 5, 1, 3, 4, 5, 5],
			beeBoxInfo: {
				beeBoxId: '',
				batchNo: '',
				manufacturer: '',
				lat: '',
				lng: '',
				productionDate: '',
				status: '',
			},
			pai: {},
			checked: true,
			search: '',
		};
	},
	created: function() {
		// this.getBeeBoxInfo();
		// this.getPai();
	},
	methods: {
		//获取蜂箱默认信息
		getBeeBoxInfo() {
			let result = get('/getBeeBoxes', null);
			result.then(res => {
				console.log(111, res);
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					if (data.length > 0) {
						this.beeBoxInfo.beeBoxId = data[0].id;
						this.beeBoxInfo.batchNo = data[0].batchNo;
						this.beeBoxInfo.manufacturer = data[0].manufacturer;
						this.beeBoxInfo.lat = data[0].lat;
						this.beeBoxInfo.lng = data[0].lng;
						this.beeBoxInfo.productionDate = moment(data[0].productionDate).format('YYYY-MM-DD');
						// 将值赋值给列表
						if (data[0].status === 0) this.beeBoxInfo.status = '正在运行';
						else if (data[0].status === 2) this.beeBoxInfo.status = '异常';
						else if (data[0].status === 3) this.beeBoxInfo.status = '离线';
					}
				}
			});
		},

		toSomePage(path) {
			this.$router.push({
				path: path,
			});
		},
		// 获取蜂箱列表信息 蜂箱信息  地图信息
		getHiveList() {
			let result = post('/getBeeBoxSensorData', {
				beeBoxIds: 'beeBoxIds;',
			});
		},
		//获取饼图信息 总览信息
		getPai() {
			let result = get('/getOverviewData', null);
			result.then(res => {
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					this.pai.abnormalBeeBoxNum = data.abnormalBeeBoxNum;
					this.pai.noProtectionNum = data.noProtectionNum;
					this.pai.normalBeeBoxNum = data.normalBeeBoxNum;
					this.pai.offLineBeeBoxNum = data.offLineBeeBoxNum;
					this.pai.protectionNum = data.protectionNum;
					this.pai.totalBeeBoxNum = data.totalBeeBoxNum;
					console.log(12334, this.pai);
				}
			});
		},

		// 点击列表某行获取蜂箱信息，并将该行标记颜色
		slectThisRow(id) {
			//  this.idChange(id)
		},
		// 获取折线图的数据，并将数据显示在折线图上
		getFold() {
			let result = post('/getBeeBoxSensorData', {
				beeBoxIds: 'beeBoxIds;', //所有信息
			});
			result.then(res => {
				console.log(111, res);
			});
		},
		// 添加到编组列表
		addToGroup() {
			let result = post('/saveGroupBeeBox', {
				beeBoxGroup: {
					id: 1,
					groupName: '',
					beeBoxNum: 1,
				},
			});
			result.then(res => {});
		},
		//显示已有条件列表

		// 显示编组信息列表 //刷新现有组列表
		getGroupList() {
			let result = post('/getGroups', null);
			result.then(res => {});
		},

		// 删除现有组列表
		deleteGroupList() {
			let result = post('/deleteGroups', { ids: [] });
			result.then(res => {});
		},

		//显示已有条件列表
		getTermList() {},
		//搜索框用来查找蜂箱列表
		searchBoxList() {},
	},
};
</script>

<style scoped>
.outer-box {
	width: 100%;
}
.box {
	position: relative;
	width: 100%;

	display: flex;
}

.hive-top {
	width: 100%;
	height: 50px;
	background-color: #162f46;
	position: relative;
	color: white;
}
.hive-control-btn {
	position: absolute;
	left: 0;
	top: 0;
	height: 50px;
	line-height: 50px;
}
.el-button--text {
	color: white;
}
.hive-control-btn span {
	margin-left: 10px;
}

.hive-control-btn span:hover,
.el-button--text:hover {
	cursor: pointer;
	color: rgb(0, 138, 207);
}

.hive-top-input {
	position: absolute;
	height: 50px;
	line-height: 40px;
	width: 200px;
	right: 15px;
	margin-top: 5px;
}

.section-left {
	position: relative;
	width: 30%;
	overflow: scroll;
	padding-bottom: 20px;
	background: white;
}

.section-right {
	width: 68%;
	height: 100%;
	padding-left: 10px;
	padding-right: 10px;
}

.section-right-top {
	position: relative;
	width: 100%;
	height: 667px;
	display: flex;
}

.section-right-top-left {
	width: 43%;
	height: 100%;
}

.section-right-top-right {
	margin-left: 2%;
	width: 55%;
	height: 100%;
	background: #0b1b36;
}

.section-right-bottom {
	position: relative;
	width: 100%;
	height: 403px;
	margin-top: 20px;
	display: flex;
	background: #40577f;
}

table {
	border-collapse: collapse;
	width: 100%;
}

table tr:hover {
	cursor: pointer;
	background: #eee;
}

table,
th,
td {
	border: 1px solid #d3d7db;
	font-size: 14px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	color: black;
}

table tr th {
	width: 14.28%;
}

.detail-box {
	position: relative;
	width: 100%;
	color: white;
	margin-top: 10px;
	padding-top: 5px;
	height: 85px;
	background: #0b1b36;
}

.section-title {
	width: 100%;
	text-align: left;
	text-indent: 20px;
	margin-top: 10px;
}

.dtail-row {
	width: 90%;
	margin-left: 20px;
	margin-top: 5px;
	display: flex;
	align-items: center;
	font-size: 12px;
}

.detail-col {
	width: 33%;
	text-align: left;
}

.chart-box {
	position: relative;
	color: #daac52;
	height: 450px;
	border: 1px solid #746c5e;
	width: 100%;
	margin-top: 20px;
}

.overview {
	position: relative;
	width: 100%;
	color: #daac52;
	height: 270px;
	background: #0b1b36;
	display: flex;
}

.chart-line {
	width: 100%;
	margin-top: 30px;
	height: 330px;
}

.overview-chart {
	width: 100%;
	height: 100%;
	display: flex;
}

.id-select {
	width: 34%;
	height: 100%;
}

.overview-chart-left {
	width: 45%;
	height: 100%;
	font-size: 14px;
}

.overview-chart-right {
	width: 55%;
	height: 100%;
	background: white;
}

.overview-row {
	width: 100%;
	display: flex;
	margin-top: 30px;
}

.overview-row-left {
	width: 65%;
	text-align: left;
}

.overview-row-right {
	text-align: left;
	width: 35%;
}

.line-chart-box {
	margin-top: 10px;
	width: 100%;
	height: 290px;
	background: #0b1b36;
}

.section-right-bottom-left {
	width: 38%;
	height: 100%;
}

.section-right-bottom-right {
	width: 62%;
	height: 100%;
}

.form-title {
	margin-left: 5px;
	margin-top: 20px;
	text-align: left;
	color: white;
	font-size: 20px;
}

.form-row {
	width: 96%;
	margin-left: 2%;
	margin-top: 10px;
	text-align: left;
	color: white;
	font-size: 14px;
}

.name-input {
	width: 80%;
}

.tiaojian,
.canshu {
	width: 49%;
	display: inline-block;
}
.sure-btn {
	width: 80px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	background: #0b1b36;
	color: white;
}
textarea {
	width: 100%;
	height: 150px;
}
.group-table {
	height: 305px;
	background: #e8f0f9;
	overflow: scroll;
}
.icon-span {
	float: right;
	font-size: 12px;
	margin-right: 20px;
}
.icon-span i {
	font-size: 13px;
}
</style>
