<template>
<div class="container">
  <div class="form-row">
    <span class="title">蜂农</span>
  </div>
  <div class="form-row form-row-section">
    <div class="input-section-left">
      <div class="form-row">
        <span style="margin-left:20px;margin-top:10px;display:block">创建蜂农</span>
        <span class="input-item" style="margin-left:20px;"><label>姓名 <input ref="name" :class="{ active : isEditStatus}" style="width:120px;" v-model="creatFramerData.name" value="creatFramerData.name"/></label></span>
        <span class="input-item" style="margin-left:20px"><label>组织
            <select style="width:120px;" v-model="creatFramerData.organizationId">
            	<option v-for="organizationList in organizationLists" :key="organizationList.id" :value="organizationList.id">{{organizationList.organizationName}}</option>
            </select></label></span>
        <span class="input-item" style="margin-left:20px;"><label>邮箱 <input value="creatFramerData.email" style="width:120px;" v-model="creatFramerData.email"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>联系电话 <input value="creatFramerData.mobile" style="width:120px;" v-model="creatFramerData.mobile"/></label><span class="sent-code" :class="{ active : codeStatus}" @click="sendVerifyCode">{{codeText}}</span></span>
        <span class="input-item" style="margin-left:20px;"><label>验证码 <input value="creatFramerData.code" style="width:50px;" v-model="creatFramerData.code"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>密码 <input value="creatFramerData.password" style="width:120px;" v-model="creatFramerData.password" type="password"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>地址 <input value="creatFramerData.address" style="width:350px;" v-model="creatFramerData.address"/></label></span>
      </div>
      <div class="form-row">
        <div class="sure-btn" @click="createFarmer">
          确认
        </div>
        <div class="clear-btn" @click="clearFarmerInfo">
          清空
        </div>
      </div>
    </div>
    <div class="input-section-right">
      <div class="form-row">
        <span style="margin-left:20px;margin-top:10px;display:block">搜索</span>
        <span class="input-item" style="margin-left:20px;"><label>关键字 <input v-model="beeFarmerKeyWords" style="width:140px;"/></label></span>

      </div>
      <div class="form-row">
        <div class="sure-btn" @click="serachBeeFramerList">
          确认
        </div>
      </div>
    </div>
  </div>
  <div class="list-box">
    <table border="0" class="header">
      <tr>
        <th style="border:none;width:3%;text-align:center">
          <el-checkbox v-model="checkAllStatus" @change="changeAllStatus(checkAllStatus)"></el-checkbox>
        </th>
        <th @click="sortById">蜂农ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>登录名</th>
        <th>姓名</th>
        <th @click="sortByBeeBoxNum">蜂箱数量<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th @click="sortByCreateDate">创建时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th @click="sortByUpdateDate">修改时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>合作社</th>
        <th>邮箱</th>
        <th>联系电话</th>
        <th>地址</th>
        <th>状态</th>
      </tr>
      <tr v-for="(beeFarmerList,index) in beeFarmerLists" :key="beeFarmerList.id" @click="editBeeFarmer(beeFarmerList.id,index)">
        <td style="border:none;width:3%;text-align:center;background:none">
          	<el-checkbox v-model="statusList[index]" :key="beeFarmerList.id" @change="changeStatus(index,statusList[index],beeFarmerList.id)"></el-checkbox>
        </td>
        <td>{{beeFarmerList.id}}</td>
        <td>{{beeFarmerList.username}}</td>
        <td>{{beeFarmerList.name}}</td>
        <td>{{beeFarmerList.beeBoxNum}}</td>
        <td>{{beeFarmerList.createDate | formatDate}}</td>
        <td>{{beeFarmerList.updateDate | formatDate}}</td>
        <td>{{beeFarmerList.organizationName}}</td>
        <td>{{beeFarmerList.email}}</td>
        <td>{{beeFarmerList.mobile}}</td>
        <td>{{beeFarmerList.address}}</td>
        <td>{{beeFarmerList.status | toBeeStatus}}</td>
      </tr>
    </table>
  </div>
  <div class="form-row">
    <el-button type="text" class="icon-span" @click="deleteFarmerList"><i class="iconfont icon-069delete">删除</i></el-button>
    <el-button type="text" class="icon-span" @click="getFarmerList(1)"><i class="iconfont icon-shuaxin1">刷新</i></el-button>

  </div>
  <div class="form-row" style="text-align:center">
    <el-pagination small layout="prev, pager, next" :pagesize="10" :current-page.sync="currentPage" @current-change="handleCurrentChange()" :total="10*totalPageNo">
    </el-pagination>
  </div>
