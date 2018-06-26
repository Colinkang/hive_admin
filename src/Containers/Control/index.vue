<template>
<div class="container">
<div class="header-box">
  <div class="form-row">
    <span class="title">管理</span>
  </div>
  <div class="form-row form-row-section">
    <div class="input-section-left" v-if="right.indexOf('1')>-1">
      <div class="form-row">
        <span style="margin-left:20px;margin-top:10px;display:block">创建管理员</span>
        <span class="input-item" style="margin-left:20px;"><label>姓名 <input ref="name"  v-model.trim="managementParams.name" style="width:120px;"/></label></span>
        <!-- <span class="input-item" style="margin-left:20px;"><label>合作社
          <select v-model.trim="managementParams.organizationId" style="width:120px;" placeholder="请选择">
              <option
                v-for="item in organizationLists"
                :key="item.id"
                :label="item.organizationName"
                :value="item.id">
              </option>
            </select></label>
        </span> -->
        <span class="input-item" style="margin-left:20px;"><label>邮箱 <input v-model.trim="managementParams.email" style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>联系电话 <input v-model.trim="managementParams.mobile" style="width:120px;"/></label><span class="sent-code" :class="{ active : codeStatus}" @click="sendVerifyCode">{{ codeText }}</span></span>
        <span class="input-item" style="margin-left:20px;"><label>验证码 <input v-model.trim="managementParams.code" style="width:70px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>密码 <input style="width:120px;" v-model.trim="managementParams.password"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>地址 <input v-model.trim="managementParams.address" style="width:250px;"/></label></span>
        <span  class="input-item" style="margin-left:20px;">
          <span class="" style="font-size:14px">类型</span>
          <span class="input-item" style="margin-left:20px;margin-top:0">
            <div class="">
              <el-checkbox v-model="beefarmerChecked" style="font-size:15px;color:white">蜂农管理</el-checkbox>
            </div>
            <div class="" style="margin-top:5px">
              <el-radio v-model="beefarmerType" label="8" >只读</el-radio>
              <el-radio v-model="beefarmerType" label="3" >管理</el-radio>
            </div>
          </span>
        </span>

        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="beeboxChecked" style="font-size:15px;color:white">蜂箱管理</el-checkbox>
          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="beeboxType" label="9" >只读</el-radio>
            <el-radio v-model="beeboxType" label="4" >管理</el-radio>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="eventChecked" style="font-size:15px;color:white">事件管理</el-checkbox>
          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="eventType" label="10" >只读</el-radio>
            <el-radio v-model="eventType" label="5" >管理</el-radio>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="adminChecked" style="font-size:15px;color:white">管理员管理</el-checkbox>
          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="adminType" label="6" >只读</el-radio>
            <el-radio v-model="adminType" label="1" >管理</el-radio>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="organizationChecked" style="font-size:15px;color:white">组织管理</el-checkbox>
          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="organizationType" label="7" >只读</el-radio>
            <el-radio v-model="managementParams.type" label="3" >小组管理</el-radio>
            <el-radio v-model="managementParams.type" label="4" >无小组管理</el-radio>
            <el-radio v-model="organizationType" label="2" >高级管理</el-radio>
          </div>
        </span>
      </div>
      <div class="form-row" style="margin-top:10px">

      </div>
      <div class="form-row ">

        <div class="sure-btn" @click="createManager">
          确认
        </div>
         <div class="clear-btn" @click="clearManager">
          清空
        </div>
      </div>
    </div>
    <div class="input-section-right">
      <div class="form-row">
        <span style="margin-left:20px;margin-top:10px;display:block">搜索</span>
        <span class="input-item" style="margin-left:20px;"><label>关键字 <input v-model.trim="keyword" style="width:140px;"/></label></span>
      </div>
      <div class="form-row">
        <div class="sure-btn" @click="searchManager(1)">
          确认
        </div>
      </div>
    </div>
  </div>

