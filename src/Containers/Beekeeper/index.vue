<template>
  <div class="beekeeper-total">
     <div class="beekeeper-top">
          <div class="beekeeper-add">
            <el-row>
              创建蜂农
            </el-row>
            <el-row>
              <el-col>
                 姓名
              </el-col>
              <el-col>
                <el-input v-model="beeKeeperName"></el-input>
              </el-col>
               <el-col>
                 组织
              </el-col>
              <el-col>
                  <el-select v-model="organizationID" clearable   placeholder="请选择">
                          <el-option
                            v-for="item in org"
                            :key="item.id"
                            :label="item.organizationName"
                            :value="item.id">
                          </el-option>
                        </el-select>
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
              <el-col>
              验证码
            </el-col>
              <el-col>
                <el-input v-model="verifyCode"></el-input>
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
          <div class="beekeeper-search">搜索</div>
     </div>
     <div class="beekeeper-list-header">
          <el-col :span="5">蜂农ID</el-col>
          <el-col :span="3">登录名</el-col>
          <el-col :span="3">姓名</el-col>
          <el-col :span="3">蜂箱数量</el-col>
          <el-col :span="3">创建时间</el-col>
          <el-col :span="3">修改时间</el-col>
          <el-col :span="3">合作社</el-col>
          <el-col :span="3">邮箱</el-col>
          <el-col :span="3">联系电话</el-col>
          <el-col :span="3">地址</el-col>
          <el-col :span="3">状态</el-col>
     </div>
     <div class="beekeeper-lsit-row">

     </div>
     <div>
       <el-button @click="deleteFarmers">删除</el-button>
     </div>
  </div>
</template>
<script>
import { post } from '../../common/post.js';
export default {
	data() {
		return {
			beeKeeperId: '',
			beeKeeperName: '',
			orgName: '',
			email: '',
			tel: '',
			contactName: '',
			verifyCode: '',
			address: '',
			org: [],
			organizationID: '',
			ids: [],
		};
	},
	created: function() {
		this.getAllOrganizations();
	},
	methods: {
		getAllOrganizations() {
			let _this = this;
			let result = post('/getAllOrganizations', null);
			result.then(function(res) {
				_this.org = res.data.data;
			});
		},
		getBeeKeeperList() {
			let _this = this;
			let result = post('/getPageOrganizations', { pageSize: pageSize, pageNo: pageNo });
			result.then(function(res) {
				if (res.data.responseCode === '000000') {
					let organizations = res.data.data.organizations;
					//  for(let t of organizations)
					_this.tableData = organizations;
				}
			});
		},
		empty() {
			this.beeKeeperId = '';
			this.beeKeeperName = '';
			this.orgName = '';
			this.email = '';
			this.tel = '';
			this.contactName = '';
			this.verifyCode = '';
			this.address = '';
		},
		add() {
			let _this = this;
		},
		deleteFarmers() {
			let _this = this;
			let result = post('/deleteFarmers', {
				ids: _this.ids,
			});
			result.then(res => {
				if (res.data.responseCode === '000000') {
					console.log(res.data);
				}
			});
		},
	},
};
</script>
<style scoped>
.beekeeper-total {
	width: 100%;
	height: 100%;
}
.beekeeper-top {
	width: 100%;
	height: 20%;
}
.beekeeper-list-header {
	width: 100%;
	height: 30%;
}
.beekeeper-lsit-row {
}
</style>


