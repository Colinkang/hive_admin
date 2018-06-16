<template>
<div class="hello">
  <div class="hello" v-if="isLogin">
    <el-container>
      <el-header>
        <h-header  @logout="logout"></h-header>
      </el-header>
      <el-container>
        <el-aside>
          <n-nav></n-nav>
        </el-aside>
        <el-main>
          <c-content>

          </c-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <div class="login-page" v-else>
    <login-page @login-success="loginSuccess"></login-page>
  </div>
</div>
</template>
<script>
import HHeader from '../components/header/index.vue';
import CContent from '../components/content/index';
import NNav from '../components/nav/index';
import FFooter from '../components/footer/index';
import LoginPage from './LoginPage/index.vue';
import {
  IS_LOGIN
} from '../common/localStorageKey';
import LocalStore from '../common/localStore';
import {
  get
} from '../common/post';
export default {
  name: 'HelloWorld',
  components: {
    HHeader,
    NNav,
    CContent,
    FFooter,
    LoginPage
  },
  data() {
    return {
      collapse: false,
      isLogin:false
    }
  },
  methods: {
    loginSuccess(){
      this.isLogin=true;
      this.$router.push({
        path:'/beebox'
      })
    },
    logout(){
      this.isLogin=false;
      this.$router.push({
        path:'/'
      })
    }
  },
  mounted() {
    // let isLogin = LocalStore.getItem(IS_LOGIN)
    // this.isLogin=isLogin
    // if(!isLogin){
    //   this.$router.push({
    //     path:'/'
    //   })
    // }

    let result = get('/checkTokenExpiration',{})
    result.then((res)=>{
      if(!res.data.data){
        this.isLogin=true
      }else{
        this.isLogin=false
        this.$router.push({
            path:'/'
          })
      }
    })
  }
}
</script>
<style >
.hello {
  width: 100%;
  height: 100%;
}

.el-header {
  padding: 0;
  background: rgb(55, 55, 55)
}

.el-aside {
  width: auto !important;
}

.el-aside {
  overflow: visible;
  min-height: 900px;
  background-color: #0b1b36;
}

.el-menu {
  border: 1px solid #0b1b36;
  background: #0b1b36 !important
}
.login-page{
  width: 100%;
  height: 100%;
  top: 0;
  background: white;
  color: black;
}
.img-upload-row .el-upload__input{
  opacity: 0 !important;
  position: absolute;
}

.mianbao{
  position: relative;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  text-indent: 10px;
  margin-bottom: 10px;
  padding-bottom: 5px;
}
.el-main{
  width: 100%;
  height: 100%;
  overflow: hidden;

}
.el-container{
  height: 100%;
}
.el-menu-item{
  background: #0b1b36 !important
}
</style>
