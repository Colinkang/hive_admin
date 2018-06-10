<template>
<div class="nav">
  <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#404040" text-color="rgba(105, 105, 106)" a ctive-text-color="rgb(105, 105, 106)" :collapse="collapse" :router="true">
    <el-menu-item index="0" route="/beebox" v-if="right.indexOf('1')>-1">
      <span class="nav-text">
        <i class="iconfont icon-boxxiangzi"></i>
        <span slot="title">蜂箱</span>
      </span>
    </el-menu-item>
    <el-menu-item index="1" route="/beefarmer" v-if="right.indexOf('2')>-1">
      <span class="nav-text">
        <i class="iconfont icon-wo"></i>
        <span slot="title">蜂农</span>
      </span>
    </el-menu-item>
    <el-menu-item index="2" route="/organization">
      <span class="nav-text">
        <i class="iconfont icon-renshu"></i>
        <span slot="title">组织</span>
      </span>
    </el-menu-item>
    <el-menu-item index="3" route="/event">
      <span class="nav-text">
        <i class="iconfont icon-event"></i>
        <span slot="title">事件</span>
      </span>
    </el-menu-item>
    <el-menu-item index="4" route="/ai">
      <span class="nav-text">
        <i class="iconfont icon-rengongzhineng"></i>
        <span slot="title">AI</span>
      </span>
    </el-menu-item>
    <el-menu-item index="5" route="/dron">
      <span class="nav-text">
        <i class="iconfont icon-UAV"></i>
        <span slot="title">无人机</span>
      </span>
    </el-menu-item>
    <el-menu-item index="6" route="/control">
      <span class="nav-text">
        <i class="iconfont icon-guanli2"></i>
        <span slot="title">管理</span>
      </span>
    </el-menu-item>

  </el-menu>
</div>
</template>
<script>
import { HIVE_ADMIN_RIGHTS} from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    right:[]
  }),
  methods: {
    toRoutePage(route) {
      this.$router.push({
        path: route
      });
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  },
  mounted() {
    //do something after mounting vue instance
    let adminRight = LocalStore.getItem(HIVE_ADMIN_RIGHTS)
    this.right=adminRight.split(',')

  }
};
</script>
<style lang="" scoped>
.nav {
  background-color: #0b1b36;
  z-index: 1111;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 900px;
  color: white;
}

.el-submenu {
  text-align: left;
}

.el-menu-item {
  text-align: left;
}

.iconfont {
  font-size: 14px;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
}
.is-active::after {

  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #769e21;
  left: 0;

}

.is-active .nav-text {
  position: absolute;
  z-index: 111;
  color: white;
}

.nav-text {
  color: white;
}
</style>
