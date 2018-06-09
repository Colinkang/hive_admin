<template>
<div class="container">
  <el-row class="form-row">
    <el-col :span="3">
      蜂箱ID
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容"></el-input size="small">
    </el-col>
    <el-col :span="3" :offset="3">
      所属蜂农ID
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容"></el-input size="small">
    </el-col>
  </el-row>
  <el-row class="form-row">
    <el-col :span="3">
      出厂批次
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容"></el-input size="small">
    </el-col>
    <el-col :span="3" :offset="3">
      手机号码
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容"></el-input size="small">
    </el-col>
    <el-col :span="4">
      <span class="sent-code">发送验证码</span>
    </el-col>
  </el-row>
  <el-row class="form-row">
    <el-col :span="3">
      生产日期
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容"></el-input size="small">
    </el-col>
    <el-col :span="3" :offset="3">
      验证码
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容"></el-input size="small">
    </el-col>

  </el-row>
  <el-row class="form-row">
    <el-col :span="3">
      厂商
    </el-col>
    <el-col :span="5">
      <el-input size="small"  placeholder="请输入内容"></el-input size="small">
    </el-col>
    <el-col :span="3" :offset="3">
      状态
    </el-col>
    <el-col :span="5">
      <el-radio v-model="radio" label="1">禁用</el-radio>
      <el-radio v-model="radio" label="2">开启</el-radio>
    </el-col>

  </el-row>
  <el-row class="form-row">
    <el-col :span="4">
      <el-button type="primary" @click="save">保存</el-button>
    </el-col>
  </el-row>
</div>
</template>
<script>
export default {
  name: "",
  data: () => ({
    radio:1
  }),
  methods:{
    save(){
      //保存成功后
      this.$router.push({
        path:'/beebox'
      })
    }
  }
}
</script>
<style lang="" scoped>
.container {
  color: white;
}
.form-row{
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
}
.sent-code{
  color: rgb(50, 66, 222);

}
.sent-code:hover{
  color: rgb(122, 122, 122);
  cursor: pointer;
}
</style>
