<template>
  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <el-row style="font-size:25px;top:70px">管理员信息</el-row>
        <el-row style="font-size:14px;top:80px">{{manager.name}}</el-row>
      </div>
      <div class="">
        <el-row class="form-row">
          <el-col :span="3" style="text-align:right">
            登录名
          </el-col>
          <el-col :span="5">
           {{manager.username}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" style="text-align:right;margin-right:20px;">
            管理员ID
          </el-col>
          <el-col :span="5">
            {{manager.id}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" style="text-align:right;margin-right:20px;">
            管理员类型
          </el-col>
          <el-col :span="5">
            {{manager.type_value}}
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" style="text-align:right;margin-right:20px;">
            邮箱
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  placeholder="请输入内容" v-model="manager.email"></el-input>
          </el-col>
        </el-row>
        <el-row class="form-row">
          <el-col :span="3" style="text-align:right;margin-right:20px;">
            联系电话
          </el-col>
         <el-col :span="5">
              <el-input size="mini"  v-model="manager.mobile"  placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="4">
            <span class="sent-code" @click="sendCode">发送验证码</span>
          </el-col>
          <el-col :span="3" >
            验证码
          </el-col> 
          <el-col :span="3">
            <el-input size="mini" v-model="manager.code"  placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
				 <el-row class="form-row">
          <el-col :span="3" style="text-align:right;margin-right:20px;">
            地址
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  placeholder="请输入内容" v-model="manager.address"></el-input>
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
import { Validate, adminDetailSchema } from '../../common/schema.js';
export default {
	name: '',
	data: () => ({
		manager: {
			name: '',
			username: '',
			type: '',
			email: '',
			mobile: '',
			id: '',
			address: '',
			type_value: '',
			code: '',
		},
	}),
	mounted() {
		this.getManagerInfo();
	},
	methods: {
		sendCode() {
			let result = post('/adminSMSService', {
				mobile: this.manager.mobile,
				userName: this.manager.username,
				messageType: 2298872,
				registerFlag: 1,
			});
			result.then(res => {
				console.log(1234, res);
				if (res.data.responseCode === '000000') {
					console.log('获取验证码成功');
					this.$message({
						message: '获取验证码成功',
						type: 'success',
					});
				} else if (res.data.responseCode === '000033') {
					// this.$message('');
					this.$message({
						message: '输入的手机号与预留的手机号不一致',
						type: 'warning',
					});
				}
			});
		},
		save() {
			let options = {
				id: this.manager.id,
				name: this.manager.name,
				username: this.manager.username,
				mobile: this.manager.mobile,
				email: this.manager.email,
				type: this.manager.type,
				address: this.manager.address,
				code: this.manager.code,
			};
			console.log(options, Validate(options, adminDetailSchema));
			if (Validate(options, adminDetailSchema) !== null) {
				this.$message({
					message: '参数都不能为空',
					type: 'warning',
				});
				return;
			}
			let result = post('/updateAdminInfo', options);
			// this.$router.back();
			result.then(res => {
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '更新管理员信息成功',
						type: 'success',
					});
				} else {
					console.log(res.data);
					this.$message.error('更新管理员信息失败');
				}
			});
		},
		getManagerInfo() {
			let result = get('/getAdminInfo');
			result.then(res => {
				if (res.data.responseCode === '000000') {
					let data = res.data.data;
					console.log(111, data);
					this.manager.id = data.id;
					this.manager.name = data.name;
					this.manager.username = data.username;
					this.manager.mobile = data.mobile;
					this.manager.email = data.email;
					this.manager.type = data.type;
					switch (data.type) {
						case 1:
							this.manager.type_value = '超级管理员';
							break;
						case 2:
							this.manager.type_value = '高级管理员';
							break;
						case 3:
							this.manager.type_value = '组织管理员';
							break;
						case 4:
							this.manager.type_value = '无组织管理员';
							break;
					}
					this.manager.address = data.address;
					this.manager.mobile = data.mobile;
				}
			});
		},
	},
};
</script>
<style lang="" scoped>
.container {
	width: 100%;
	height: 950px;
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
	color: rgb(122, 122, 122);
	cursor: pointer;
}
</style>
