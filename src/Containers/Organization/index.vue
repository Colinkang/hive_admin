<template>
<div class="container">
  <div class="header-box">
    <div class="form-row">
      <span class="title" style="margin-left:10px">组织</span>
    </div>
    <div class="form-row form-row-section">
      <div class="input-section-left" v-if="right.indexOf('2') > -1">
        <div class="form-row">
          <span style="margin-left:20px;margin-top:10px;display:block">创建组织</span>
          <span class="input-item" style="margin-left:20px;"><label>联系人名称 <input v-model="organizeData.contactName" style="width:120px;"/></label></span>
          <!-- <span class="input-item" style="margin-left:20px"><label>
              <select style="width:120px;">
                <option>1</option>
              </select></label></span> -->
      <span class="input-item" style="margin-left:20px"><label>管理员名称
          <select style="width:120px;" v-model="organizeData.adminId">
          <option v-for="controlList in controlLists" :key="controlList.id" :value="controlList.id">{{controlList.controlName}}</option>
        </select></label></span>
          <span class="input-item" style="margin-left:20px;"><label>组织名称 <input v-model="organizeData.organizationName" style="width:120px;"/></label></span>
          <span class="input-item" style="margin-left:20px;"><label>邮箱 <input v-model="organizeData.email" style="width:120px;"/></label></span>
          <span class="input-item" style="margin-left:20px;"><label>联系电话 <input v-model="organizeData.contactPhone" style="width:120px;"/></label></span>
          <span class="input-item" style="margin-left:20px;"><label>地址 <input v-model="organizeData.address" style="width:350px;"/></label></span>
        </div>
        <div class="form-row">
          <div class="sure-btn" @click="createOrg">
            确认
          </div>
          <div class="clear-btn" @click="clearOrg">
            清空
          </div>
        </div>
      </div>
      <div class="input-section-right">
        <div class="form-row">
          <span style="margin-left:20px;margin-top:10px;display:block">搜索</span>
          <span class="input-item" style="margin-left:20px;"><label>关键字 <input v-model="keyWord" style="width:140px;"/></label></span>
        </div>
        <div class="form-row">
          <div @click="searchOrganization" class="sure-btn">
            确认
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="list-container">
    <div class="list-left">
      <div class="form-row">
        <span class="title">组织列表</span>
      </div>
      <table border="0" class="header">
        <tr>
          <th style="border:none;width:10%;text-align:left">

            <el-checkbox v-model="organizeAllStatus" @change="changeAllOrganizeStatus(organizeAllStatus)"></el-checkbox>
          </th>
          <th @click="sortById">组织ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>组织名称<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>联系人<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <!-- <th>管理员</th> -->
          <!-- <th>成员数量</th> -->
        </tr>
        <tr v-for="(organizeList,index) in organizeLists" :key="organizeList.id" @click="getOrgFarmerList(organizeList.id,index)">
          <td style="border:none;width:10%;text-align:left;background:none">
            <el-checkbox v-model="organizeStatusList[index]" @change="changeOrganizeStatus(index,organizeStatusList[index],organizeList.id)"></el-checkbox>
          </td>
          <td>{{organizeList.id}}</td>
          <td>{{organizeList.organizationName}}</td>
          <td>{{organizeList.contactName}}</td>
          <!-- <td>{{organizeList.adminId}}</td> -->
          <!-- <td>{{organizeList.memberNum}}</td> -->
        </tr>
      </table>
      <div class="form-row fr" style="margin-top:20px">
        <el-button type="text" class="icon-span" @click="getOrgList"><i class="iconfont icon-shuaxin1">刷新</i></el-button>
        <el-button type="text" class="icon-span" @click="deleteOrgList"><i class="iconfont icon-069delete">删除</i> </el-button>
      </div>
    </div>
    <div class="list-right">
      <div class="form-row">
        <span class="title">蜂农列表</span>
      </div>
      <div class="form-row" v-if="beeFramerFLag">
        <span class="farmer-span">管理员：{{adminInfo.username}}</span>
        <span class="farmer-span">联系人：{{adminInfo.name}}</span>
        <span class="farmer-span">联系邮箱：{{adminInfo.email}}</span>
        <span class="farmer-span">联系电话：{{adminInfo.mobile}}</span>
        <span class="farmer-span">联系地址：{{adminInfo.address}}</span>

      </div>
      <table border="0" class="header">
        <tr>
          <th style="border:none;width:5%;text-align:left">
            <el-checkbox v-model="BeeFarmerAllStatus" @change="changeAllBeeFramerStatus(BeeFarmerAllStatus)"></el-checkbox>
          </th>
          <th @click="sortByBeeFarmerId">组织ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>组织名称<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>蜂农<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th @click="sortByBeeBoxNum">蜂箱数量<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th @click="sortByCreateDate">创建时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>邮箱</th>
          <th>联系电话</th>
          <th>地址</th>
        </tr>
        <tr v-for="(beeframerList,index) in beeframerLists" :key="beeframerList.id">
          <td style="border:none;width:5%;text-align:left;background:none" >
            <el-checkbox v-model="BeeFarmerStatusList[index]" @change="changeBeeFramerStatus(index,BeeFarmerStatusList[index],beeframerList.id)"></el-checkbox>
          </td>
          <td>{{beeframerList.id}}</td>
          <td>{{beeframerList.organizationName}}</td>
          <td>{{beeframerList.username}}</td>
          <td>{{beeframerList.beeBoxNum}}</td>
          <td>{{beeframerList.createDate | formatDate}}</td>
          <td>{{beeframerList.email}}</td>
          <td>{{beeframerList.mobile}}</td>
          <td>{{beeframerList.address}}</td>
        </tr>
      </table>
      <div class="form-row fr" style="margin-top:20px">
        <el-button type="text" class="icon-span" @click="getFirstOrgFarmerList"><i class="iconfont icon-shuaxin1">刷新</i></el-button>
        <el-button  v-if="right.indexOf('2') > -1" type="text" class="icon-span" @click="deleteOrgFarmerList"><i class="iconfont icon-069delete">删除</i></el-button>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import { HIVE_ADMIN_RIGHTS, HIVE_ADMIN_TYPE, HIVE_ADMIN_ID, HIVE_ADMIN_USER_NAME } from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
