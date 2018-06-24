<template>
<div class="container">
  <div class="section-left" v-if="right.indexOf('5') > -1">
    <ul>
      <li :class="selected===1?'selected':''">AI模式</li>
      <li :class="selected===2?'selected':''" @click="selectModule(2)">人工模式</li>
      <li :class="selected===3?'selected':''">协作模式</li>
    </ul>
    <div class="rule-box">
      <div class="form-row">
        <span class="title">创建预警规则</span>
      </div>
      <div class="form-row">
        <span class="input-item">
          <label>名称 <input v-model="ruleName" style="width:300px;"/></label>
        </span>
      </div>
      <div class="form-row">
        <span class="input-item">
          <div class="">
            目标
          </div>
          <div class="" style="margin-top:5px">
            <select v-model='groupId' style="width:80px;">
              <option v-for="item in groupList"
                :key="item.id"
                :label="item.groupName"
                :value="item.id">
              </option>
            </select>
          </div>
        </span>
        <span class="input-item">
          <div class="">
            条件
          </div>
          <div class="" style="margin-top:5px">
            <select v-model='ruleType' style="width:80px;">
              <option v-for="(item, index) in ruleTypeList"
                :key="index"
                :label="item"
                :value="index + 1">
              </option>
            </select>
          </div>
        </span>
        <span class="input-item">
          <div class="">
            阈值
          </div>
          <div class="" style="margin-top:5px">
            <span><input v-model="minThreshold" style="width:40px;"/></span>
            -
            <span><input v-model="maxThreshold" style="width:40px;"/></span>
          </div>
        </span>
      </div>
      <div class="form-row">
        <span class="input-item">
          <div class="">
            对象
          </div>
          <label class="notification">
            <input v-model="notificationTarget[0]" type="checkbox"/>
            蜂农
          </label>
          <label class="notification">
            <input v-model="notificationTarget[1]" type="checkbox"/>
            管理员
          </label>
        </span>
        <span class="input-item">
          <div class="">
            动作
          </div>
          <label class="notification">
            <input v-model="notificationWay[0]" type="checkbox"/>
            电话
          </label>
          <label class="notification">
            <input v-model="notificationWay[1]" type="checkbox"/>
            短信
          </label>
          <label class="notification">
            <input v-model="notificationWay[2]" type="checkbox"/>
            邮件
          </label>
        </span>
      </div>
      <div class="form-row" style="text-align:right;">
        <span class="input-item" @click="addRule">
          <div class="" style="margin-top:5px">
            <span class="iconfont icon-add">添加</span>
          </div>
        </span>
      </div>
    </div>
    <div class="form-row" style="margin-top:40px">
      <div class="tiaojian">
        <div class="">
          已有规则
        </div>
      </div>
      <div class="canshu" style="text-align:right">
        <span style="margin-right:20px" @click="getEvents">
          <i class="iconfont icon-shuaxin1">刷新</i>
        </span>
        <span v-if="right.indexOf('5') > -1" @click="deleteEvents">
          <i class="iconfont icon-069delete">删除</i>
        </span>
      </div>
      <div class="form-row exit-rule">
        <table border="0" style="border:none">
          <tr style="border:none;background:#40577f;color:white">
            <th style="border:none;width:4%;color:white">
              <el-checkbox v-model="allEventsChecked" @change="allEventsCheckedChange"/>
            </th>
            <th style="border:none;width:16%;color:white">名称</th>
            <th style="border:none;width:16%;color:white">目标</th>
            <th style="border:none;width:16%;color:white">条件</th>
            <th style="border:none;width:16%;color:white">阈值</th>
            <th style="border:none;width:16%;color:white">对象</th>
            <th style="border:none;width:16%;color:white">动作</th>
          </tr>
          <tr v-for="(item, index) in eventList">
            <td style="width:4%;">
              <el-checkbox v-model="eventsCheckedList[index]" @change="eventsCheckedChange"/>
            </td>
            <td style="width:16%;">{{ item.ruleName }}</td>
            <td style="width:16%;">{{ item.groupName }}</td>
            <td style="width:16%;">{{ ruleTypeList[item.ruleType] }}</td>
            <td style="width:16%;">{{ item.minThreshold + '~' + item.maxThreshold }}</td>
            <td style="width:16%;">{{ convert(item.notificationTarget, 1) }}</td>
            <td style="width:16%;">{{ convert(item.notificationWay, 2) }}</td>
          </tr>
        </table>
      </div>
      <div class="form-row" style="color: #cdcacf;">
        {{ '共（' + eventList.length + '）' }}
      </div>
    </div>
  </div>
  <div class="section-right">
    <div class="form-title" style="color:white;text-align:left">
      历史预警
    </div>
    <div class="form-row" style="text-align:left">
      <span class="input-item" style="margin-left:20px;color:white"><label>搜索 </label></span>
      <span style="width:250px;display:inline-block;margin-right:30px">
        <el-input size="mini" placeholder="请输入内容" v-model="keyword">
        </el-input>
      </span>
      <div class="sure-btn" @click="historyWarnSearch">
        确认
      </div>
      <div class="form-row group-table">
        <table border="0" style="border:none">
          <tr style="border:none;background:#40577f;color:white">
            <th style="border:none;width:10%;color:white">
              <el-checkbox v-model="checked" @change="changeAllGroupStatus(checked)"></el-checkbox>
            </th>
            <th style="border:none;width:25%;color:white" @click="sortByCreateDate">
              日期<i class="iconfont icon-duibi" style="font-size:12px"></i>
            </th>
            <th style="border:none;width:25%;color:white">事件<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
            <th style="border:none;width:50%;color:white">处理方式</th>
          </tr>
          <tr v-for="(item,index) in historyAlertList">
            <td><el-checkbox v-model="checkListStatus[index]" @change="changeGroupStatus(checkListStatus[index])"></el-checkbox></td>
            <td style="width:25%;">{{ formatDate(item.createDate) }}</td>
            <td style="width:25%;">{{ item.event }}</td>
            <td style="width:25%;">{{ item.handleWay }}</td>
          </tr>
        </table>
      </div>
      <div class="form-row">
        <span style="color:white">{{ '共（' + historyAlertList.length + '）' }}</span>
        <span class="icon-span" @click="getHistoryAlertList"><i class="iconfont icon-shuaxin1">刷新</i> </span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { HIVE_ADMIN_RIGHTS } from '../../common/localStorageKey';
