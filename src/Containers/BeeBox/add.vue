<template>
<div class="container">
  <div class="add-box">
    <el-row class="form-row">
      <el-col :span="3">
        蜂箱ID
      </el-col>
      <el-col :span="3">
        <el-input size="mini" placeholder="请输入内容" v-model.trim="beeBox.beeBoxNo"></el-input>
      </el-col>
      <el-col :span="3" :offset="3">
        所属蜂农ID
      </el-col>
      <el-col :span="3">
        <el-select size="mini" v-model="beeBox.farmerId" clearable placeholder="请选择" style="width:100%">
          <el-option v-for="item in farmList" :key="item.id" :label="item.username" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容" v-model.trim="beeBox.farmerId"></el-input>
    </el-col> -->
    </el-row>
    <el-row class="form-row">
      <el-col :span="3">
        出厂批次
      </el-col>
      <el-col :span="3">
        <el-input size="mini" placeholder="请输入内容" v-model.trim="beeBox.batchNo"></el-input>
      </el-col>
      <el-col :span="3" :offset="3">
        手机号码
      </el-col>
      <el-col :span="3">
        <el-input size="mini" placeholder="请输入内容" v-model.trim="beeBox.mobile"></el-input>
      </el-col>
      <el-col :span="3">
        <span class="sent-code" @click="sendCode">发送验证码</span>
      </el-col>
    </el-row>
    <el-row class="form-row">
      <el-col :span="3">
        生产日期
      </el-col>
      <el-col :span="3">
        <!-- <el-input size="small"  placeholder="请输入内容" v-model="beeBox.entryDate"></el-input> -->
        <el-date-picker style="width:100%;" size="mini" v-model.trim="beeBox.entryDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
      <el-col :span="3" :offset="3">
        验证码
      </el-col>
      <el-col :span="3">
        <el-input size="mini" placeholder="请输入内容" v-model.trim="beeBox.code"></el-input>
      </el-col>

    </el-row>
    <el-row class="form-row">
      <el-col :span="3">
        厂商
      </el-col>
      <el-col :span="3">
        <el-input size="mini" placeholder="请输入内容" v-model.trim="beeBox.manufacturer"></el-input>
      </el-col>
      <el-col :span="3" :offset="3">
        状态
      </el-col>
      <el-col :span="5" style="text-align:left">
        <el-radio v-model="beeBox.status" label="1">禁用</el-radio>
        <el-radio v-model="beeBox.status" label="2">开启</el-radio>
      </el-col>

    </el-row>
    <el-row class="form-row">
      <el-col :span="4">
        <el-button type="primary" @click="save">保存</el-button>
      </el-col>
    </el-row>

  </div>
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
		farmList: [],
	}),
	mounted() {
		this.getFarmer();
	},
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
			console.log(111, options);
			if (Validate(options, beeBoxAddSchema) !== null) {
				this.$message({
					message: '字段都不能为空',
					type: 'warning',
				});
				return;
			}
			console.log(options);
			let result = post('/alterBeeBox', options);
			result.then(res => {
				this.showAlert = true;
				console.log(112, res);
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '该蜂箱添加成功',
						type: 'success',
					});
					this.$router.push({
						path: '/beebox',
					});
				} else if (res.data.responseCode === '000110') {
					this.$message({
						message: '蜂箱ID已经添加过了',
						type: 'warning',
					});
				} else if (res.data.responseCode === '000031') {
					this.$message({
						message: '没有该蜂农信息',
						type: 'warning',
					});
				} else {
					this.$message.error('添加失败');
				}
			});
			//保存成功后
		},
		sendCode() {
			if (!this.beeBox.mobile) {
				this.$message({
					message: '手机号不能为空',
					type: 'warning',
				});
				return;
			}
			let result = post('/adminSMSService', {
				mobile: this.beeBox.mobile,
				userName: 'hello',
				registerFlag: 1,
				messageType: 2298872,
			});
			result.then(res => {
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '获取验证码成功',
						type: 'success',
					});
				}
			});
		},
		getFarmer() {
			let result = get('/getAllFarmers', null);
			result.then(res => {
				console.log(111, res);
				if (res.data.responseCode === '000000') {
					this.farmList = res.data.data;
				}
			});
		},
	},
};
</script>
<style lang="" scoped>
.container {
	color: white;
	height: 950px;
	overflow: hidden;
	margin-top: 100px;
}

.add-box {
	width: 90%;
	margin-left: 5%;
	height: 400px;
	border: 2px solid #036eb8;
	background: #3f3e3c;
}

.form-row {
	height: 40px;
	line-height: 40px;
	margin-top: 20px;
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
	height: 25px;
	line-height: 25px;
}

.sent-code:hover {
	color: rgb(122, 122, 122);
	cursor: pointer;
}
</style>
