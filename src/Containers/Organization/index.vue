<template>
<div class="container">
  <div class="form-row">
    <span class="title">组织</span>
  </div>
  <div class="form-row form-row-section">
    <div class="input-section-left">
      <div class="form-row">
        <span style="margin-left:20px;margin-top:10px;display:block">创建组织</span>
        <span class="input-item" style="margin-left:20px;"><label>组织名称 <input v-model="organizeData.organizationName" style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>联系人名称 <input v-model="organizeData.contactName" style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>邮箱 <input v-model="organizeData.email" style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>联系电话 <input v-model="organizeData.mobile" style="width:120px;"/></label></span>
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
        <span class="input-item" style="margin-left:20px;"><label>关键字 <input style="width:140px;"/></label></span>
      </div>
      <div class="form-row">
        <div class="sure-btn">
          确认
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
          <th style="border:none;width:3%;text-align:center">
            <el-checkbox v-model="organizeAllStatus" @change="changeAllOrganizeStatus(organizeAllStatus)"></el-checkbox>
          </th>
          <th>组织ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>组织名称<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>联系人<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>管理员</th>
          <th>成员数量</th>
        </tr>
        <tr v-for="(organizeList,index) in organizeLists" :key="organizeList.id" @click="getOrgFarmerList(organizeList.id,index)">
          <td style="border:none;width:3%;text-align:center;background:none">
            <el-checkbox v-model="organizeStatusList[index]" @change="changeOrganizeStatus(index,organizeStatusList[index],organizeList.id)"></el-checkbox>
          </td>
          <td>{{organizeList.id}}</td> 
          <td>{{organizeList.organizationName}}</td>
          <td>{{organizeList.contactName}}</td>
          <td>{{organizeList.adminId}}</td>
          <td>{{organizeList.memberNum}}</td>
        </tr>
      </table>
      <div class="form-row" style="margin-top:20px">
        <span class="icon-span"><i class="iconfont icon-shuaxin1">删除</i> </span>
        <span class="icon-span"><i class="iconfont icon-shuaxin1" @click="getOrgList">刷新</i> </span>

      </div>
    </div>
    <div class="list-right">
      <div class="form-row">
        <span class="title">蜂农列表</span>
      </div>
      <div class="form-row">
        <span class="farmer-span">管理员：张三</span>
        <span class="farmer-span">联系人：张三</span>
        <span class="farmer-span">联系邮箱：171chjvhebde@qq.com</span>
        <span class="farmer-span">联系电话：10029e9719212</span>
        <span class="farmer-span">联系地址：上海市嘉定区嘉定镇嘉定村</span>

      </div>
      <table border="0" class="header">
        <tr>
          <th style="border:none;width:3%;text-align:center">
            <el-checkbox v-model="BeeFarmerAllStatus" @change="changeAllBeeFramerStatus(BeeFarmerAllStatus)"></el-checkbox>
          </th>
          <th>组织ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>组织名称<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>蜂农<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>蜂箱数量<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>创建时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>邮箱</th>
          <th>联系电话</th>
          <th>地址</th>
        </tr>
        <tr v-for="(beeframerList,index) in beeframerLists" :key="beeframerList.id">
          <td style="border:none;width:3%;text-align:center;background:none" >
            <el-checkbox v-model="BeeFarmerStatusList[index]" @change="changeBeeFramerStatus(index,BeeFarmerStatusList[index],beeframerList.id)"></el-checkbox>
          </td>
          <td>{{beeframerList.id}}</td>
          <td>{{beeframerList.organizationName}}</td>
          <td>{{beeframerList.username}}</td>
          <td>{{beeframerList.beeBoxNum}}</td>
          <td>{{beeframerList.createDate}}</td>
          <td>{{beeframerList.email}}</td>
          <td>{{beeframerList.mobile}}</td>
          <td>{{beeframerList.address}}</td>
        </tr>
      </table>
      <div class="form-row" style="margin-top:20px">
        <span class="icon-span"><i class="iconfont icon-shuaxin1">删除</i> </span>
        <span class="icon-span"><i class="iconfont icon-shuaxin1">刷新</i> </span>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import { get, post } from '../../common/post.js';
