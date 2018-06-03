<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
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
</template>

<script>
export default {
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