import { get, post } from '../../common/post.js';
import { HIVE_ADMIN_ID } from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
import moment from 'moment';
import { sortBy } from '../../common/utils.js';
import { Validate, createRuleSchema } from '../../common/schema.js';
export default {
	name: '',
	data: () => ({
		groupList: [],
		eventList: [],
		ruleTypeList: ['温度', '湿度', '压强', '电量', '重力'],
		ruleName: '',
		groupId: 1,
		ruleType: 1,
		minThreshold: '',
		maxThreshold: '',
		notificationTarget: [false, false],
		notificationWay: [false, false, false],
		selected: 2,
		checked: false,
		checkListStatus: [],
		eventsCheckedList: [],
		allEventsChecked: false,
		deleteEventsIdList: [],
		historyAlertList: [],
		keyword: '',
		deleteGroupIdObject: {},
		deleteGroupIdArray: [],
		array1: [],
		right: '',
	}),
	mounted() {
		this.getGroups();
		this.getEvents();
		this.getHistoryAlertList();
		let adminRight = LocalStore.getItem(HIVE_ADMIN_RIGHTS);
		this.right = adminRight.split(',');
	},
	methods: {
		sortByCreateDate() {
			this.array1 = sortBy('createDate', this.checkListStatus, this.checked, [], this.historyAlertList, true);
			this.beeFarmerSortList = [];
			this.$nextTick(() => {
				this.historyAlertList = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		addRule() {
			this.createWarmRule();
		},
		selectModule(selected) {
			this.selected = selected;
		},
		convert(str, type) {
			let result = [];
			switch (type) {
				case 1:
					result = ['蜂农', '管理员'];
					break;
				case 2:
					result = ['电话', '短信', '邮件'];
				default:
					break;
			}
			let list = [];
			list = str.split(',');
			for (let i = list.length - 1; i >= 0; i--) {
				if (list[i] === 'false') {
					result.splice(i, 1);
				}
			}
			return result.toString();
		},
		allEventsCheckedChange() {
			if (this.allEventsChecked) {
				for (let i = 0; i < this.eventsCheckedList.length; i++) {
					this.eventsCheckedList[i] = true;
				}
			} else {
				for (let i = 0; i < this.eventsCheckedList.length; i++) {
					this.eventsCheckedList[i] = false;
				}
			}
		},
		eventsCheckedChange() {
			for (let i = 0; i < this.eventsCheckedList.length; i++) {
				if (!this.eventsCheckedList[i]) {
					this.allEventsChecked = false;
					return;
				}
			}
			this.allEventsChecked = true;
		},
		// 获取目标列表
		getGroups() {
			let result = get('/getGroups');
			result.then(res => {
				this.groupList = res.data.data;
			});
		},
		// 获取已有规则，刷新或删除后更新已有规则
		getEvents() {
			let result = get('/getEvents');
			result.then(res => {
				this.eventList = res.data.data;
				// 重置勾选状态数组
				this.eventsCheckedList.length = this.eventList.length;
				for (let i = 0; i < this.eventsCheckedList.length; i++) {
					this.eventsCheckedList[i] = false;
				}
			});
		},
		// 删除已有规则
		deleteEvents() {
			this.deleteEventsIdList.length = 0;
			if (this.allEventsChecked) {
				this.eventList.forEach(element => {
					this.deleteEventsIdList.push(element.id);
				});
			} else {
				this.eventsCheckedList.forEach((element, index) => {
					if (element) {
						this.deleteEventsIdList.push(this.eventList[index].id);
					}
				});
			}
			if (this.deleteEventsIdList.length === 0) {
				this.$message({
					message: '至少有一项需要勾选上',
					type: 'warning',
				});
				return;
			}
			let result = post('/deleteEvents', {
				ids: this.deleteEventsIdList,
			});
			result.then(res => {
				console.log(14, res);
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '删除成功',
						type: 'success',
					});
				} else {
					this.$message.error('删除失败');
				}
				this.getEvents();
			});
		},
		//创建预警规则
		createWarmRule() {
			let _this = this;
			let options = {
				ruleName: this.ruleName,
				groupId: this.groupId,
				minThreshold: this.minThreshold,
				maxThreshold: this.maxThreshold,
				ruleType: this.ruleType,
				notificationTarget: this.notificationTarget.toString(),
				notificationWay: this.notificationWay.toString(),
				adminId: LocalStore.getItem(HIVE_ADMIN_ID),
			};
			console.log(123, options, Validate(options, createRuleSchema));
			if (Validate(options, createRuleSchema) !== null) {
				this.$message({
					message: '字段都不能为空',
					type: 'warning',
				});
				return;
			}
			let result = post('/alterAlertRule', options);
			result.then(res => {
				// 刷新已有规则
				this.getEvents();
			});
		},

		// 历史预警列表
		getHistoryAlertList() {
			this.keyword = '';
			let result = get('/getHistoryAlertEvents');
			result.then(res => {
				console.log(111, res);
				this.historyAlertList = res.data.data;
				for (let i = 0; i < this.historyAlertList.length; i++) {
					this.checkListStatus[i] = false;
				}
			});
		},

		// 搜索历史预警
		historyWarnSearch() {
			if (!this.keyword) {
				this.$message({
					message: '搜索内容不能为空',
					type: 'warning',
				});
				return;
			}
			let result = post('/searchHistoryAlertEvents', {
				keyword: this.keyword,
			});
			result.then(res => {
				this.historyAlertList = res.data.data;
			});
		},
		formatDate(timestamp) {
			return moment(timestamp).format('YYYY-MM-DD');
		},
		checkAllChange() {
			if (this.checkAll) {
				for (let i = 0; i < this.checkList.length; i++) {
					this.checkList[i] = true;
				}
			} else {
				for (let i = 0; i < this.checkList.length; i++) {
					this.checkList[i] = false;
				}
			}
		},
		checkedChange() {
			for (let i = 0; i < this.checkList.length; i++) {
				if (!this.checkList[i]) {
					this.checkAll = false;
					return;
				}
			}
			this.checkAll = true;
		},
		//点击组全选的状态
		changeAllGroupStatus(val) {
			for (let i = 0; i < this.checkListStatus.length; i++) {
				this.checkListStatus[i] = val;
			}
		},
		//单个点击组的状态
		changeGroupStatus(val) {
			if (!val) {
				this.checked = false;
			}
			if (this.checkListStatus.toString().indexOf('false') < 0) {
				this.checked = true;
			}
		},
	},
};
</script>
<style lang="" scoped>
.container {
	width: 100%;
	display: flex;
	color: #32354d;
	min-height: 920px;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
}

