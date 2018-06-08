<template>
<div class="container">
  <div class="form-row">
    <span class="title">管理</span>
  </div>
  <div class="form-row form-row-section">
    <div class="input-section-left">
      <div class="form-row">
        <span style="margin-left:20px;margin-top:10px;display:block">创建管理员</span>
        <span class="input-item" style="margin-left:20px;"><label>姓名 <input style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>合作社 <input style="width:120px;"/></label></span>

        <span class="input-item" style="margin-left:20px;"><label>邮箱 <input style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>联系电话 <input style="width:120px;"/></label><span class="sent-code">发送短信验证码</span></span>
        <span class="input-item" style="margin-left:20px;"><label>验证码 <input style="width:70px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>地址 <input style="width:250px;"/></label></span>
        <span class="input-item" style="font-size:17px;margin-left:20px">类型</span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="checked" style="font-size:15px;color:white">蜂农管理</el-checkbox>

          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="radio" label="1" >只读</el-radio>
            <el-radio v-model="radio" label="2" >管理</el-radio>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="checked" style="font-size:15px;color:white">蜂箱管理</el-checkbox>
          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="radio1" label="1" >只读</el-radio>
            <el-radio v-model="radio1" label="2" >管理</el-radio>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="checked" style="font-size:15px;color:white">事件管理</el-checkbox>
          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="radio2" label="1" >只读</el-radio>
            <el-radio v-model="radio2" label="2" >管理</el-radio>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="checked" style="font-size:15px;color:white">管理员管理</el-checkbox>
          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="radio3" label="1" >只读</el-radio>
            <el-radio v-model="radio3" label="2" >管理</el-radio>
          </div>
        </span>
        <span class="input-item" style="margin-left:20px">
          <div class="">
            <el-checkbox v-model="checked" style="font-size:15px;color:white">组织管理</el-checkbox>
          </div>
          <div class="" style="margin-top:5px">
            <el-radio v-model="radio5" label="1" >只读</el-radio>
            <el-radio v-model="radio5" label="2" >小组管理</el-radio>
            <el-radio v-model="radio5" label="3" >高级管理</el-radio>
          </div>
        </span>
      </div>
      <div class="form-row" style="margin-top:10px">


      </div>
      <div class="form-row">
        <div class="sure-btn">
          确认
        </div>
      </div>
    </div>
    <div class="input-section-right">
      <div class="form-row">
        <span style="margin-left:20px;margin-top:10px;display:block">搜索</span>
        <span class="input-item" style="margin-left:20px;"><label>关键字 <input style="width:140px;"/></label></span>

      </div>
      <div class="form-row">
        <div class="sure-btn">
          确认
        </div>
      </div>
    </div>
  </div>

  <div class="list-box">
    <table border="0" class="header">
      <tr>
        <th style="border:none;width:3%;text-align:center">
          <el-checkbox v-model="checked"></el-checkbox>
        </th>
        <th>管理员ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>登录名<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>姓名<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>管理员类型<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>成员数量<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>创建时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
        <th>修改时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
         <th>合作社</th>
        <th>邮箱</th>
        <th>联系电话</th>
        <th>地址</th>
        <th>状态</th>
      </tr>
      <tr v-for="item in list">
        <td style="border:none;width:3%;text-align:center;background:none">
          <el-checkbox v-model="checked"></el-checkbox>
        </td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>022222222222222222222222222222222222222222222222222222</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>

      </tr>
    </table>
  </div>
  <div class="form-row">
    <span class="icon-span"><i class="iconfont icon-shuaxin1">删除</i> </span>
    <span class="icon-span"><i class="iconfont icon-shuaxin1">刷新</i> </span>

  </div>
  <div class="form-row" style="text-align:center">
    <el-pagination small layout="prev, pager, next" :total="50">
    </el-pagination>

  </div>
</div>
</template>
<script>
export default {
  name: "",
  data: () => ({
    list: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    ],
    checked: true,
    radio: 1,
    radio1: 2,
    radio2: 1,
    radio3: 1,
    radio4: 2,
    radio5: 1
  }),
  methods:{
    // 创建管理员  //编辑管理员
    createManager(){

    },
    //模糊搜索管理员
    searchManager(){

    },
    //获取管理员列表  刷新管理员
    getManagerList(){

    },
    // 删除管理员
    deleteManager(){

    }
    //管理员排序

   

  }
}
</script>
<style lang="" scoped>
.container {
  width: calc(100%-18px);
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  background: #15232f;
  border: 1px solid #235978;
  color: white;
  padding-bottom: 100px;
}

.form-row {
  text-align: left;
  font-size: 14px;

}

.title {
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 17px;
}

.form-row-section {
  display: flex;
}

.input-section-left {
  width: 70%;
  height: 200px;
}

.input-section-right {
  width: 30%;
  height: 200px;
  border-left: 2px solid white;
}

.sent-code {
  font-size: 13px;
  color: #135f99;
  margin-left: 10px;
}

.sent-code:hover {
  color: white;
  cursor: pointer;
}

.input-item {
  display: inline-block;
  margin-top: 10px;
  vertical-align: top;
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

.list-box {
  width: 100%;
  height: 500px;
  margin-top: 30px;
}

.header {
  border-collapse: collapse;
  width: 100%;
}

.header table,
.header th {
  border: none;
  font-size: 13px;
}

.header td {
  background: #c3bfc1;
  border: 1px solid white;
  font-size: 14px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 12px;
  color: black;
  max-width: 100px;
  overflow: hidden;
}

.header tr th {}

.header {
  color: white;
}

.icon-span {
  float: right;
  font-size: 12px;
  margin-right: 20px;
}

.icon-span i {
  font-size: 13px;
}

.el-radio {
  font-size: 12px;
  margin-left: 0px;
  color: white;

}
</style>
