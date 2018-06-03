<template>
<div class="nav">
  <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#404040" text-color="rgba(105, 105, 106)" active-text-color="rgb(105, 105, 106)" :collapse="collapse" :router="true">
     <el-menu-item index="1" route="/hive">
        <i class="el-icon-menu"></i>
        <span slot="title"> 蜂箱</span>
      </el-menu-item>
     <el-menu-item index="2" route="/beekeeper">
        <i class="el-icon-menu"></i>
        <span slot="title"> 蜂农</span>
      </el-menu-item>
      <el-menu-item index="3" route="/organization">
        <i class="el-icon-document"></i>
        <span slot="title"> 组织</span>
      </el-menu-item>
      <el-menu-item index="4" route="/event">
        <i class="el-icon-setting"></i>
        <span slot="title"> 事件</span>
      </el-menu-item>
      <el-menu-item index="5" route="/ai">
        <i class="el-icon-setting"></i>
        <span slot="title"> AI</span>
      </el-menu-item>
      <el-menu-item index="6" route="/uav">
        <i class="el-icon-setting"></i>
        <span slot="title">无人机</span>
      </el-menu-item>
      <el-menu-item index="7" route="/management">
        <i class="el-icon-setting"></i>
        <span slot="title"> 管理</span>
      </el-menu-item>
  </el-menu>
</div>
</template>
<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
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
  }
};
</script>
<style lang="" scoped>
.nav {
  background-color:rgb(26,26,26);
  z-index: 1111;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 900px;
}

.el-submenu {
  text-align: left;
}

.el-menu-item {
  text-align: left;
}

.iconfont {
  font-size: 14px;
  color: rgb(105,105,106);
}
</style>