</div>

  <div class="list-box">
    <table border="0" class="header">
      <tr>
        <th style="border:none;width:3%;text-align:center">
          <el-checkbox v-model="checkAll" @change="checkAllChange"></el-checkbox>
        </th>
        <th @click="sortById">管理员ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>登录名</th>
        <th>姓名</th>
        <th @click="sortByType">管理员类型<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th @click="sortByCreateDate">创建时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th @click="sortByUpdateDate">修改时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>合作社</th>
        <th>邮箱</th>
        <th>联系电话</th>
        <th>地址</th>
        <!-- <th>状态</th> -->
      </tr>
      <tr class="row-hover" v-for="(item, index) in adminList" :key="item.id" @click="editControl(item.id,index,item)">
        <td style="border:none;width:3%;text-align:center;background:none">
          <el-checkbox v-model="checkList[index]" @change="checkedChange"></el-checkbox>
        </td>
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.name }}</td>
        <td>{{ typeStrObj[item.type] }}</td>
        <td>{{ formatDate(item.createDate) }}</td>
        <td>{{ formatDate(item.updateDate) }}</td>
        <td>{{ item.organizationName }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.mobile }}</td>
        <td>{{ item.address }}</td>
        <!-- <td>{{ item.status ? '在线' : '离线' }}</td> -->
      </tr>
    </table>
    <div class="form-row" style="margin-top:20px">
      <el-button v-if="right.indexOf('1')>-1" type="text" class="icon-span" @click="deleteManager"><i class="iconfont icon-069delete">删除</i></el-button>
      <el-button type="text" class="icon-span" @click="handlePageChange(currentPageNo)"><i class="iconfont icon-shuaxin1">刷新</i></el-button>
    </div>
    <div class="form-row" style="text-align:center;margin-top:20px">
      <el-pagination small layout="prev, pager, next" :pagesize="10" @current-change="handlePageChange" :total="10*totalPageNo">
      </el-pagination>
    </div>
  </div>