import { get, post } from '../../common/post.js';
import { sortBy } from '../../common/utils.js';
import { Validate, organizeAddSchema } from '../../common/schema.js';
import moment from 'moment';
import localStore from '../../common/localStore';
export default {
	name: '',
	data() {
		return {
			organizeData: {
				organizationName: '',
				contactName: '',
				email: '',
				contactPhone: '',
				address: '',
				adminId: '',
			},
			admionInfo: {
				username: '',
				name: '',
				email: '',
				mobile: '',
				address: '',
			},
			controlLists: [],
			organizeLists: [], //组织列表
			beeframerLists: [], //蜂农列表
			organizeAllStatus: false, //组织全选状态
			BeeFarmerAllStatus: false, //蜂农全选状态
			organizeStatusList: [], //组织列表状态
			BeeFarmerStatusList: [], //蜂农列表状态
			deleteOrganizeIdArray: [], //需要删除组织数据的数组
			deleteOrganizeIdObject: {}, //需要删除组织对象的数组
			deleteBeeFramerIdArray: [], //需要删除蜂农数据的数组
			deleteBeeFramerIdObject: {}, //需要删除蜂农对象的数组
			keyWord: '', //关键字
			array1: [],
			beeFramerFLag: false,
			right: '',
		};
	},
	methods: {
		getControlList() {
			let type = localStore.getItem('HIVE_ADMIN_TYPE');
			let adminId = localStore.getItem('HIVE_ADMIN_ID');
			let admin_user_name = localStore.getItem('HIVE_ADMIN_USER_NAME');
			if (Number(type) === 3) {
				let obj = { id: adminId, controlName: admin_user_name };
				this.controlLists.push(obj);
				this.organizeData.adminId = adminId;
				// this.organizeData.adminId = adminId;
			} else {
				let result = get('/getAllOrganizationAdmins', null);
				result.then(res => {
					console.log(112, res);
					if (res.data.responseCode === '000000') {
						// let obj = { id: '', controlName: '' };
						// this.controlLists.push(obj);
						if (res.data.data.length > 0) {
							let data = res.data.data;
							this.organizeData.adminId = data[0].id;
							for (let d of data) {
								let obj = { id: d.id, controlName: d.username };
								this.controlLists.push(obj);
							}
						}
					}
				});
			}
		},
		sortById() {
			this.array1 = sortBy('id', this.organizeStatusList, this.organizeAllStatus, [], this.organizeLists, true);
			this.beeFarmerSortList = [];
			this.$nextTick(() => {
				this.organizeLists = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByBeeFarmerId() {
			this.array1 = sortBy(
				'id',
				this.BeeFarmerStatusList,
				this.BeeFarmerAllStatus,
				[],
				this.beeframerLists,
				true
			);
			this.beeFarmerSortListArray = [];
			this.$nextTick(() => {
				this.beeframerLists = this.beeFarmerSortListArray.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByBeeBoxNum() {
			this.array1 = sortBy(
				'beeBoxNum',
				this.BeeFarmerStatusList,
				this.BeeFarmerAllStatus,
				[],
				this.beeframerLists,
				true
			);
			this.beeFarmerSortListArray = [];
			this.$nextTick(() => {
				this.beeframerLists = this.beeFarmerSortListArray.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByCreateDate() {
			this.array1 = sortBy(
				'createDate',
				this.BeeFarmerStatusList,
				this.BeeFarmerAllStatus,
				[],
				this.beeframerLists,
				true
			);
			this.beeFarmerSortListArray = [];
			this.$nextTick(() => {
				this.beeframerLists = this.beeFarmerSortListArray.concat(this.array1);
				this.array1 = [];
			});
		},
		//搜索组织
		searchOrganization() {
			let option = {
				keyword: this.keyWord,
			};
			let result = post('/searchOrganization', option);
			result.then(res => {
				console.log(res);
				this.organizeList = res.data.data;
			});
		},
		//创建组织 编辑组织
		createOrg() {
			let options = {
				organizationName: this.organizeData.organizationName,
				adminId: this.organizeData.adminId,
				contactName: this.organizeData.contactName,
				email: this.organizeData.email,
				contactPhone: this.organizeData.contactPhone,
				address: this.organizeData.address,
			};
			console.log(112, options,Validate(options, organizeAddSchema));
			if (Validate(options, organizeAddSchema) !== null) {
				this.$message({
					// showClose: true,
					message: '字段不能为空',
					type: 'warning',
				});
				return;
			}
			let message = '创建';
			if (this.organizeData.id !== undefined) {
				message = '修改';
			}
			this.organizeData.contactPhone =this.isUndefined(this.organizeData.contactPhone);
			this.organizeData.beeBoxNum = this.isUndefined(this.organizeData.beeBoxNum);
			this.organizeData.createDate = this.isUndefined(this.organizeData.createDate);
			this.organizeData.firstTimeLogin = this.isUndefined(this.organizeData.firstTimeLogin);
			this.organizeData.name = this.isUndefined(this.organizeData.name);
			this.organizeData.organizationId = this.isUndefined(this.organizeData.organizationId);
			this.organizeData.status = this.isUndefined(this.organizeData.status);
			this.organizeData.updateDate = this.isUndefined(this.organizeData.updateDate);
			this.organizeData.username = this.isUndefined(this.organizeData.username);
			console.log(123, this.organizeData);
			let result = post('/alterOrganization', this.organizeData);
			result.then(res => {
				if (res.data.responseCode === '000000') {
					this.$message({
						showClose: true,
						message: message + '成功',
						type: 'success',
					});
					this.getOrgList();
				} else {
					this.$message({
						showClose: true,
						message: message + '失败',
						type: 'error',
					});
				}
			});
		},
		//清除蜂农
		clearOrg() {
			if (this.organizeData.id !== undefined) {
				delete this.organizeData.id;
			}
			this.organizeData = {
				organizationName: '',
				contactName: '',
				email: '',
				contactPhone: '',
				address: '',
			};
		},
		//获取组织列表 刷新组织列表
		getOrgList() {
			this.organizeLists = [];
			let result = get('/getAllOrganizations', null);
			result.then(res => {
				this.organizeLists = res.data.data;
				console.log(123567,res.data.data)
				this.getFirstOrgFarmerList();
				this.organizeStatusList.length = this.organizeLists.length;
				for (let i = 0; i < this.organizeStatusList.length; i++) {
					this.organizeStatusList[i] = false;
				}
			});
		},
		//删除组织列表
		deleteOrgList() {
			this.deleteOrganizeIdArray = [];
			for (let item in this.deleteOrganizeIdObject) {
				this.deleteOrganizeIdArray.push(item);
			}
			console.log(this.deleteOrganizeIdArray);
			if (this.deleteOrganizeIdArray.length === 0) {
				return false;
			}
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true,
			})
				.then(() => {
					let result = post('/deleteOrganizations', { ids: this.deleteOrganizeIdArray });
					result.then(res => {
						if (res.data.responseCode === '000000') {
							this.$message({
								type: 'success',
								message: '删除成功!',
							});
							this.getOrgList();
						} else {
							this.$message({
								type: 'error',
								message: '删除失败!',
							});
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		//获取第一个组织下的蜂农列表
		getFirstOrgFarmerList() {
			this.beeframerLists = [];
			let result = post('/getOrganizationBeeFarmers', {
				organizationId: this.organizeLists[0].id,
			});
			result.then(res => {
				console.log(res);
				this.beeframerLists = res.data.data;
				for (let i = 0; i < this.beeframerLists.length; i++) {
					this.BeeFarmerStatusList[i] = false;
				}
			});
		},
		//获取组织下的蜂农列表 刷新
		getOrgFarmerList(id, index) {
			console.log(123,this.organizeLists);
			this.organizeData = {
				organizationName: this.organizeLists[index].organizationName,
				contactName: this.organizeLists[index].contactName,
				email: this.organizeLists[index].email,
				contactPhone: this.organizeLists[index].contactPhone,
				address: this.organizeLists[index].address,
				id: id,
				beeBoxNum: this.organizeLists[index].beeBoxNum,
				createDate: this.organizeLists[index].createDate,
				firstTimeLogin: this.organizeLists[index].firstTimeLogin,
				name: this.organizeLists[index].name,
				organizationId: this.organizeLists[index].organizationId,
				status: this.organizeLists[index].status,
				updateDate: this.organizeLists[index].updateDate,
				username: this.organizeLists[index].username,
				adminId:this.organizeLists[index].adminId,

			};
			console.log(this.organizeData);
			let result = post('/getOrganizationBeeFarmers', {
				organizationId: id,
			});
			result.then(res => {
				console.log(res);
				this.beeframerLists = res.data.data;
				for (let i = 0; i < this.beeframerLists.length; i++) {
					this.BeeFarmerStatusList[i] = false;
				}
			});
			result.then(res => {
				console.log(res);
				this.beeframerLists = res.data.data;
				for (let i = 0; i < this.beeframerLists.length; i++) {
					this.BeeFarmerStatusList[i] = false;
				}
			});
			let adminResult = post('/getOrganizationAdmin', {
				organizationId: id,
			});
			adminResult.then(res => {
				if (res.data.responseCode === '000000') {
					this.beeFramerFLag = true;
					this.adminInfo = res.data.data;
				} else {
					this.beeFramerFLag = false;
				}
			});
		},
		//删除组织下的蜂农列表
		deleteOrgFarmerList() {
			this.deleteBeeFramerIdArray = [];
			for (let item in this.deleteBeeFramerIdObject) {
				this.deleteBeeFramerIdArray.push(item);
			}
			console.log(this.deleteBeeFramerIdArray);
			if (this.deleteBeeFramerIdArray.length === 0) {
				return false;
			}
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true,
			})
				.then(() => {
					let result = post('/deleteFarmers', { ids: this.deleteBeeFramerIdArray });
					result.then(res => {
						if (res.data.responseCode === '000000') {
							this.$message({
								type: 'success',
								message: '删除成功!',
							});
							this.getFirstOrgFarmerList();
						} else {
							this.$message({
								type: 'error',
								message: '删除失败!',
							});
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		//组织全选状态
		changeAllOrganizeStatus(val) {
			for (let i = 0; i < this.organizeStatusList.length; i++) {
				this.organizeStatusList[i] = val;
			}
			console.log(this.organizeStatusList);
			if (val) {
				this.organizeLists.forEach((item, index) => {
					this.deleteOrganizeIdObject[item.id] = val;
				});
			}
		},
		//组织单选状态
		changeOrganizeStatus(index, val, id) {
			event.preventDefault();
			if (val) {
				this.deleteOrganizeIdObject[id] = val;
			} else {
				delete this.deleteOrganizeIdObject[id];
			}
			console.log(this.deleteOrganizeIdObject);
			if (!val) {
				this.organizeAllStatus = false;
			}
			if (this.organizeStatusList.toString().indexOf('false') < 0) {
				this.organizeAllStatus = true;
			}
		},
		//蜂农全选状态
		changeAllBeeFramerStatus(val) {
			for (let i = 0; i < this.BeeFarmerStatusList.length; i++) {
				this.BeeFarmerStatusList[i] = val;
			}
			console.log(this.BeeFarmerStatusList);
			if (val) {
				this.beeframerLists.forEach((item, index) => {
					this.deleteBeeFramerIdObject[item.id] = val;
				});
			}
		},
		//蜂农单选状态
		changeBeeFramerStatus(index, val, id) {
			event.preventDefault();
			if (val) {
				this.deleteBeeFramerIdObject[id] = val;
			} else {
				delete this.deleteBeeFramerIdObject[id];
			}
			console.log(this.deleteBeeFramerIdObject);
			if (!val) {
				this.BeeFarmerAllStatus = false;
			}
			if (this.BeeFarmerStatusList.toString().indexOf('false') < 0) {
				this.BeeFarmerAllStatus = true;
			}
		},
		//检查是否未定义
		isUndefined(data) {
			if (data === undefined) {
				data = '';
			}
			return data;
		},
	},
	mounted() {
		this.getControlList();
		this.getOrgList();
		let adminRight = LocalStore.getItem(HIVE_ADMIN_RIGHTS);
		this.right = adminRight.split(',');
	},
	filters: {
		formatDate(timestamp) {
			return moment(timestamp).format('YYYY-MM-DD');
		},
	},
};
</script>
<style lang="" scoped>
.container {
	width: calc(100%-18px);
	margin-top: 40px;
	margin-left: 10px;
	margin-right: 10px;
	color: white;
	padding-bottom: 10px;
}

.form-row {
	text-align: left;
	font-size: 14px;
}

.title {
	display: inline-block;
	margin-top: 10px;

	margin-bottom: 20px;
	font-size: 20px;
}
.header-box{
  	border: 1px solid #235978;
    padding-bottom: 40px;

    background: #15232f;
}
.form-row-section {

	display: flex;
}

.input-section-left {
	width: 75%;
	height: 160px;
	border-right: 2px solid white;
}

.input-section-right {
	width: 25%;
	height: 160px;
}

.sent-code {
	font-size: 13px;
	color: #135f99;
}

.sent-code:hover {
	color: white;
	cursor: pointer;
}

.input-item {
	display: inline-block;
	margin-top: 10px;
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
	display: inline-block;
	cursor: pointer;
}

.list-box {
	width: 100%;
	height: 500px;
	margin-top: 20px;
}

.header {
	border-collapse: collapse;
	width: 100%;
}

.header table,
.header th {
	border: none;
	font-size: 13px;
	height: 40px;
	cursor: pointer;
}

.header td {
	background: rgb(247,247,247);
	border: 1px solid white;
	font-size: 14px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	font-size: 12px;
	color: black;
	max-width: 100px;
	overflow: hidden;
	cursor: pointer;
}

.header tr th {
}

.header {
	color: white;
}
.fr {
	float: right;
}
.icon-span {
	font-size: 12px;
	margin-right: 20px;
	cursor: pointer;
}

.icon-span i {
	font-size: 13px;
}

.list-container {
	width: 100%;
	display: flex;
	margin-top: 20px;
}

.list-left {
	height: 900px;
	background: #2c4261;
	padding: 20px;
	width: 30%;
}

.list-right {
	width: 70%;
	height: 900px;
	margin-left: 10px;
	background: #0b1b36;
	padding: 20px;
}
.farmer-span {
	margin-left: 20px;
	display: inline-block;
	min-width: 100px;
	margin-top: 10px;
	margin-bottom: 10px;
	color: #5c5466;
}
</style>
