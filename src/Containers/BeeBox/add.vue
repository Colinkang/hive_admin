<template>
<div class="container">
  <el-row class="form-row">
    <el-col :span="3">
      蜂箱ID
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容" v-model="beeBox.beeBoxNo"></el-input>
    </el-col>
    <el-col :span="3" :offset="3">
      所属蜂农ID
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容" v-model="beeBox.farmerId"></el-input>
    </el-col>
  </el-row>
  <el-row class="form-row">
    <el-col :span="3">
      出厂批次
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容" v-model="beeBox.batchNo"></el-input>
    </el-col>
    <el-col :span="3" :offset="3">
      手机号码
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容" v-model="beeBox.mobile"></el-input>
    </el-col>
    <el-col :span="4">
      <span class="sent-code" @click="sendCode">发送验证码</span>
    </el-col>
  </el-row>
  <el-row class="form-row">
    <el-col :span="3">
      生产日期
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容" v-model="beeBox.entryDate"></el-input>
    </el-col>
    <el-col :span="3" :offset="3">
      验证码
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容" v-model="beeBox.code"></el-input>
    </el-col>

  </el-row>
  <el-row class="form-row">
    <el-col :span="3">
      厂商
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容" v-model="beeBox.manufacturer"></el-input>
    </el-col>
    <el-col :span="3" :offset="3">
      状态
    </el-col>
    <el-col :span="5">
      <el-radio v-model="beeBox.status" label="1">禁用</el-radio>
      <el-radio v-model="beeBox.status" label="2">开启</el-radio>
    </el-col>

  </el-row>
  <el-row class="form-row">
    <el-col :span="4">
      <el-button type="primary" @click="save">保存</el-button>
    </el-col>
  </el-row>
  <el-row class="line-height margin-top" v-if="showAlert">
        <el-col :span="24">
          <el-alert :title="text" :type="status==='wrong'?'error':'success'">
          </el-alert>
        </el-col>
      </el-row>
</div>
</template>
<script>
import { get, post } from '../../common/post.js';
import { Validate, beeBoxAddSchema } from '../../common/schema.js';
export default {
	name: '',
	data: () => ({
		showAlert: false,
		text: '',
		status: '',
		radio: '',
		beeBox: {
			beeBoxNo: '',
			farmerId: '',
			manufacturer: '',
			batchNo: '',
			status: '',
			entryDate: '',
			mobile: '',
			code: '',
		},
	}),
	methods: {
		save() {
			let options = {
				beeBoxNo: this.beeBox.beeBoxNo,
				farmerId: this.beeBox.farmerId,
				manufacturer: this.beeBox.manufacturer,
				batchNo: this.beeBox.batchNo,
				status: this.beeBox.status,
				entryDate: this.beeBox.entryDate,
				mobile: this.beeBox.mobile,
				code: this.beeBox.code,
			};
			if (Validate(options, beeBoxAddSchema) !== null) {
				this.showAlert = true;
				this.status = 'error';
        this.text = '字段都不能为空';
        let _this = this;
				setTimeout(function() {
					_this.showAlert = false;
				}, 3000);
				return;
			}
			console.log(options);
			let result = post('/alterBeeBox', options);
			result.then(res => {
				this.showAlert = true;
				console.log(112, res);
				if (res.data.responseCode === '000000') {
					this.status = 'success';
					this.text = '添加成功';
					this.$router.push({
						path: '/beebox',
					});
				} else if (res.data.responseCode === '000110') {
					this.status = 'error';
					this.text = '蜂箱ID已经添加过了';
				} else {
					this.status = 'error';
					this.text = '添加失败';
				}
			});
			//保存成功后
		},
		sendCode() {
			let result = post('/adminSMSService', {
				mobile: this.beeBox.mobile,
				userName: 'hello',
				registerFlag: 1,
				messageType: 2298872,
			});
			result.then(res => {
				if (res.data.responseCode === '000000') {
				}
			});
		},
	},
};
</script>
<style lang="" scoped>
.container {
	color: white;
}
.form-row {
	height: 40px;
	line-height: 40px;
	margin-top: 20px;
}
.sent-code {
	color: rgb(50, 66, 222);
}
.sent-code:hover {
	color: rgb(122, 122, 122);
	cursor: pointer;
}
</style>
