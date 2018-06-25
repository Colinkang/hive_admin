<template>
<div class="nav">
  <el-menu :default-active="index" class="el-menu-vertical-demo" @select="select" @open="handleOpen" @close="handleClose"  text-color="rgba(105, 105, 106)" active-text-color="rgb(105, 105, 106)" :collapse="collapse" :router="true">
    <el-menu-item  index="0" route="/beebox" v-show="right.indexOf('4')>-1||right.indexOf('9')>-1" >
      <span class="nav-text" :style="{'background':index==0?selectColors[index]:''}">
        <i class="iconfont icon-boxxiangzi"></i>
        <span slot="title">蜂箱</span>
      </span>
    </el-menu-item>
    <el-menu-item index="1" route="/beefarmer" v-show="right.indexOf('3')>-1||right.indexOf('8')>-1" >
      <span class="nav-text" :style="{'background':index==1?selectColors[index]:''}">
        <i class="iconfont icon-wo"></i>
        <span slot="title">蜂农</span>
      </span>
    </el-menu-item>
    <el-menu-item index="2" route="/organization" v-show="right.indexOf('2')>-1||right.indexOf('7')>-1" >
      <span class="nav-text" :style="{'background':index==2?selectColors[index]:''}">
        <i class="iconfont icon-renshu"></i>
        <span slot="title">组织</span>
      </span>
    </el-menu-item>
    <el-menu-item index="3" route="/event"  v-show="right.indexOf('5')>-1||right.indexOf('10')>-1" >
      <span class="nav-text" :style="{'background':index==3?selectColors[index]:''}">
        <i class="iconfont icon-event"></i>
        <span slot="title">事件</span>
      </span>
    </el-menu-item>
    <el-menu-item index="4" route="/ai" >
      <span class="nav-text" :style="{'background':index==4?selectColors[index]:''}">
        <i class="iconfont icon-rengongzhineng"></i>
        <span slot="title">AI</span>
      </span>
    </el-menu-item>
    <el-menu-item index="5" route="/dron" >
      <span class="nav-text" :style="{'background':index==5?selectColors[index]:''}">
        <i class="iconfont icon-UAV"></i>
        <span slot="title">无人机</span>
      </span>
    </el-menu-item>
    <el-menu-item index="6" route="/control" v-if="right.indexOf('1')>-1||right.indexOf('6')>-1" >
      <span class="nav-text" :style="{'background':index==6?selectColors[index]:''}">
        <i class="iconfont icon-guanli2"></i>
        <span slot="title">管理</span>
      </span>
    </el-menu-item>

  </el-menu>
</div>
</template>
<script>
import { HIVE_ADMIN_RIGHTS ,HIVE_NAV_INDEX} from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
import bus from '../../common/event';
export default {
	props: {
		collapse: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		right: [],
    	index:'0',
      selectColors:[
        '#769e21!important',
        "#cb7e00!important",
        '#42567f!important',
        '#bc0046!important',
        '#007eb5!important',
        '#796a55!important',
        '#7e308d!important'
      ]
	}),
	methods: {
		toRoutePage(route) {
			console.log(route);
			this.$router.push({
				path: route,
			});
		},
		handleOpen(key, keyPath) {
            console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			//console.log(key, keyPath);
		},
	    select(e){
	      this.index=e
	      LocalStore.setItem(HIVE_NAV_INDEX,e)
	    }
	},
	mounted() {
		bus.$on("activeIndex",(data)=>{
			debugger
			this.activeIndex = data
			console.log("data"+data);
		});
		//do something after mounting vue instance
		let adminRight = LocalStore.getItem(HIVE_ADMIN_RIGHTS);
		this.right = adminRight.split(',');
	    let index  = LocalStore.getItem(HIVE_NAV_INDEX)
	    this.index = index
	}
};
</script>
<style lang="" scoped>
.nav {
	background-color: #0b1b36;
	z-index: 1111;
}

.el-menu-item{
  padding:0!important;
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
  background: none;
}

.iconfont {
	font-size: 14px;
}

.el-menu-item {
	height: 50px;
	line-height: 50px;
}
.is-active-0::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background: #769e21;
	left: 0;
}
.is-active-1::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background: #cb7e00;
	left: 0;
}
.is-active-2::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background: #42567f;
	left: 0;
}
.is-active-3::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background: #bc0046;
	left: 0;
}
.is-active-4::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background: #007eb5;
	left: 0;
}
.is-active-5::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background: #796a55;
	left: 0;
}
.is-active-6::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background: #7e308d;
	left: 0;
}

.is-active .nav-text {
	position: absolute;
	z-index: 111;
	color: white;
}

.nav-text {
	color: white;
  display: inline-block;
  width: 100%;
  height: 100%;
  text-indent: 20px;
}
/* .nnnnnn{
  background: #aaa !important;
} */
</style>
