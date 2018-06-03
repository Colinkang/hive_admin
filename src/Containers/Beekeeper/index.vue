<template>
  <div class="beekeeper-total">
     <div class="beekeeper-top">
          <div class="beekeeper-add">添加</div>
          <div class="beekeeper-search">搜索</div>
     </div>
     <div class="beekeeper-list-header">
          <el-col :span="5">蜂箱ID</el-col>
          <el-col :span="3">温度</el-col>
          <el-col :span="3">湿度</el-col>
          <el-col :span="3">重量</el-col>
          <el-col :span="3">压强</el-col>
          <el-col :span="3">电量</el-col>
          <el-col :span="3">状态</el-col>
     </div>
     <div class="beekeeper-lsit-row">

     </div>
  </div>
</template>
<script>
// import beekeeperadd from './beekeeperadd.vue';
export default {
	data() {
		return {};
	},
	methods: {
		delete1() {
			let _this = this;
			let result = post('/', {});
			result.then(res => {});
		},
	},
};
</script>
<style scoped>
.beekeeper-total {
	width: 100%;
	height: 100%;
}
.beekeeper-top {
	width: 100%;
	height: 20%;
}
.beekeeper-list-header {
	width: 100%;
	height: 30%;
}
.beekeeper-lsit-row {
}
</style>


