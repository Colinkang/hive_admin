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
import { HIVE_ADMIN_RIGHTS, HIVE_API_TOKEN } from '../common/localStorageKey';
import HHeader from '../components/header/index.vue';
import CContent from '../components/content/index';
import NNav from '../components/nav/index';
import FFooter from '../components/footer/index';
import LoginPage from './LoginPage/index.vue';
import { IS_LOGIN } from '../common/localStorageKey';
import LocalStore from '../common/localStore';
import { get } from '../common/post';
let timer;
export default {
	name: 'HelloWorld',
	components: {
		HHeader,
		NNav,
		CContent,
		FFooter,
		LoginPage,
	},
	data() {
		return {
			collapse: false,
			isLogin: false,
			right: '',
		};
	},
	methods: {
		loginSuccess() {
			this.isLogin = true;
			console.log(345, this.right);
			if (this.right.indexOf('4') > -1 || this.right.indexOf('9') > -1) {
				this.$router.push({
					path: '/beebox',
				});
			} else if (this.right.indexOf('3') > -1 || this.right.indexOf('8') > -1) {
				this.$router.push({
					path: '/beefarmer',
				});
			} else if (this.right.indexOf('2') > -1 || this.right.indexOf('7') > -1) {
				this.$router.push({
					path: '/organization',
				});
			} else if (this.right.indexOf('5') > -1 || this.right.indexOf('10') > -1) {
				this.$router.push({
					path: '/event',
				});
			} else if (this.right.indexOf('1') > -1 || this.right.indexOf('6') > -1) {
				this.$router.push({
					path: '/control',
				});
			} else {
				this.$router.push({
					path: '/ai',
				});
			}
		},
		logout() {
			this.isLogin = false;
			this.$router.push({
				path: '/',
			});
		},
		checkedLoginStill() {
			let result = get('/checkTokenExpiration', {});
			result.then(res => {
				if (res.data.responseCode === '000000') {
					console.log(res.data.responseCode);
					this.isLogin = true;
					timer = setTimeout(() => {
						this.checkedLoginStill();
					}, 5000);
				} else {
					this.isLogin = false;
					LocalStore.setItem(IS_LOGIN, false);
					LocalStore.setItem(HIVE_API_TOKEN, '');
					this.$router.push({
						path: '/',
					});
				}
			});
		},
	},
	mounted() {
		this.checkedLoginStill();
		let adminRight = LocalStore.getItem(HIVE_ADMIN_RIGHTS);
		console.log(111, adminRight);
		this.right = adminRight.split(',');
	},
	beforeDestroy() {
		//do something before destroying vue instance
		clearInterval(timer);
	},
};
</script>
<style >
.hello {
	width: 100%;
	height: 100%;
}

.el-header {
	padding: 0!important;
	background: rgb(55, 55, 55);
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
	border:none;
  border-right: none!important;
	background: #0b1b36 !important;
}
.login-page {
	width: 100%;
	height: 100%;
	top: 0;
	background: white;
	color: black;
}
.img-upload-row .el-upload__input {
	opacity: 0 !important;
	position: absolute;
}

.mianbao {
	position: relative;
	text-align: left;
	font-size: 20px;
	font-weight: bold;
	border-bottom: 1px solid #eee;
	text-indent: 10px;
	margin-bottom: 10px;
	padding-bottom: 5px;
}
.el-main {
	width: 100%;
	height: 100%;
  background: #162f46;
	overflow: hidden!important;
}
.el-container {
	height: 100%;
}
.el-menu-item {
	background: #0b1b36 !important;
}
</style>
