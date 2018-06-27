<template>
<div class="header">
  <img :src="require('./image/logo-content.png')" class="logo">

  <div class="user-control">
    <span>
       <router-link to="/admindetail"><i class="iconfont icon-user"></i>{{account}}</router-link>
    </span>
    <span>
        <router-link to="/updatepwd" >修改密码</router-link>
    </span>
    <span >
      <router-link to="/feedback" >意见反馈</router-link>
    </span>
    <span @click="logout">
      退出
    </span>


  </div>
</div>
</template>
<script>
import {
  HIVE_API_TOKEN,
  HIVE_USER_NAME,
  IS_LOGIN,
  HIVE_NAV_INDEX
} from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';

export default {
  name: '',
  data: () => ({
    collapse: false,
    account: '111',
  }),
  methods: {
    showAdminDetail() {
      this.$route.push({
        path: 'admindetail'
      })
    },
    changeCollapse() {
      this.collapse = !this.collapse;
      this.$emit('change-collapse', this.collapse);
    },
    logout() {
      LocalStore.setItem(HIVE_API_TOKEN, '');
      //	LocalStore.setItem(HIVE_USER_NAME, '');
      LocalStore.setItem(IS_LOGIN, '');
      setTimeout(() => {
        this.$emit('logout');
        LocalStore.setItem(HIVE_NAV_INDEX, '0')
      }, 200);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    //do something after mounting vue instance
    let username = LocalStore.getItem(HIVE_USER_NAME);
    this.account = username;
  },
};
</script>
<style  scoped>
.header {
  width: 100%;
  height: 100%;
  background-color: #231915;
}

.el-submenu__title,
.is-opened {
  color: white !important;
}

.el-menu-demo {}

.logo {
  height: 80%;
  top: 10%;
  left: 20px;
  position: relative;
  margin-left: 0;
  float: left;
}

.collapse-btn {
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 60px;
  line-height: 60px;
  color: white;
  cursor: pointer;
}

.collapse-btn:hover {
  color: #aaa;
}

.collapse-btn i {
  font-size: 25px;
}

.user-control {
  position: absolute;
  color: white;
  height: 60px;
  line-height: 60px;
  right: 0px;
  font-size: 14px;
}

.user-control span {
  margin-right: 20px;
}

.user-control span a {
  color: white;
  font-size: 14px;
  text-decoration: none;
}

.user-control span a:hover,
.user-control span:hover {
  color: #f8b62c;
  cursor: pointer;
}
</style>
