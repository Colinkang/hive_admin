<template>
  <div id="app">
    <root></root>
  </div>
</template>

<script>
import Root from './components/root.vue';
export default {
	name: 'App',
	components: {
		Root,
	},
};
</script>

<style>
body,
html {
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100%;
	width: 100%;
	position: relative;
}

.el-container {
	position: relative;
	width: 100%;
	height: 100%;
}

.el-header {
	background-color: rgb(37, 37, 37);
	color: white;
	text-align: center;
	line-height: 60px;
}

.el-aside {
	background-color: rgb(84, 92, 100);
	color: #333;
	text-align: center;
}

.el-main {
	background-color: white;
	color: #333;
  padding: 0 !important;
}
.el-menu{
  border-right: none;
}
</style>