</div>
</template>
<script>
import { get, post } from '../../common/post.js';
import { Validate, beeFarmerAddSchema } from '../../common/schema.js';
import { sortBy } from '../../common/utils.js';
import moment from 'moment';
export default {
	name: '',
	data() {
		return {
			beeFarmerLists: [],//蜂农列表
			creatFramerData:{
				name: '',
				address: '',
				mobile: '',
				code:'',
				password: '',
				organizationId: '',
				email: '',
				beeBoxNum:0
			},//创建蜂农表单数据
			currentPage:1,
			deleteIdArray:[],//需要删除数据的数组
			deleteIdObject:{},//需要删除对象的数组
			isEditStatus:false,//编辑的时候姓名的状态
			organizationLists:[],//获取列表的对象
			codeText:'发送短信验证码',//短信验证码按钮的字
			codeStatus:false,//短信验证码按钮的状态
			totalPageNo:1,//需要展示的多少也
			checkAllStatus:false,//全选的状态
			beeFarmerKeyWords:'',//搜索关键字
			statusList:[],//按钮状态列表
			sortStatus:true,//默认从小到大
			idArray:[],//获取蜂农组织id的数组
			beeFarmerSortList:[],//排序后的数据
			array1:[]
		};
	},
	methods: {
		sortById(){
		    this.array1 = sortBy('id',this.statusList,this.checkAllStatus,[],this.beeFarmerLists,true);
		    this.beeFarmerSortList = [];
			this.$nextTick(()=>{
				this.beeFarmerLists = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByBeeBoxNum(){
			this.array1 = sortBy('beeBoxNum',this.statusList,this.checkAllStatus,[],this.beeFarmerLists,true);
			this.beeFarmerSortList = [];
			this.$nextTick(()=>{
				this.beeFarmerLists = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByCreateDate(){
			this.array1 = sortBy('createDate',this.statusList,this.checkAllStatus,[],this.beeFarmerLists,true)
			this.beeFarmerSortList = [];
			this.$nextTick(()=>{
				this.beeFarmerLists = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		sortByUpdateDate(){
			this.array1 = sortBy('updateDate',this.statusList,this.checkAllStatus,[],this.beeFarmerLists,true)
			this.beeFarmerSortList = [];
			this.$nextTick(()=>{
				this.beeFarmerLists = this.beeFarmerSortList.concat(this.array1);
				this.array1 = [];
			});
		},
		//点击列表显示的编辑蜂农信息
		editBeeFarmer(id,index){
			let BeeFarmerData = this.beeFarmerLists[index];
			this.$refs.name.setAttribute("readonly","readonly");
			this.isEditStatus = true;
			console.log(BeeFarmerData);
			this.creatFramerData = {
				name: BeeFarmerData.name,
				address: BeeFarmerData.address,
				mobile: BeeFarmerData.mobile,
				code:BeeFarmerData.code,
				password: BeeFarmerData.password,
				organizationId: BeeFarmerData.organizationId,
				email: BeeFarmerData.email,
				beeBoxNum: BeeFarmerData.beeBoxNum,
				id:id,
				username:BeeFarmerData.username
			}
		},
		//创建蜂农 编辑蜂农
		createFarmer() {
			let options = {
				name: this.creatFramerData.name,
				organizationId: this.creatFramerData.organizationId,
				email: this.creatFramerData.email,
				mobile: this.creatFramerData.mobile,
				code: this.creatFramerData.code,
				password: this.creatFramerData.password,
				address: this.creatFramerData.address,
			};
			if (Validate(options, beeFarmerAddSchema) !== null) {
				this.$message({
		          showClose: true,
		          message: '字段不能为空',
		          type: 'error'
		        });
				return;
			}
			let message = '创建';
			if(this.creatFramerData.id !== undefined){
				message = '修改'
			}
			let result = post('/alterBeeFarmer', this.creatFramerData);
			result.then(res => {
				// console.log(res);
				if(res.data.responseCode === "000000"){
					this.$message({
			          showClose: true,
			          message: message+'成功',
			          type: 'success'
			        });
			        this.getFarmerList(1);
				}else{
					this.$message({
			          showClose: true,
			          message: message+'失败',
			          type: 'error'
			        });
				}
			});
		},
		//清空蜂农信息
		clearFarmerInfo(){
			this.$refs.name.removeAttribute("readonly");
			this.isEditStatus = false;
			if(this.creatFramerData.id !== undefined || this.creatFramerData.username !== undefined){
				delete this.creatFramerData.id;
				delete this.creatFramerData.username;
			}
			this.creatFramerData = {
				name: '',
				address: '',
				mobile: '',
				code:'',
				password: '',
				organizationId: '',
				email: ''
			}
		},
		//显示列表页  // 刷新列表页
		getFarmerList(page) {
			this.beeFarmerLists = [];
			this.currentPage = 1;
			this.beeFarmerKeyWords = '';
			let result = post('/getPageFarmers', {
				pageNo: page,
				pageSize: 10,
			});
			result.then(res=>{
				this.beeFarmerLists = res.data.data.beeFarmers;
				this.totalPageNo = res.data.data.totalPageNo;
				this.statusList.length = this.beeFarmerLists.length;
				for(let i =0;i<this.statusList.length;i++){
					this.statusList[i] = false
				}
				console.log(this.totalPageNo);
			})
		},
		//点击分页显示的数据信息
		handleCurrentChange(){
			this.checkAllStatus = false;
			this.deleteId = [];
			if(this.beeFarmerKeyWords===''){
				let result = post('/getPageFarmers', {
					pageNo: this.currentPage,
					pageSize: 10,
				});
				result.then(res=>{
					this.beeFarmerLists = res.data.data.beeFarmers
					this.totalPageNo = res.data.data.totalPageNo
					this.statusList.length = this.beeFarmerLists.length;
					for(let i =0;i<this.statusList.length;i++){
						this.statusList[i] = false
					}
				})
			}else{
				let result = post('/searchBeeFarmer', {
					keyword: this.beeFarmerKeyWords,
					pageNo: val,
					pageSize: 10,
				});
				result.then(res => {
					console.log(res);
					this.beeFarmerLists = res.data.data.beeFarmers;
					this.totalPageNo = res.data.data.totalPageNo;
					this.statusList.length = this.beeFarmerLists.length;
					for(let i =0;i<this.statusList.length;i++){
						this.statusList[i] = false
					}
				});
			}
		},
		// 删除蜂农
		deleteFarmerList() {
			this.deleteIdArray = [];
			for(let item in this.deleteIdObject){
				this.deleteIdArray.push(item);
			}
			if(this.deleteIdArray.length ===0){
				this.$message({
					message: '请先点击列表选择要删除的蜂箱',
					type: 'warning',
				});
				return false;
			}
			console.log(this.deleteIdArray)
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
	        }).then(() => {
				console.log(this.deleteId);
				let result = post('/deleteFarmers', {
					ids: this.deleteIdArray,
				});
				result.then(res=>{
					if(res.data.responseCode==="000000"){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getFarmerList();
					}else{
						this.$message({
							type: 'error',
							message: '删除错误!'
						});
					}
					console.log(res)
				})
	        }).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
	        });
		},
		//获取组织
		getAllOrganizations(){
			let result = get('/getAllOrganizations','');
			result.then(res=>{
				console.log(res)
				this.organizationLists = res.data.data
			})
		},
		//发送验证码
		sendVerifyCode() {
			if(this.codeStatus)return
			let leftTime = 60
			this.codeText = leftTime + 's'
			this.codeStatus = true
			var timer = setInterval(()=>{
				leftTime--;
				this.codeText = leftTime + 's'
				if(leftTime === 0){
					this.codeStatus = false;
					this.codeText = '发送短信验证码';
					clearInterval(timer)
				}
			},1000);
			let result = post('/adminSMSService', {
				mobile: this.creatFramerData.mobile,
				userName: this.creatFramerData.name,
				registerFlag: 1,
				messageType: 2298872
			});
			result.then(res => {
				console.log(res);
			});
		},
		//点击全选的状态
		changeAllStatus(val){
			for(let i =0;i<this.statusList.length;i++){
				this.statusList[i] = val
			}
			if(val){
				this.beeFarmerLists.forEach((item,index)=>{
					this.deleteIdObject[item.id] = val
				})
			}
		},
		//单个点击的状态
		changeStatus(index,val,id){
			event.preventDefault();
			if(val){
				this.deleteIdObject[id] = val;
			}else{
				delete this.deleteIdObject[id];
			}
			console.log(this.deleteIdObject);
			if(!val){this.checkAllStatus = false};
			if(this.statusList.toString().indexOf("false")<0){this.checkAllStatus = true};
		},
		//搜索关键字
		serachBeeFramerList(){
			let result = post('/searchBeeFarmer', {
				keyword: this.beeFarmerKeyWords,
				pageNo: 1,
				pageSize: 10,
			});
			result.then(res => {
				console.log(res);
				this.beeFarmerLists = res.data.data.beeFarmers;
				this.totalPageNo = res.data.data.totalPageNo;
				this.statusList.length = this.beeFarmerLists.length;
				for(let i =0;i<this.statusList.length;i++){
					this.statusList[i] = false
				}
				console.log(this.beeFarmerLists);
			});
		}
	},
	mounted(){
		this.getAllOrganizations();
		this.getFarmerList(1);
	},
	filters:{
		toBeeStatus(data){
			if(data === 0 || data === 1){
				data = '在线';
			}else if(data === 2){
				data = '异常';
			}else{
				data = '离线';
			}
			return data;
		},
		formatDate(timestamp) {
	      return moment(timestamp).format('YYYY-MM-DD');
	    }
	},
	watch:{
		beeFarmerLists(newVal,oldVal){
			console.log(newVal,oldVal);
		}
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
	padding-bottom: 100px;
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
	width: 65%;
	height: 160px;
}

.input-section-right {
	width: 35%;
	height: 160px;
	border-left: 2px solid white;
	width: 70%;
	height: 160px;
}

/* .input-section-right {
  width: 30%;
  height: 160px;
  border-left: 2px solid white;
>>>>>>> b6e309c8bd113e4a9c64474b324e507e8a3ec76c
} */

.sent-code {
	font-size: 13px;
	color: #fff;
	padding:2px 4px;
	margin-left: 10px;
	background-color:#40557b;
	width:120px;
	display:inline-block;
	text-align:center;
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
	cursor: pointer;
	display:inline-block;
}

.list-box {
	width: 100%;
	margin-bottom: 40px;
	margin-top: 60px;
}

.header {
	border-collapse: collapse;
	width: 100%;
}

.header table,
.header th {
	height:40px;
	border: none;
	font-size: 13px;
	cursor: pointer;
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
}

.icon-span i {
	font-size: 13px;
}
.active{
	background-color:#a5a5a5;
}
</style>
