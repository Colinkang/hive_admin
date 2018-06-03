<template>
  <div class="organization-total">
     <div class="organization-top">
          <div class="organization-add">
            <el-row>
              创建组织
            </el-row>
            <el-row>
              <el-col>
                 组织名称
              </el-col>
              <el-col>
                <el-input v-model="orgName"></el-input>
              </el-col>
               <el-col>
                 联系人名称
              </el-col>
              <el-col>
                <el-input v-model="contactName"></el-input>
              </el-col>
              <el-col>
                 邮箱
              </el-col>
              <el-col>
                <el-input v-model="email"></el-input>
              </el-col>
            <el-col>
              联系电话
            </el-col>
              <el-col>
                <el-input v-model="tel"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                地址
              </el-col>
              <el-col>
                <el-input v-model="address"></el-input>
              </el-col>
              
            </el-row>
            <el-row>
              <el-button @click="empty">清空内容</el-button>
              <el-button @click="add">确定</el-button>
            </el-row>
          </div>
          <div class="organization-search">搜索</div>
     </div>
     <el-row class="organization-list-header">
          <el-col :span="2">组织ID</el-col>
          <el-col :span="2">组织名称</el-col>
          <el-col :span="3">联系人</el-col>
          <el-col :span="3">成员数量</el-col>
          <el-col :span="3">创建时间</el-col>
          <el-col :span="3">邮箱</el-col>
          <el-col :span="3">联系电话</el-col>
          <el-col :span="2">地址</el-col>
          <el-col :span="3">状态</el-col>
     </el-row>
     <el-row class="organization-lsit-row" v-for="(item) in tableData" :key="item.id">
        <el-col :span="2">{{item.id}}</el-col>
        <el-col :span="2">{{item.organizationName}}</el-col>
        <el-col :span="2">{{item.contactName}}</el-col>
        <el-col :span="2">{{item.memberNum}}</el-col>
        <el-col :span="1">{{item.createDate}}</el-col>
        <el-col :span="1">{{item.email}}</el-col>
        <el-col :span="1">{{item.contactPhone}}</el-col>
        <el-col :span="1">{{item.address}}</el-col>
        <el-col :span="2">{{item.status}}</el-col>
  </el-row>
    
  </div>
</template>
<script>
import { post } from '../../common/post.js';
export default {
	data() {
		return {
			id: '',
			orgName: '',
			contactName: '',
			email: '',
			tel: '',
			address: '',
			tableData: [],
		};
	},
	created: function() {
    this.getOrgList(10, 1);
    
	},
	methods: {
		empty() {
			let _this = this;
			_this.id = '';
			_this.orgName = '';
			_this.contactName = '';
			_this.email = '';
			_this.tel = '';
			_this.address = '';
		},

		add() {
			let _this = this;
			let result = post('/', {});
			result.then(res => {});
		},
		getOrgList(pageSize, pageNo) {
      let _this = this;
			let result = post('/getPageOrganizations', { pageSize: pageSize, pageNo: pageNo });
			result.then(function(res) {
			   if(res.data.responseCode ==='000000'){
           let organizations = res.data.data.organizations;
          //  for(let t of organizations)
          _this.tableData = organizations;
         }
			});
    },
    delete(){
      post('/',null);
    }
	},
};
</script>
<style scoped>
.organization-total {
	width: 100%;
	height: 100%;
}
.organization-top {
	width: 100%;
	height: 20%;
}
.organization-list-header {
	width: 100%;
	height: 30%;
}
.organization-lsit-row {
}
</style>


