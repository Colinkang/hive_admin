<template>
  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <el-row style="font-size:25px;top:70px">管理员信息</el-row>
        <el-row style="font-size:14px;top:80px">{{manager.name}}</el-row>
      </div>
      <div class="">
        <el-row class="form-row">
          <el-col :span="3">
            登录名
          </el-col>
          <el-col :span="5">
           {{manager.username}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            管理员ID
          </el-col>
          <el-col :span="5">
            {{manager.adminId}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            管理员类型
          </el-col>
          <el-col :span="5">
            {{manager.type}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            邮箱
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  placeholder="请输入内容" v-model="manager.email"></el-input>
          </el-col>
          <!-- <el-col :span="4">
            <span class="sent-code">发送邮件获取验证码</span>
          </el-col>
          <el-col :span="3" >
            验证码
          </el-col>
          <el-col :span="3">
            <el-input size="mini"  placeholder="请输入内容"></el-input>
          </el-col> -->

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            联系电话
          </el-col>
          <el-col :span="5">
             {{manager.mobile}}
          </el-col>
          <!-- <el-col :span="4">
            <span class="sent-code">修改</span>
          </el-col> -->


        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            组织
          </el-col>
          <el-col :span="5">
            {{manager.organization}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="4">
            <el-button type="primary" @click="save">保存</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
import { get, post } from '../../common/post.js';
export default {
	name: '',
	data: () => ({
		manager: {
			name: '',
			username: '',
			adminId: '',
			type: '',
			email: '',
			mobile: '',
			organization: '',
		},
	}),
	mounted() {
		this.getManagerInfo();
	},
	methods: {
		save() {
			this.$router.back();
		},
		getManagerInfo() {
			let result = get('/getAdminInfo');
			result.then(res => {
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					console.log(111, data);
					this.manager.name = data.name;
					this.manager.username = data.username;
					this.manager.adminId = data.id;
					this.manager.email = data.email;
					switch (data.type) {
						case 1:
							this.manager.type = '超级管理员';
							break;
						case 2:
							this.manager.type = '高级管理员';
							break;
						case 3:
							this.manager.type = '组织管理员';
							break;
						case 4:
							this.manager.type = '无组织管理员';
							break;;
					}

					// this.manager.type = data.type;
					this.manager.mobile = data.mobile;
					this.manager.organization = data.organizationName;
				}
			});
		},
	},
};
</script>
<style lang="" scoped>
.container {
	width: 100%;
	height: 100%;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
}
.detail-box {
	width: 80%;
	height: 700px;
	border: 1px solid #036eb8;
}
.section-top {
	height: 250px;
	background: #646260;
}
.form-row {
	height: 30px;
	line-height: 30px;
	margin-top: 10px;
}
.sent-code {
	color: rgb(50, 66, 222);
}
.sent-code:hover {
	color: rgb(122, 122, 122);
	cursor: pointer;
}
</style>
