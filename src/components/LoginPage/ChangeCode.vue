<template>
  <div class="container">
    <div class="detail-box">
      <div class="section-top">
        <el-row style="font-size:25px;top:70px">修改密码</el-row>
        <el-row style="font-size:14px;top:80px">管理员：张三三</el-row>
        <el-row style="font-size:14px;top:90px">管理员ID：张三三</el-row>
      </div>
      <div class="">
        <el-row class="form-row">
          <el-col :span="3">
            旧登录密码
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  placeholder="请输入内容"></el-input size="mini">
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            新登录密码
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  placeholder="请输入内容"></el-input size="mini">
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            确认新登录密码
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  placeholder="请输入内容"></el-input size="mini">
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            手机号
          </el-col>
          <el-col :span="5">
            <el-input size="mini"  placeholder="请输入内容"></el-input size="mini">
          </el-col>
          <el-col :span="4">
            <span class="sent-code">发送短信获取验证码</span>
          </el-col>
          <el-col :span="3" >
            验证码
          </el-col>
          <el-col :span="3">
            <el-input size="mini"  placeholder="请输入内容"></el-input size="mini">
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="3" >
            联系电话
          </el-col>
          <el-col :span="5">
            1234567876543
          </el-col>
          <el-col :span="4">
            <span class="sent-code">修改</span>
          </el-col>


        </el-row>
        <el-row class="form-row">
          <el-col :span="3">
            组织
          </el-col>
          <el-col :span="5">
            组织
          </el-col>

        </el-row>
        <el-row class="form-row">
          <el-col :span="4">
            <el-button type="primary" @click="save">确认修改</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="default" @click="save">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({

  }),
  methods:{
    save(){
      this.$emit('hide')
    }
  }
}
</script>
<style lang="" scoped>
.container{
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
.detail-box{
  width: 80%;
  height: 700px;
  border:1px solid #036eb8
}
.section-top{
  height: 250px;
  background: #646260;
}
.form-row{
  height: 30px;
  line-height:30px;
  margin-top: 10px;
}
.sent-code{
  color: rgb(50, 66, 222);

}
.sent-code:hover{
  color: rgb(122, 122, 122);
  cursor: pointer;
}
</style>
