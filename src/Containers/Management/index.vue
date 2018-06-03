<template>
  <div class="management-total">
     管理
     <div class="management-top">
          <div class="management-add">
            创建管理员
            <el-form label-position="right" label-width="80px" :model="managementadd">
                <el-form-item label="名称">
                   <el-input v-model="managementadd.username"></el-input>
                </el-form-item>
                <el-form-item label="合作社">
                   <el-input v-model="managementadd.group"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                   <el-input v-model="managementadd.email"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                   <el-input v-model="managementadd.tel"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                   <el-input v-model="managementadd.verifyCode"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                   <el-input v-model="managementadd.address"></el-input>
                </el-form-item>
                <el-form-item>

                   <el-checkbox v-model="managementadd.beekeeper.status">蜂农管理</el-checkbox>
                   <el-radio v-model="managementadd.beekeeper.radio" label="1">只读</el-radio>
                   <el-radio v-model="managementadd.beekeeper.radio" label="2">管理</el-radio>

                   <el-checkbox v-model="managementadd.hive.status">蜂箱管理</el-checkbox>
                   <el-radio v-model="managementadd.hive.radio" label="1">只读</el-radio>
                   <el-radio v-model="managementadd.hive.radio" label="2">管理</el-radio>

                   <el-checkbox v-model="managementadd.event.status">事件管理</el-checkbox>
                   <el-radio v-model="managementadd.event.radio" label="1">只读</el-radio>
                   <el-radio v-model="managementadd.event.radio" label="2">管理</el-radio>

                   <el-checkbox v-model="managementadd.management.status">管理员管理</el-checkbox>
                   <el-radio v-model="managementadd.management.radio" label="1">只读</el-radio>
                   <el-radio v-model="managementadd.management.radio" label="2">管理</el-radio>

                   <el-checkbox v-model="managementadd.group_manage.status">组织管理</el-checkbox>
                   <el-radio v-model="managementadd.group_manage.radio" label="1">只读</el-radio>
                   <el-radio v-model="managementadd.group_manage.radio" label="2">小组管理</el-radio>
                   <el-radio v-model="managementadd.group_manage.radio" label="3">高级管理</el-radio>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="managerAdd">确定</el-button>
                </el-form-item>
                
                
            </el-form>
          </div>
          <div class="management-search">
            <el-input
              placeholder="请输入搜索内容"
              v-model="search">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
     </div>
     <div class="management-list-header">
          <el-col :span="5">管理员ID</el-col>
          <el-col :span="3">登录名</el-col>
          <el-col :span="3">姓名</el-col>
          <el-col :span="3">管理员类型</el-col>
          <el-col :span="3">成员数量</el-col>
          <el-col :span="3">创建时间</el-col>
          <el-col :span="3">修改时间</el-col>
          <el-col :span="3">合作社</el-col>
          <el-col :span="3">邮箱</el-col>
          <el-col :span="2">联系电话</el-col>
          <el-col :span="2">地址</el-col>
          <el-col :span="2">状态</el-col>
     </div>
     <div class="management-lsit-row">

     </div>
  </div>
</template>
<script>
// import beekeeperadd from './beekeeperadd.vue';
export default {
	data() {
		return {
			managementadd: {
        username: '',
        group:'',
        email:'',
        tel:'',
        verifyCode:'',
        address:'',
        beekeeper:{
          status:'false',
          type:'',
          radio: '1'
        },
        hive:{
          status:false,
          type:'',
          radio: '1'
        },
        event:{
          status:false,
          type:'',
          radio: '1'
        },
        management:{
          status:false,
          type:'',
          radio: '1'
        },
        group_manage:{
          status:false,
          type:'',
          radio: '1'
        },
      },
      search:'',
			formLabelWidth: '',
		};
	},
	methods: {
    managerAdd(){

    },
		delete1() {
			let _this = this;
			let result = post('/', {});
			result.then(res => {});
		},
	},
};
</script>
<style scoped>
.management-total {
	width: 100%;
	height: 100%;
}
.management-top {
	width: 100%;
	height: 20%;
}
.management-list-header {
	width: 100%;
	height: 30%;
}
.management-lsit-row {
}
</style>


