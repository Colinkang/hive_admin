<template>
  <div id="app">
    <root></root>
  </div>
</template>

<script>
import Root from './components/root.vue';
export default {
	name: 'app',
	components: {
		Root,
	},
	mounted() {
		// this.$router.push({
		//   path:'/beebox'
		// })
	},
};
</script>

<style>
html,
body {
	min-width: 1280px;
	margin: 0;
	padding: 0;
	/* height: 100%;
	overflow: hidden; */
}
input {
	padding: 0;
	margin: 0;
	border: 0;
}
.el-main {
	margin: 0;
	padding: 0 !important;
	background-color: #3f3b3a;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	height: 100%;
}
.el-radio+.el-radio{
  margin-left: 0!important;
}
</style>
