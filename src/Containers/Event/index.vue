<template>
<div class="container">
  <div class="section-left">
    <ul>
      <li :class="selected===1?'selected':''" @click="selectModule(1)">AI模式</li>
      <li :class="selected===2?'selected':''" @click="selectModule(2)">人工模式</li>
      <li :class="selected===3?'selected':''" @click="selectModule(3)">协作模式</li>
    </ul>
    <div class="rule-box">
      <div class="form-row">
        <span class="title">创建预警规则</span>
      </div>
      <div class="form-row">
        <span class="input-item" style="margin-left:20px;"><label>名称 <input style="width:300px;"/></label></span>
      </div>
      <div class="form-row">
        <span class="input-item" style="margin-left:20px">
          <div class="">
            目标
          </div>
          <div class="" style="margin-top:5px">
            <select style="width:80px;">
              <option value ="volvo">Volvo</option>
              <option value ="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            条件
          </div>
          <div class="" style="margin-top:5px">
            <select style="width:80px;">
              <option value ="volvo">Volvo</option>
              <option value ="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            阈值
          </div>
          <div class="" style="margin-top:5px">
            <span><input style="width:40px;"/></span>
        <span><input style="width:40px;"/></span>
      </div>
      </span>
      <span class="input-item" style="margin-left:20px">
          <div class="">
            动作
          </div>
          <div class="" style="margin-top:5px">
            <select style="width:80px;">
              <option value ="volvo">Volvo</option>
              <option value ="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </span>
      <span class="input-item" style="margin-left:20px">
          <div class="" style="color:#dde5f4">
            添加
          </div>
          <div class="" style="margin-top:5px">
            <span class="iconfont icon-add">添加</span>
    </div>
    </span>
  </div>
  <div class="form-row">
    <div class="sure-btn">
      确认
    </div>
  </div>
  <div class="form-row" style="margin-top:40px">
    <div class="tiaojian">
      <div class="">
        已有规则
      </div>

    </div>
    <div class="canshu" style="text-align:right">
      <span style="margin-right:20px"><i class="iconfont icon-add">添加</i></span>
      <span <i class="iconfont icon-069delete">删除</i></span>

    </div>
    <div class="form-row">
      <div class="exit-rule"></div>
    </div>
    <div class="form-row" style="color: #cdcacf;">
      共(0)
    </div>
  </div>

</div>
</div>

<div class="section-right">
  <div class="form-title" style="color:white;text-align:left">
    现有组
  </div>
  <div class="form-row" style="text-align:left">
    <span class="input-item" style="margin-left:20px;color:white"><label>搜索 </label></span>
    <span style="width:200px;display:inline-block;margin-right:30px">
      <el-input size="mini" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21">
     </el-input>
  </span>

  <div class="form-row group-table">
    <table border="0" style="border:none">
      <tr style="border:none;background:#40577f;color:white">
        <th style="border:none;width:25%;color:white">
          <el-checkbox v-model="checked">日期<i class="iconfont icon-duibi" style="font-size:12px"></i></el-checkbox>
        </th>
        <th style="border:none;width:25%;color:white">事件<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th style="border:none;width:50%;color:white">处理方式</th>
      </tr>
      <tr>
        <td style="width:25%;">-</td>
        <td style="width:25%;">1</td>
        <td style="width:50%;">2</td>
      </tr>
      <tr>
        <td style="width:25%;">-</td>
        <td style="width:25%;">1</td>
        <td style="width:50%;">2</td>
      </tr>
      <tr>
        <td style="width:25%;">-</td>
        <td style="width:25%;">1</td>
        <td style="width:50%;">2</td>
      </tr>
      <tr>
        <td style="width:25%;">-</td>
        <td style="width:25%;">1</td>
        <td style="width:50%;">2</td>
      </tr>
    </table>
  </div>
  <div class="form-row">
    <span style="color:white">共（2）</span>
    <span class="icon-span"><i class="iconfont icon-shuaxin1">刷新</i> </span>
  </div>



  </div>
</div>
</div>
</template>
<script>
import { get, post } from '../../common/post.js';
export default {
	name: '',
	data: () => ({
		selected: 2,
		checked: true,
		input21: '',
	}),
	methods: {
		selectModule(selected) {
			this.selected = selected;
		},
		//创建预警规则
		createWarmRule() {
			let _this = this;
			let result = post('/api', {});
		},
		//获取预警规则列表  刷新已有规则
		getWarnList() {
			let _this = this;
			let result = get('/api/');
		},

		//删除已有规则
		deleteWarnRule() {
			let _this = this;
			let result = post('/api');
      result.then(res=>{

      });
		},

		// 历史预警列表
		historyWarnList() {
			let _this = this;
			let result = get('/api/');
			result.then(res => {});
		},

		//历史预警列表搜索
		historyWarnSearch() {
			let _this = this;
			let result = post('/api/', {});
		},
	},
};
</script>
<style lang="" scoped>
.container {
	width: 100%;
	display: flex;
	color: #32354d;
}

.section-left {
	width: 44%;
	min-height: 800px;
	margin-left: 1px;
	padding: 10px;
	padding-top: 30px;
}

.section-right {
	width: 54%;
	min-height: 800px;
	margin-left: 10px;
	margin-right: 10px;
	padding: 10px;
	padding-top: 40px;
}

ul {
	width: 100%;
	height: 30px;
	text-align: center;
	display: flex;
	margin: 0;
	padding: 0;
}

li {
	width: 33%;
	list-style: none;
	color: white;
	border: 1px solid #181d62;
	background: #3d5277;
	line-height: 30px;
	height: 30px;
}

li:hover {
	cursor: pointer;
	background: #b4b9c4;
	border-bottom: none;
	color: black;
}

.selected {
	background: #dde5f4;
	border-bottom: none;
	color: black;
}

.rule-box {
	width: calc(100%-2px);
	height: 212px;
	margin-top: -1px;
	background: #dde5f4;
	border: 1px solid #162f46;
}

.form-row {
	text-align: left;
}

.title {
	margin-left: 20px;
	margin-top: 20px;
	display: inline-block;
	font-size: 17px;
}

.input-item {
	display: inline-block;
	margin-top: 10px;
}

.sure-btn {
	width: 80px;
	height: 30px;
	margin-left: 20px;
	margin-top: 20px;
	text-align: center;
	line-height: 30px;
	background: #40557b;
	color: white;
}

.iconfont:hover {
	color: rgb(125, 125, 125);
	cursor: pointer;
}

.tiaojian,
.canshu {
	width: 49%;
	display: inline-block;
	color: #cdcacf;
}

.sure-btn {
	width: 80px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	background: #0b1b36;
	color: white;
}

.exit-rule {
	width: 100%;
	height: 410px;
	color: black;
	background: white;
}

.group-table {
	height: 600px;
	background: #e8f0f9;
	overflow: scroll;
	color: white;
	margin-top: 20px;
}

table {
	border-collapse: collapse;
	width: 100%;
}

table tr:hover {
	cursor: pointer;
	background: #eee;
}

table,
th,
td {
	border: 1px solid #d3d7db;
	font-size: 14px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	color: black;
}

table tr th {
	width: 14.28%;
}

.icon-span {
	float: right;
	font-size: 12px;
	margin-right: 20px;
	color: white;
}

.icon-span i {
	font-size: 13px;
}
</style>
