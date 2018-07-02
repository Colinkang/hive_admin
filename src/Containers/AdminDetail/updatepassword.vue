<template>
  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <el-row style="font-size:25px;top:70px">修改密码</el-row>
        <el-row style="font-size:14px;top:80px">管理员：{{username}}</el-row>
        <el-row style="font-size:14px;top:90px">管理员ID：{{id}}</el-row>
      </div>
      <div class="">
				 <el-row class="form-row">
          <el-col :span="3">
            旧登录密码
          </el-col>
          <el-col :span="5">
            <el-input size="mini" type="password" v-model.trim="fix.oldPassword"  placeholder="请输入内容"></el-input>
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            新登录密码
          </el-col>
          <el-col :span="5">
            <el-input size="mini" type="password" v-model.trim="fix.newPassword"  placeholder="请输入内容"></el-input>
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            确认新密码
          </el-col>
          <el-col :span="5">
            <el-input size="mini" type="password" v-model.trim="fix.newPasswordConfirm"  placeholder="请输入内容"></el-input>
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            联系手机号
          </el-col>
          <el-col :span="5">
            <el-input size="mini" v-model.trim="fix.mobile"  placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="4">
            <span class="sent-code" @click="sendCode">发送短信验证码</span>
          </el-col>
          <el-col :span="3" >
            验证码
          </el-col>
          <el-col :span="3">
            <el-input size="mini" v-model.trim="fix.code"  placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row class="form-row">
          <el-col :span="4">
            <el-button type="primary" @click="save">确认修改</el-button>
          </el-col>
          <!-- <el-col :span="4">
            <el-button type="default" @click="hive">取消</el-button>
          </el-col> -->
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
import { get, post } from '../../common/post.js';
import { Validate, updatePasswordSchema } from '../../common/schema.js';
import localStore from '../../common/localStore.js';
import { HIVE_USER_NAME, HIVE_ADMIN_ID } from '../../common/localStorageKey.js';
export default {
	name: '',
	data: () => ({
		changeCodeShowAlert: false,
		Id: '',
		username: '',
		fix: {
			username: '',
			oldPassword: '',
			newPassword: '',
			newPasswordConfirm: '',
			mobile: '',
			code: '',
		},
	}),
	mounted() {
		this.id = localStore.getItem(HIVE_ADMIN_ID);
		this.username = localStore.getItem(HIVE_USER_NAME);
	},
	methods: {
		sendCode() {
			if (!this.fix.mobile) {
				this.$message({
					message: '请先输入手机号',
					type: 'warning',
				});
				return;
			}
			let options = {
				mobile: this.fix.mobile,
				userName: localStore.getItem(HIVE_USER_NAME),
				messageType: 2298872,
				// registerFlag: 'hello',
			};
			console.log(options);
			let result = post('/adminSMSService', options);
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
			let input = {
				username: localStore.getItem(HIVE_USER_NAME),
				oldPassword: this.fix.oldPassword,
				password: this.fix.newPassword,
				mobile: this.fix.mobile,
				smsCode: this.fix.code,
			};
			console.log(1111, input);
			if (Validate(input, updatePasswordSchema) !== null) {
				this.$message({
					message: '输入都不能为空',
					type: 'warning',
				});
			} else if (this.fix.newPassword !== this.fix.newPasswordConfirm) {
				this.$message({
					message: '两次密码不一致',
					type: 'warning',
				});
			} else {
				let result = post('/adminUpdatePassword', input);
				result.then(res => {
					console.log(1111, res);
					if (res.data.responseCode === '000000') {
						this.$message({
							message: '修改密码成功',
							type: 'success',
						});
					} else if (res.data.responseCode === '000033') {
						this.$message({
							message: '与注册时的手机号不一致',
							type: 'warning',
						});
					} else if (res.data.responseCode === '000038') {
						this.$message({
							message: '旧登录密码不正确',
							type: 'warning',
						});
					} else if (res.data.responseCode === '000034') {
						this.$message({
							message: '验证码错误',
							type: 'warning',
						});
					} else {
						console.log(1111, res);
						this.$message.error('修改密码失败');
					}
				});
			}
		},
		// hive() {
		// 	this.$emit('hide');
		// },
	},
};
</script>
<style lang="" scoped>
.container {
	top: 0;
	left: 0;
	width: 100%;
	height: 950px;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #162f46;
	z-index: 1111;
}
.detail-box {
	width: 80%;
	height: 700px;
	border: 2px solid #036eb8;
	background: #3f3e3c;
}
.section-top {
	height: 250px;
	background: #646260;
	border-bottom: 2px solid #036eb8;
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