</div>
</template>
<script>
import { HIVE_ADMIN_RIGHTS } from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
import { get, post } from '../../common/post.js';
import moment from 'moment';
import { sortBy } from '../../common/utils.js';
import { Validate, createManagerSchema } from '../../common/schema.js';
export default {
	name: '',
	data: () => ({
		organizationLists: [],
		adminList: [],
		managementParams: {
			name: '',
			// organizationId: '',
			email: '',
			mobile: '',
			code: '',
			password: '',
			address: '',
			rights: [],
			type: '2',
		},
		codeText: '发送短信验证码',
		codeStatus: false,
		beefarmerChecked: false,
		beefarmerType: '8',
		beeboxChecked: false,
		beeboxType: '9',
		eventChecked: false,
		eventType: '10',
		adminChecked: false,
		adminType: '6',
		organizationChecked: false,
		organizationType: '7',
		type: 2,
		typeStrObj: {
			1: '超级管理员',
			2: '高级管理员',
			3: '小组管理员',
			4: '无小组管理员',
		},
		checkAll: false,
		checkList: [],
		deleteIdList: [],
		keyword: '',
		searchFlag: false,
		currentPageNo: 1,
		totalPageNo: 1,
		array1: [],
		right: '',
	}),
	mounted() {
		this.getAllOrganizations();
		this.getManagerList(1);
		let adminRight = LocalStore.getItem(HIVE_ADMIN_RIGHTS);
		this.right = adminRight.split(',');
	},
	methods: {
		//编辑管理员信息
		editControl(id, index) {
			let adminData = this.adminList[index];
			this.$refs.name.setAttribute('readonly', 'readonly');
			// this.isEditStatus = true;

			console.log(989, adminData);
			this.managementParams = {
				name: adminData.name,
				address: adminData.address,
				mobile: adminData.mobile,
				code: adminData.code,
				password: adminData.password,
				// organizationId: BeeFarmerData.organizationId,
				email: adminData.email,
				// beeBoxNum: BeeFarmerData.beeBoxNum,
				id: adminData.id,
				type: adminData.type,
				username: adminData.username,
			};
		},
		//清空管理员信息
		clearManager() {
			this.$refs.name.removeAttribute('readonly');
			this.isEditStatus = false;
			if (this.managementParams.id !== undefined || this.managementParams.username !== undefined) {
				delete this.managementParams.id;
				delete this.managementParams.username;
			}
			this.managementParams = {
				name: '',
				address: '',
				mobile: '',
				code: '',
				password: '',
				email: '',
			};
			this.beefarmerChecked = false;
			this.beeboxChecked = false;
			this.eventChecked = false;
			this.adminChecked = false;
			this.organizationChecked = false;
		},
		sortById() {
			this.array1 = sortBy('id', this.checkList, this.checkAll, [], this.adminList, true);
			this.beeFarmerSortList = [];
			this.$nextTick(() => {
				this.adminList = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByType() {
			this.array1 = sortBy('type', this.checkList, this.checkAll, [], this.adminList, true);
			this.beeFarmerSortList = [];
			this.$nextTick(() => {
				this.adminList = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByCreateDate() {
			this.array1 = sortBy('createDate', this.checkList, this.checkAll, [], this.adminList, true);
			this.beeFarmerSortList = [];
			this.$nextTick(() => {
				this.adminList = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByUpdateDate() {
			this.array1 = sortBy('updateDate', this.checkList, this.checkAll, [], this.adminList, true);
			this.beeFarmerSortList = [];
			this.$nextTick(() => {
				this.adminList = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		formatDate(timestamp) {
			return moment(timestamp).format('YYYY-MM-DD');
		},
		getRights() {
			this.managementParams.rights = [];

			if (this.beefarmerChecked) {
				this.managementParams.rights.push(this.beefarmerType);
			}
			if (this.beeboxChecked) {
				this.managementParams.rights.push(this.beeboxType);
			}
			if (this.eventChecked) {
				this.managementParams.rights.push(this.eventType);
			}
			if (this.adminChecked) {
				this.managementParams.rights.push(this.adminType);
			}
			if (this.organizationChecked) {
				this.managementParams.rights.push(this.organizationType);
			}
		},
		// 获取合作社
		getAllOrganizations() {
			let result = get('/getAllOrganizations');
			result.then(res => {
				this.organizationLists = res.data.data;
			});
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
		// 创建管理员  //编辑管理员
		createManager() {
			console.log(this.managementParams);
			let message = '创建';
			if (this.managementParams.id !== undefined) {
				message = '修改';
				this.getRights();
			} else {
				this.getRights();
			}
			console.log(888, this.managementParams, Validate(this.managementParams, createManagerSchema));
			if (Validate(this.managementParams, createManagerSchema) !== null) {
				this.$message({
					message: '字段不能为空',
					type: 'warning',
				});
				return;
			}
			let result = post('/alterAdmin', this.managementParams);
			result.then(res => {
				// console.log(res)
				if (res.data.responseCode === '000000') {
					this.$alert(
						`用户名:${res.data.data.username} 密码:${this.managementParams.password}`,
						'用户名和密码',
						{
							confirmButtonText: '确定',
							callback: action => {
								this.$message({
									type: 'info',
									message: message + `管理员成功`,
								});
							},
						}
					);
					this.managementParams = {
						name: '',
						// organizationId: '',
						email: '',
						mobile: '',
						code: '',
						password: '',
						address: '',
						rights: [],
						type: '2',
					};
					this.getManagerList(this.currentPageNo);
				} else if (res.data.responseCode === '000034') {
					this.$message.error('验证码错误');
				} else {
					this.$message.error('添加管理员失败');
				}
			});
		},
		//模糊搜索管理员
		searchManager(pageNo) {
			if (!this.keyword) {
				this.$message({
					message: '请先在搜索框里输入关键字',
					type: 'warning',
				});
				return;
			}
			if (!this.searchFlag) {
				this.currentPageNo = 1;
			}
			let result = post('/searchAdmin', {
				keyword: this.keyword,
				pageNo: pageNo,
				pageSize: 10,
			});
			result.then(res => {
				this.searchFlag = true;
				this.adminList = res.data.data.admins;
				this.currentPageNo = res.data.data.currentPageNo;
				this.totalPageNo = res.data.data.totalPageNo;
				// 重置勾选状态数组
				this.checkList.length = this.adminList.length;
				for (let i = 0; i < this.checkList.length; i++) {
					this.checkList[i] = false;
				}
			});
		},
		//获取管理员列表  刷新管理员
		getManagerList(pageNo) {
			this.checkAll = false;
			this.searchFlag = false;
			this.keyword = '';
			let result = post('/getPageAdmins', {
				pageNo: pageNo,
				pageSize: 10,
			});
			result.then(res => {
				this.adminList = res.data.data.admins;
				this.currentPageNo = res.data.data.currentPageNo;
				this.totalPageNo = res.data.data.totalPageNo;
				// 重置勾选状态数组
				this.checkList.length = this.adminList.length;
				for (let i = 0; i < this.checkList.length; i++) {
					this.checkList[i] = false;
				}
			});
		},
		handlePageChange(pageNo) {
			console.log(111, pageNo);
			if (this.searchFlag) {
				this.searchManager(pageNo);
			} else {
				this.getManagerList(pageNo);
			}
		},
		// 删除管理员
		deleteManager() {
			this.deleteIdList.length = 0;
			if (this.checkAll) {
				this.adminList.forEach(element => {
					console.log(112, element);
					this.deleteIdList.push(element.id);
				});
				// console.log(111, this.deleteIdList);
			} else {
				this.checkList.forEach((element, index) => {
					if (element) {
						this.deleteIdList.push(this.adminList[index].id);
					}
				});
			}
			if (this.deleteIdList.length === 0) {
				this.$message({
					message: '请至少勾选一项内容',
					type: 'warning',
				});
				return;
			}
			let result = post('/deleteAdmins', {
				adminIds: this.deleteIdList,
			});
			result.then(res => {
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '删除成功',
						type: 'success',
					});
					this.getManagerList(this.currentPageNo);
				} else {
					this.$message.error('删除失败');
				}
			});
		},
		//管理员ID排序
		idSort() {},
		//管理员类型排序  先看是否已经排序，如排序则反向排序，否则由小到大排序
		typeSort() {
			let _this = this;
			_this.adminList.sort(function(a, b) {
				return b - a;
			});
		},
		//成员数量排序
		quantitySort() {
			let _this = this;
			_this.adminList.sort(function(a, b) {
				return b - a;
			});
		},
		//创建时间排序
		createTimeSort() {
			let _this = this;
			_this.adminList.sort(function(a, b) {
				return b - a;
			});
		},
		//修改时间排序
		modifyTimeSort() {
			let _this = this;
			_this.adminList.sort(function(a, b) {
				return b - a;
			});
		},
		// 发送短信验证码
		sendVerifyCode() {
			if (!this.managementParams.mobile || !this.managementParams.name) {
				this.$message({
					message: '请先输入手机号和姓名',
					type: 'warning',
				});
				return;
			}
			if (this.codeStatus) return;
			let leftTime = 60;
			this.codeText = leftTime + 's';
			this.codeStatus = true;
			var timer = setInterval(() => {
				leftTime--;
				this.codeText = leftTime + 's';
				if (leftTime === 0) {
					this.codeStatus = false;
					this.codeText = '发送短信验证码';
					clearInterval(timer);
				}
			}, 1000);
			let result = post('/adminSMSService', {
				mobile: this.managementParams.mobile,
				userName: this.managementParams.name,
				registerFlag: 1,
				messageType: 2298872,
			});
			result.then(res => {
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '发送验证码成功',
						type: 'success',
					});
				}
			});
		},
	},
};
</script>
<style lang="" scoped>
.container {
	width: calc(100%-18px);
	margin-left: 10px;
	margin-right: 10px;
  margin-top: 40px;
	color: white;
	padding-bottom: 100px;
	min-height: 920px;
}
.header-box{
  background: #15232f;
  border: 1px solid #235978;
  padding-bottom: 40px;
}

.form-row {
	text-align: left;
	font-size: 14px;
}

.title {
	display: inline-block;
	margin-top: 10px;
	margin-left: 10px;
	font-size: 17px;
}

.form-row-section {
	display: flex;
}

.input-section-left {
	width: 70%;
	height: 250px;
	border-right: 2px solid white;
}

.input-section-right {
	width: 30%;
	height: 200px;
	/* border-left: 2px solid white; */
}

.sent-code {
	font-size: 13px;
	color: #fff;
	padding: 2px 4px;
	margin-left: 10px;
	background-color: #40557b;
	width: 120px;
	display: inline-block;
	text-align: center;
}

.sent-code:hover {
	color: white;
	cursor: pointer;
}
.active {
	background-color: grey;
}

.input-item {
	display: inline-block;
	margin-top: 10px;
	vertical-align: top;
}

.sure-btn,
.clear-btn {
	width: 80px;
	height: 30px;
	margin-left: 20px;
	margin-top: 20px;
	text-align: center;
	line-height: 30px;
	background: #40557b;
	color: white;
	cursor: pointer;
	float: left;
}

.list-box {
	width: 98%;
	margin-top: 20px;
  padding: 10px;
	margin-bottom: 40px;
  margin-right: 10px;
  height: 600px;
  background: #2c4261;
}

.header {
	border-collapse: collapse;
	width: 100%;
}

.header table,
.header th {
	border: none;
	font-size: 13px;
	cursor: pointer;
}

.header td {
	background: rgb(275,275,274);
	border: 1px solid #eee;
	font-size: 14px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	font-size: 12px;
	color: black;
	max-width: 100px;
	overflow: hidden;
}

.header tr th {
}

.header {
	color: white;
}

.icon-span {
	float: right;
	font-size: 12px;
	margin-right: 20px;
}

.icon-span i {
	font-size: 13px;
}

.el-radio {
	font-size: 12px;
	margin-left: 0px;
	color: white;
}
.row-hover:hover {
	cursor: pointer;
}
.el-pagination button{
  background: #2c4261 !important;
}
</style>