.section-left {
	width: 44%;
	min-height: 800px;
	margin-left: 1px;
}

.section-right {
	width: 53%;
	min-height: 800px;
  background: #15232f;
	padding: 10px;
  margin-left: 10px;
  margin-right: 20px;
}

ul {
	width: 100%;
	height: 30px;
	text-align: center;
	display: flex;
	margin: 0;
	padding: 0;
}

li {
	width: 33%;
	list-style: none;
	color: white;
	border: 1px solid #181d62;
	background: #3d5277;
	line-height: 30px;
	height: 30px;
}

li:hover {
	cursor: pointer;
	background: #b4b9c4;
	border-bottom: none;
	color: black;
}

.selected {
	background: #dde5f4;
	border-bottom: none;
	color: black;
}

.rule-box {
	width: calc(100%-2px);
	height: 270px;
	margin-top: -1px;
	background: #dde5f4;
	border: 1px solid #162f46;
	padding-right: 20px;
}

.form-row {
	text-align: left;
	margin-top: 5px;
}

.title {
	margin-left: 20px;
	margin-top: 20px;
	display: inline-block;
	font-size: 17px;
}

.input-item {
	display: inline-block;
	margin-top: 10px;
	margin-left: 20px;
}

.notification {
	font-size: 14px;
}

.iconfont:hover {
	color: rgb(125, 125, 125);
	cursor: pointer;
}

.tiaojian,
.canshu {
	width: 49%;
	display: inline-block;
	color: #cdcacf;
}

.exit-rule {
	width: 100%;
	height: 600px;
	color: black;
	background: white;
	overflow-y: scroll;
}

.sure-btn {
	width: 80px;
	height: 28px;
	float: right;
	margin-top: 10px;
	margin-right: 100px;
	text-align: center;
	line-height: 28px;
	background: #40557b;
	color: white;
	cursor: pointer;
}

.group-table {
	height: 872px;
	background: #e8f0f9;
	overflow-y: scroll;
	color: white;
	margin-top: 20px;
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
	font-size: 13px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	color: black;
}

table tr th {
	width: 14.28%;
}

.icon-span {
	float: right;
	font-size: 12px;
	margin-right: 20px;
	color: white;
}

.icon-span i {
	font-size: 13px;
}
</style>
