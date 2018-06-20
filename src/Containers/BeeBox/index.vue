<template>
  <div class="outer-box">
    <div class="hive-top">
            <div class="hive-control-btn">
                <span v-if="right.indexOf('4')>-1" ><i class="iconfont icon-add"></i>
                  <el-button type="text" @click="toSomePage('/addbeebox')">添加</el-button>
                </span>
                <span v-if="right.indexOf('4')>-1"><i class="iconfont icon-069delete"></i>
                  <el-button type="text" @click="deleteBeeBox" >删除</el-button>
                </span>
                <span><i class="iconfont icon-shuaxin1"></i>
                  <el-button type="text" @click="getHiveList(null)">刷新</el-button>
                </span>
            </div>
            <div class="hive-top-input">
                <el-input size="mini" placeholder="请输入查询内容"
                v-model="search"
                clearable
                prefix-icon="el-icon-search"
                @keyup.enter.native="getHiveList(search)"
                ></el-input>
            </div>
        </div>
    <div class="box">
      <div class="section-left">
        <table border="0">
          <tr>
          	<th>
          		<el-checkbox v-model="checkAllStatus"  @change="changeAllStatus(checkAllStatus)"></el-checkbox>
          	</th>
            <th>蜂箱ID</th>
            <th>温度</th>
            <th>湿度</th>
            <th>重量</th>
            <th>压强</th>
            <!-- <th>状态</th> -->
            <th>电量</th>
          </tr>
          <tr v-for="(item,index) in hiveList" :key="item.beeBoxNo" @click="slectThisRow(item.beeBoxNo)" :class="beeBoxNo===item.beeBoxNo?'selected':''">
          	<td>
          		<el-checkbox v-model="statusList[index]" @change="changeStatus(index,statusList[index],item.id)"></el-checkbox>
          	</td>
            <td>{{item.beeBoxNo}}</td>
            <td>{{item.temperature | nullToLine}}</td>
            <td>{{item.humidity | nullToLine}}</td>
            <td>{{item.gravity | nullToLine}}</td>
            <td>{{item.airPressure | nullToLine}}</td>
            <!-- <td>{{item.status | toBeeBoxStatus}}</td> -->
            <td>{{item.battery | nullToLine}}</td>
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
                    <div class="section-title" style="text-indent:0">
                      总览
                    </div>
                    <div class="overview-row">
                      <div class="overview-row-left" :title="pai.totalBeeBoxNum">
                        数量: {{pai.totalBeeBoxNum}}
                      </div>
                      <div class="overview-row-right">
                        离线:{{pai.offLineBeeBoxNum}}
                      </div>

                    </div>
                    <div class="overview-row">

                      <div class="overview-row-left">
                        异常:{{ pai.abnormalBeeBoxNum }}
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
                        非策略维护:{{pai.noProtectionNum}}
                      </div>

                    </div>
                  </div>
                </div>
                <div class="overview-chart-right">
                  <echartspie ref="hive1"></echartspie>
                </div>
              </div>

            </div>
            <div class="detail-box">
              <div class="section-title">
                蜂箱信息
              </div>
              <div class="dtail-row">
                <div class="detail-col detail-col01" :title="beeBoxInfo.beeBoxId">
                  蜂箱ID: {{beeBoxInfo.beeBoxId}}
                </div>
                <div class="detail-col detail-col02" :title="beeBoxInfo.batchNo">
                  出厂批次:  {{beeBoxInfo.batchNo}}
                </div>
                <div class="detail-col detail-col03" :title="beeBoxInfo.manufacturer">
                  厂商: {{beeBoxInfo.manufacturer}}
                </div>
              </div>
              <div class="dtail-row">
                <div class="detail-col detail-col01" :title="latlng">
                  蜂箱定位: {{beeBoxInfo.lat}},{{beeBoxInfo.lng}}
                </div>
                <div class="detail-col detail-col02" :title="beeBoxInfo.productionDate">
                  生产日期:  {{beeBoxInfo.productionDate}}
                </div>
                <div class="detail-col detail-col03" :title="beeBoxInfo.status | toBeeBoxStatus">
                  状态:  {{beeBoxInfo.status | toBeeBoxStatus}}
                </div>
              </div>
            </div>
            <div class="line-chart-box">
              <fold ref="fool"></fold>
            </div>
          </div>
          <div class="section-right-top-right">
            <!-- <baidu-map class="map" style="width:100%;height:100%" :center="{lng: beeBoxInfo.lng, lat: beeBoxInfo.lat}" :zoom="12">
				<bm-marker :position="{lng: beeBoxInfo.lng, lat: beeBoxInfo.lat}" :dragging="true"
				:scroll-wheel-zoom="true">
				</bm-marker>
			</baidu-map> -->
      <baidu-map style="width:100%;height:100%" :center="lng&&lat?{lng, lat}:'北京'" :zoom="zoom">
        <!-- <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list> -->
        <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_CIRCLE" color="red" size="BMAP_POINT_SIZE_NORMAL" @click="clickHandler" ></bm-point-collection>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <bm-marker :position="{lng, lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          <!-- <bm-label content="当前蜂箱" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" /> -->
        </bm-marker>
      </baidu-map>
          </div>
        </div>
        <div class="section-right-bottom">
          <div class="section-right-bottom-left">
            <div class="form-title">
              编组
            </div>

            <props-select @emptyBeeBox="emptyBeeBox" @getList="createStartData" @getGroup="getGroupList"></props-select>


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
                  <th style="border:none;background:#40577f;color:white"><el-checkbox v-model="checkAllGroupStatus" @change="changeAllGroupStatus(checkAllGroupStatus)"></el-checkbox></th>
                  <th style="border:none;width:50%;color:white">名称<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
                  <th style="border:none;width:50%;color:white" @click="sortByBeeBoxNum">蜂箱数量<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
                  <!-- <th style="border:none;width:50%;color:white">备注</th> -->
                </tr>
				 <!-- <tr v-for="(item,index) in groupList" :key="item.id" @click="slectThisGroupRow(item.id)"> -->
				<tr v-for="(item,index) in groupList" :key="item.id" >
			 		<td><el-checkbox v-model="groupStatusList[index]" @change="changeGroupStatus(index,groupStatusList[index],item.id)"></el-checkbox></td>
					<td style="width:50%;">{{item.groupName}}</td>
					<td style="width:50%;">{{item.beeBoxNum}}</td>
                </tr>
              </table>
            </div>
            <div class="form-row">
              <span>共（2）</span>
              <span class="icon-span"><i class="iconfont icon-069delete">
								 <el-button type="text" @click="deleteGroupList" >删除</el-button></i> </span>
              <span class="icon-span"><i class="iconfont icon-shuaxin1">
								 <el-button type="text" @click="getGroupList" >刷新</el-button></i> </span>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { HIVE_ADMIN_RIGHTS } from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
import { get, post } from '../../common/post.js';
import echartspie from './echarts.vue';
import fold from './fold.vue';
import PropsSelect from './PropsSlect.vue';
import { sortBy } from '../../common/utils.js';
import moment from 'moment';
let hiveTimer;
let timer;
let sensorDataId;
let temperature = [];
let humidity = [];
let gravity = [];
let airPressure = [];
let battery = [];
let date = [];
export default {
	components: {
		echartspie,
		fold,
		PropsSelect,
		// BmPointCollection
	},
	data() {
		return {
			hiveList: [],
			beeBoxInfo: {
				beeBoxId: '',
				batchNo: '',
				manufacturer: '',
				lat: '39.915',
				lng: '116.404',
				productionDate: '',
				status: '',
			},
			pai: {},
			checked: true,
			search: '',
			fold: {
				temperature: [],
				humidity: [],
				gravity: [],
				airPressure: [],
				battery: [],
				date: [],
			},
			termList: [],
			term: { name: '', condition: '', value: '' },
			groupList: [],
			clickBeeBoxId: '',
			beeBoxNo: '',
			right: '',
			groupIds: [],
			checkAllStatus: false, //全选状态
			statusList: [], //状态列表
			deleteIdArray: [], //需要删除数据的数组
			deleteIdObject: {}, //需要删除数据的对象
			latlng: '', //经纬度合用的
			checkAllGroupStatus: false, //现有组全选状态
			groupStatusList: [], //现有组状态列表
			deleteGroupIdArray: [], //需要删除数据组的数组
			deleteGroupIdObject: {}, //需要删除数据组的对象
			array1: [],
			position: { lng: 116.404, lat: 39.915 },
			center: { lng: 116.404, lat: 39.915 },
			points: [],
			zoom: 9,
			lng: 116.404,
			lat: 39.915,
		};
	},
	mounted: function() {
		// this.getBeeBoxInfo();
		this.getPai();
		this.getHiveList();
		//hiveTimer = setInterval(this.getHiveList, 5000);
		// this.getFold();
		this.getGroupList();
		let adminRight = LocalStore.getItem(HIVE_ADMIN_RIGHTS);
		this.right = adminRight.split(',');
	},
	beforeDestroy() {
		clearInterval(hiveTimer);
		clearInterval(timer);
	},
	methods: {
		// 点击地图上的某个点进行切换
		clickHandler(e) {
			this.lng = e.point.lng;
			this.lat = e.point.lat;
			// alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
			let result = post('/getBeeBoxByPosition', {
				lng: this.lng,
				lat: this.lat,
			});
			result.then(res => {
				console.log(11234, res.data);
				if (res.data.responseCode === '000000') {
					// 点击点图上点和点击列表上某行相一致
					this.slectThisRow(res.data.data.beeBoxNo);
				}
			});
		},
		// 蜂箱数据进行排序
		sortByBeeBoxNum() {
			this.array1 = sortBy('beeBoxNum', this.groupStatusList, this.checkAllGroupStatus, [], this.groupList, true);
			this.beeFarmerSortList = [];
			this.$nextTick(() => {
				this.beeFarmerLists = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		//获取蜂箱默认信息
		getBeeBoxInfo(beeBoxId) {
			let result = post('/getBeeBox', { beeBoxId: beeBoxId });
			result.then(res => {
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					if (data) {
						this.beeBoxInfo.beeBoxId = data.beeBoxNo;
						this.beeBoxInfo.batchNo = data.batchNo;
						this.beeBoxInfo.manufacturer = data.manufacturer;
						this.beeBoxInfo.lat = data.lat;
						this.beeBoxInfo.lng = data.lng;
						this.latlng = '' + this.beeBoxInfo.lat + ',' + '' + this.beeBoxInfo.lng;
						this.lat = data.lat;
						this.lng = data.lng;
						//	console.log(this.latlng);
						this.beeBoxInfo.productionDate = moment(data.productionDate).format('YYYY-MM-DD');
						// 将值赋值给列表
						if (data.status === 0 || data.status === 1) this.beeBoxInfo.status = '正在运行';
						else if (data.status === 2) this.beeBoxInfo.status = '异常';
						else this.beeBoxInfo.status = '离线';
					}
				}
			});
		},

		toSomePage(path) {
			this.$router.push({
				path: path,
			});
		},
		// 获取蜂箱列表信息  搜索页面
		getHiveList(keyword) {
			this.points = [];
			console.log(keyword);
			// clearInterval(hiveTimer);
			// 先清除要不然搜索出现问题
			// clearInterval(timer);
			let result = post('/getAllBeeBoxSensorData', { keyword: keyword || null });
			result.then(res => {
				if (res.data.responseCode === '000000') {
					console.log(9999, res.data);
					hiveTimer = setTimeout(this.getHiveList, 100000);
					this.createStartData(res);
				}
			});
		},
		emptyBeeBox() {
			//alert(2222)
			this.beeBoxNo = '';
			clearInterval(hiveTimer);
		},
		createStartData(res) {
			//alert(11111)
			console.log(100000, res);
			let data = res.data.data;
			this.hiveList = data;
			// this.hiveList.reverse();
			console.log(1112, this.hiveList);
			let list = data;
			if (data.length > 0 && this.beeBoxNo === '') {
				//alert(2222)
				this.beeBoxNo = list[0].beeBoxNo;
				this.clickBoxId(list[0].beeBoxNo);
				this.getBeeBoxInfo(list[0].beeBoxNo);
			}
			// 将值赋值给列表
			if (data.length > 0) {
				for (let i = 0; i < this.hiveList.length; i++) {
					this.statusList[i] = false;
				}
				const points = [];
				for (let i = 0; i < this.hiveList.length; i++) {
					const position = { lng: this.hiveList[i].lng, lat: this.hiveList[i].lat };
					points.push(position);
				}
				this.points = points;
			}
		},

		//删除蜂箱
		deleteBeeBox() {
			this.deleteIdArray = [];
			for (let item in this.deleteIdObject) {
				this.deleteIdArray.push(item);
			}
			console.log(this.deleteIdArray);
			if (this.deleteIdArray.length === '') {
				this.$message({
					message: '请先点击列表选择要删除的蜂箱',
					type: 'warning',
				});
				return;
			}
			// this.ids.push(this.clickBeeBoxId);
			let result = post('/deleteBeeBoxes', {
				ids: this.deleteIdArray,
			});
			result
				.then(res => {
					if (res.data.responseCode === '000000') {
						this.$message({
							message: '删除蜂箱成功',
							type: 'success',
						});
						this.getHiveList(null);
						this.deleteIdObject = {};
					}
				})
				.catch(err => {
					hiveTimer = setTimeout(this.getHiveList, 5000);
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
					this.$refs.hive1.drawLine(this.pai);
				}
			});
		},

		// 点击列表某行获取蜂箱信息，并将该行标记颜色
		slectThisRow(beeBoxNo) {
			this.beeBoxNo = beeBoxNo;
			this.getBeeBoxInfo(beeBoxNo);
			this.clickBoxId(beeBoxNo);
		},
		// 获取折线图的数据，并将数据显示在折线图上
		// getFold(beeBoxNo) {
		// 	let result = post('/getBeeBoxSensorData', {
		// 		beeBoxNos: [beeBoxNo], //所有信息
		// 	});
		// 	result.then(res => {
		// 		if (res.data.responseCode === '000000') {
		// 			let data = res.data.data;
		// 			console.log(2345, data);
		// 			if (data.length > 0) {
		// 				for (let d of data) {
		// 					this.fold.temperature.push(d.temperature);
		// 					this.fold.humidity.push(d.humidity);
		// 					this.fold.gravity.push(d.gravity);
		// 					this.fold.airPressure.push(d.airPressure);
		// 					this.fold.battery.push(d.battery);
		// 					this.fold.date.push(moment(data.createDate).format('YYYY-MM-DD hh:mm'));
		// 				}
		// this.$refs.fool.drawFoldLine(this.fold);
		// 			}
		// 		}
		// 	});
		// },
		clickBoxId(id) {
			clearInterval(timer);
			let _this = this;
			//console.log(123, _this.beeBoxNo);
			sensorDataId = '';
			temperature = [];
			humidity = [];
			gravity = [];
			airPressure = [];
			battery = [];
			date = [];
			let obj = {
				temperature,
				humidity,
				gravity,
				airPressure,
				battery,
				date,
			};
			_this.$refs.fool.drawFoldLine(obj);
			timer = setInterval(() => {
				let result;
				if (!sensorDataId) {
					result = post('/getBeeBoxSensorData', {
						sensorDataTags: [
							{
								beeBoxNo: id,
								// lastestSensorDataId: 68884,
							},
						],
					});
				} else {
					result = post('/getBeeBoxSensorData', {
						sensorDataTags: [
							{
								beeBoxNo: _this.beeBoxNo,
								lastestSensorDataId: sensorDataId,
							},
						],
					});
				}
				result.then(res => {
					if (res.data.responseCode === '000000') {
						let d = res.data.data;
						console.log(123456, d);
						if (d.length > 0) {
							d = d[0];

							sensorDataId = d.id;
							temperature.push(d.temperature);
							humidity.push(d.humidity);
							gravity.push(d.gravity);
							airPressure.push(d.airPressure);
							battery.push(d.battery);
							date.push(moment(d.createDate).format('YYYY-MM-DD hh:mm'));
							let obj = {
								temperature,
								humidity,
								gravity,
								airPressure,
								battery,
								date,
							};
							_this.$refs.fool.drawFoldLine(obj);
						}
					}
				});
			}, 5000);
		},

		// 显示编组信息列表 //刷新现有组列表
		getGroupList() {
			let result = get('/getGroups', null);
			result.then(res => {
				if (res.data.responseCode === '000000') {
					console.log(1111, res);
					let data = res.data.data;
					this.groupList = data;
					for (let i = 0; i < this.groupList.length; i++) {
						this.groupStatusList[i] = false;
					}
				}
			});
		},

		// 删除现有组列表
		deleteGroupList() {
			this.deleteGroupIdArray = [];
			for (let item in this.deleteGroupIdObject) {
				this.deleteGroupIdArray.push(item);
			}
			console.log(this.deleteGroupIdArray);
			if (this.deleteGroupIdArray.length === '') {
				this.$message({
					message: '请先点击列表选择要删除的现有组',
					type: 'warning',
				});
				return;
			}
			let result = post('/deleteGroups', { ids: this.deleteGroupIdArray });
			result.then(res => {
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '删除现有组成功',
						type: 'success',
					});
					this.getGroupList(null);
					this.deleteGroupIdObject = {};
				}
			});
		},

		//点击全选的状态
		changeAllStatus(val) {
			for (let i = 0; i < this.statusList.length; i++) {
				this.statusList[i] = val;
			}
			if (val) {
				this.hiveList.forEach((item, index) => {
					this.deleteIdObject[item.id] = val;
				});
			}
		},
		//单个点击的状态
		changeStatus(index, val, id) {
			event.preventDefault();
			if (val) {
				this.deleteIdObject[id] = val;
			} else {
				delete this.deleteIdObject[id];
			}
			console.log(this.deleteIdObject);
			if (!val) {
				this.checkAllStatus = false;
			}
			if (this.statusList.toString().indexOf('false') < 0) {
				this.checkAllStatus = true;
			}
		},
		//点击组全选的状态
		changeAllGroupStatus(val) {
			for (let i = 0; i < this.groupStatusList.length; i++) {
				this.groupStatusList[i] = val;
			}
			if (val) {
				this.groupList.forEach((item, index) => {
					this.deleteGroupIdObject[item.id] = val;
				});
			}
		},
		//单个点击组的状态
		changeGroupStatus(index, val, id) {
			event.preventDefault();
			if (val) {
				this.deleteGroupIdObject[id] = val;
			} else {
				delete this.deleteGroupIdObject[id];
			}
			console.log(this.deleteGroupIdObject);
			if (!val) {
				this.checkAllGroupStatus = false;
			}
			if (this.groupStatusList.toString().indexOf('false') < 0) {
				this.checkAllGroupStatus = true;
			}
		},
	},
	filters: {
		toBeeBoxStatus(data) {
			if (data === 0 || data === 1) {
				data = '在线';
			} else if (data === 2) {
				data = '异常';
			} else {
				data = '离线';
			}
			return data;
		},
		nullToLine(data) {
			if (data === null) {
				data = '-';
			}
			return data;
		},
	},
};
</script>

<style lang="" scoped>
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
	overflow-y: scroll;
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
	border-right: none;
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
	width: 11.28%;
}
tr,
table {
	border-right: none !important;
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
	height: 16px;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.detail-col01 {
	width: 30%;
}
.detail-col02 {
	width: 40%;
}
.detail-col03 {
	width: 30%;
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
	width: 30%;
	height: 100%;
	font-size: 14px;
	padding-left: 2.5%;
	padding-right: 2.5%;
}

.overview-chart-right {
	width: 70%;
	height: 100%;
	background: white;
}

.overview-row {
	width: 100%;
	margin-top: 10px;
}

.overview-row-left {
	width: 100%;
	text-align: left;
}

.overview-row-right {
	text-align: left;
	width: 100%;
	margin-top: 10px;
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
.sure-btn:hover {
	background: #1a335e;
	cursor: pointer;
}
textarea {
	width: 100%;
	height: 150px;
}
.group-table {
	height: 305px;
	background: #e8f0f9;
	/* overflow: scroll; */
}
.icon-span {
	float: right;
	font-size: 12px;
	margin-right: 20px;
}
.icon-span i {
	font-size: 13px;
}
.selected {
	background: rgb(153, 206, 232);
}
</style>
