<template>
  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <el-row style="font-size:25px;top:70px">忘记密码</el-row>
        <el-row style="font-size:14px;top:80px"></el-row>
        <el-row style="font-size:14px;top:90px"></el-row>
      </div>
      <div class="">
        <el-row class="form-row">
          <el-col :span="3">
            登录用户名
          </el-col>
          <el-col :span="5">
            <el-input size="mini" v-model.trim="fix.username"  placeholder="请输入内容"></el-input>
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
            确认新登录密码
          </el-col>
          <el-col :span="5">
            <el-input size="mini" type="password" v-model.trim="fix.newPasswordConfirm"  placeholder="请输入内容"></el-input>
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            手机号
          </el-col>
          <el-col :span="5">
            <el-input size="mini" v-model.trim="fix.mobile"  placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="4">
            <span class="sent-code" @click="sendCode">发送短信获取验证码</span>
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
          <el-col :span="4">
            <el-button type="default" @click="hive">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
import { get, post } from '../../common/post.js';
import { Validate, changeCodeSchema } from '../../common/schema.js';
export default {
	name: '',
	data: () => ({
		fix: {
			username: '',
			newPassword: '',
			newPasswordConfirm: '',
			mobile: '',
			code: '',
		},
	}),
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
				userName: this.fix.username,
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
			this.changeCodeShowAlert = true;
			let input = {
				username: this.fix.username,
				password: this.fix.newPassword,
				mobile: this.fix.mobile,
				smsCode: this.fix.code,
			};
			console.log(222, Validate(input, changeCodeSchema));
			if (Validate(input, changeCodeSchema) !== null) {
				this.$message({
					message: '输入项都不能为空',
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
					console.log(333, res);
					if (res.data.responseCode === '000000') {
						this.$message({
							message: '修改密码成功',
							type: 'success',
						});
						this.fix = {
							username: '',
							newPassword: '',
							newPasswordConfirm: '',
							mobile: '',
							code: '',
						};
					} else {
						this.$message.error('修改密码失败');
					}
				});
			}
		},
		hive() {
			this.$emit('hide');
		},
	},
};
</script>
<style lang="" scoped>
.container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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
