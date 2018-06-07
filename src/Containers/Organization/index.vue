<template>
<div class="container">
  <div class="form-row">
    <span class="title">组织</span>
  </div>
  <div class="form-row form-row-section">
    <div class="input-section-left">
      <div class="form-row">
        <span style="margin-left:20px;margin-top:10px;display:block">创建组织</span>
        <span class="input-item" style="margin-left:20px;"><label>组织名称 <input style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>联系人名称 <input style="width:120px;"/></label></span>

        <span class="input-item" style="margin-left:20px;"><label>邮箱 <input style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>联系电话 <input style="width:120px;"/></label></span>
        <span class="input-item" style="margin-left:20px;"><label>地址 <input style="width:350px;"/></label></span>
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
  <div class="list-container">
    <div class="list-left">
      <div class="form-row">
        <span class="title">组织列表</span>
      </div>
      <table border="0" class="header">
        <tr>
          <th style="border:none;width:3%;text-align:center">
            <el-checkbox v-model="checked"></el-checkbox>
          </th>
          <th>组织ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>组织名称<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>联系人<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>管理员</th>
          <th>成员数量</th>
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


        </tr>
      </table>
      <div class="form-row" style="margin-top:20px">
        <span class="icon-span"><i class="iconfont icon-shuaxin1">删除</i> </span>
        <span class="icon-span"><i class="iconfont icon-shuaxin1">刷新</i> </span>

      </div>
    </div>
    <div class="list-right">
      <div class="form-row">
        <span class="title">蜂农列表</span>
      </div>
      <div class="form-row">
        <span class="farmer-span">管理员：张三</span>
        <span class="farmer-span">联系人：张三</span>
        <span class="farmer-span">联系邮箱：171chjvhebde@qq.com</span>
        <span class="farmer-span">联系电话：10029e9719212</span>
        <span class="farmer-span">联系地址：上海市嘉定区嘉定镇嘉定村</span>

      </div>
      <table border="0" class="header">
        <tr>
          <th style="border:none;width:3%;text-align:center">
            <el-checkbox v-model="checked"></el-checkbox>
          </th>
          <th>组织ID<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>组织名称<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>蜂农<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>蜂箱数量<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>创建时间<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
          <th>邮箱</th>
          <th>联系电话</th>
          <th>地址</th>
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
          <td>4</td>
          <td>5</td>
          <td>5</td>



        </tr>
      </table>
      <div class="form-row" style="margin-top:20px">
        <span class="icon-span"><i class="iconfont icon-shuaxin1">删除</i> </span>
        <span class="icon-span"><i class="iconfont icon-shuaxin1">刷新</i> </span>
      </div>
    </div>
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
    checked: true
  })
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
  padding-bottom: 10px;
}

.form-row {
  text-align: left;
  font-size: 14px;

}

.title {
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 17px;
}

.form-row-section {
  display: flex;
}

.input-section-left {
  width: 65%;
  height: 160px;
}

.input-section-right {
  width: 35%;
  height: 160px;
  border-left: 2px solid white;
}

.sent-code {
  font-size: 13px;
  color: #135f99;
}

.sent-code:hover {
  color: white;
  cursor: pointer;
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

.list-container {
  width: 100%;
  display: flex;
  margin-top: 20px;
}

.list-left {
  height: 900px;
  margin-left: 10px;
  background: #2c4261;
  padding: 10px;
  width: 30%;
}

.list-right {
  width: 70%;
  height: 900px;
  margin-left: 10px;
  margin-right: 10px;
  background: #0b1b36;
  padding: 10px;
}
.farmer-span{
  margin-left: 20px;
  display: inline-block;
  min-width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  color:#5c5466
}
</style>