import { Validate, organizeAddSchema } from '../../common/schema.js';
export default {
	name: '',
	data(){
		return {
			organizeData:{
				organizationName:'',
				contactName:'',
				email:'',
				mobile:'',
				address:''
			},
			organizeLists: [],//组织列表
			beeframerLists: [],//蜂农列表
			organizeAllStatus: false,//组织全选状态
			BeeFarmerAllStatus:false,//蜂农全选状态
			organizeStatusList:[],//组织列表状态
			BeeFarmerStatusList:[],//蜂农列表状态
			deleteOrganizeIdArray:[],//需要删除组织数据的数组
			deleteOrganizeIdObject:{},//需要删除组织对象的数组
			deleteBeeFramerIdArray:[],//需要删除蜂农数据的数组
			deleteBeeFramerIdObject:{},//需要删除蜂农对象的数组
		}
	},
	methods: {
		//创建组织 编辑组织
		createOrg() {
			let message = '创建';
			if(this.organizeData.id !== undefined){
				message = '修改'
			}
			let result = post('/alterOrganization', this.organizeData);
			result.then(res=>{
				if(res.data.responseCode === "000000"){
					this.$message({
			          showClose: true,
			          message: message+'成功',
			          type: 'success'
			        });
			        this.getOrgList();
		        }else{
		        	this.$message({
			          showClose: true,
			          message: message+'失败',
			          type: 'error'
			        });
		        }
			});
			// let options = {
			// 	organizationName: this.organizeData.name,
			// 	contactName: this.organizeData.contactName,
			// 	email: this.organizeData.email,
			// 	mobile: this.organizeData.mobile,
			// 	address: this.organizeData.address
			// };
			// console.log(options);
			// if (Validate(options, organizeAddSchema) !== null) {
			// 	this.$message({
		 //          showClose: true,
		 //          message: '字段不能为空',
		 //          type: 'error'
		 //        });
			// 	return;
			// };
		},
		//清除蜂农
		clearOrg(){
			this.organizeData = {
				organizationName:'',
				contactName:'',
				email:'',
				mobile:'',
				address:''
			}
		},
		//搜索组织
		searchOrg() {},
		//获取组织列表 刷新组织列表
		getOrgList() {
			let result = get('/getAllOrganizations', null);
			result.then(res=>{
				this.organizeLists = res.data.data;
				this.organizeStatusList.length = this.organizeLists.length;
				for(let i =0;i<this.organizeStatusList.length; i++){
					this.organizeStatusList[i] = false;
				}
				let result = post('/getOrganizationBeeFarmers', {
					organizationId: this.organizeLists[0].id
				});
				result.then(res=>{
					console.log(res);
					this.beeframerLists = res.data.data;
					for(let i =0;i<this.beeframerLists.length;i++){
						this.BeeFarmerStatusList[i] = false;
					}
				});
			});
		},
		//删除组织列表
		deleteOrgList() {
			let result = post('/deleteOrganizations', { ids: [] });
		},

		//获取组织下的蜂农列表 刷新
		getOrgFarmerList(id,index) {
			console.log(this.organizeLists)
			this.organizeData = {
				organizationName:this.organizeLists[index].organizationName,
				contactName:this.organizeLists[index].contactName,
				email:this.organizeLists[index].email,
				mobile:this.organizeLists[index].contactPhone,
				address:this.organizeLists[index].address,
				id:id,
				beeBoxNum:this.organizeLists[index].beeBoxNum,
				createDate:this.organizeLists[index].createDate,
				firstTimeLogin:this.organizeLists[index].firstTimeLogin,
				name:this.organizeLists[index].name,
				organizationId:this.organizeLists[index].organizationId,
				status:this.organizeLists[index].status,
				updateDate:this.organizeLists[index].updateDate,
				username:this.organizeLists[index].username,
			};
			console.log(this.organizeData);
			let result = post('/getOrganizationBeeFarmers', {
				organizationId: id
			});
			result.then(res=>{
				console.log(res);
				this.beeframerLists = res.data.data;
				for(let i =0;i<this.beeframerLists.length;i++){
					this.BeeFarmerStatusList[i] = false;
				}
			});
		},
		//删除组织下的蜂农列表
		deleteOrgFarmerList() {
			let result = post('/deleteFarmers', {
				ids: '',
			});
		},
		//组织全选状态
		changeAllOrganizeStatus(val){
			for(let i =0;i<this.organizeStatusList.length;i++){
				this.organizeStatusList[i] = val
			}
			console.log(this.organizeStatusList);
			if(val){
				this.organizeLists.forEach((item,index)=>{
					this.deleteOrganizeIdObject[item.id] = val
				})
			}
		},
		//组织单选状态
		changeOrganizeStatus(index,val,id){
			event.preventDefault();
			if(val){
				this.deleteOrganizeIdObject[id] = val;
			}else{
				delete this.deleteOrganizeIdObject[id];
			}
			console.log(this.deleteOrganizeIdObject);
			if(!val){this.organizeAllStatus = false};
			if(this.organizeStatusList.toString().indexOf("false")<0){this.organizeAllStatus = true};
		},
		//蜂农全选状态
		changeAllBeeFramerStatus(val){
			for(let i =0;i<this.BeeFarmerStatusList.length;i++){
				this.BeeFarmerStatusList[i] = val
			}
			console.log(this.BeeFarmerStatusList);
			if(val){
				this.beeframerLists.forEach((item,index)=>{
					this.deleteBeeFramerIdObject[item.id] = val
				})
			}
		},
		//蜂农单选状态
		changeBeeFramerStatus(index,val,id){
			event.preventDefault();
			if(val){
				this.deleteBeeFramerIdObject[id] = val;
			}else{
				delete this.deleteBeeFramerIdObject[id];
			}
			console.log(this.deleteBeeFramerIdObject);
			if(!val){this.BeeFarmerAllStatus = false};
			if(this.BeeFarmerStatusList.toString().indexOf("false")<0){this.BeeFarmerAllStatus = true};
		}
	},
	mounted(){
		this.getOrgList()
	}
};
</script>
<style lang="" scoped>
.container {
	width: calc(100%-18px);
	margin-top: 40px;
	margin-left: 10px;
	margin-right: 10px;
	background: #15232f;
	border: 1px solid #235978;
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
	margin-left: 10px;
	margin-bottom: 20px;
	font-size: 17px;
}

.form-row-section {
	display: flex;
}

.input-section-left {
	width: 65%;
	height: 160px;
}

.input-section-right {
	width: 35%;
	height: 160px;
	border-left: 2px solid white;
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

.sure-btn,.clear-btn {
	width: 80px;
	height: 30px;
	margin-left: 20px;
	margin-top: 20px;
	text-align: center;
	line-height: 30px;
	background: #40557b;
	color: white;
	display:inline-block;
	cursor: pointer;
}

.list-box {
	width: 100%;
	height: 500px;
	margin-top: 30px;
}

.header {
	border-collapse: collapse;
	width: 100%;
}

.header table,
.header th {
	border: none;
	font-size: 13px;
	height:40px;
}

.header td {
	background: #c3bfc1;
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

.icon-span {
	float: right;
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
	margin-left: 10px;
	background: #2c4261;
	padding: 10px;
	width: 30%;
}

.list-right {
	width: 70%;
	height: 900px;
	margin-left: 10px;
	margin-right: 10px;
	background: #0b1b36;
	padding: 10px;
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
