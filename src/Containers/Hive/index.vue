<template>
    <div class="hive-total">
        <div class="hive-top">
            <div class="hive-control-btn">
                <hiveadd ref="hive"></hiveadd>
                <span><i class="iconfont icon-add"></i>
                  <el-button type="text" @click="hiveShow">添加</el-button>
                </span>
                <span><i class="iconfont icon-069delete"></i>
                  <el-button type="text" @click="delete1">删除</el-button>
                </span>
                <span><i class="iconfont icon-shuaxin1"></i>
                  <el-button type="text" @click="delete1">刷新</el-button>
                </span>
            </div>
            <div class="hive-top-input">
                <el-input size="mini" placeholder="请输入查询内容" 
                v-model="search" 
                clearable
                prefix-icon="el-icon-search"
                ></el-input>   
            </div>
        </div>
        <div class="hive-content">
          <div class="hive-left">    
            <div class="hive-list">
                <el-row class="hive-list-header">
                    <el-col :span="4">蜂箱ID</el-col>
                    <el-col :span="3">温度</el-col>
                    <el-col :span="3">湿度</el-col>
                    <el-col :span="3">重量</el-col>
                    <el-col :span="3">压强</el-col>
                    <el-col :span="3">电量</el-col>
                    <el-col :span="3">状态</el-col>
                </el-row>
                <el-row class="hive-list-row" v-for="item in hiveList" :key="item.id">
                    <el-col :span="3">{{item.username?item.username:'-'}}</el-col>
                    <el-col :span="6">{{item.tel?item.tel:'-'}}</el-col>
                    <el-col :span="6">{{item.referral?item.referral:'-'}}</el-col>
                    <el-col :span="6">{{item.status?item.status:'-'}}</el-col>
                </el-row>
            </div>
          </div>
          <div class="hive-right">
            <div class="hive-overview-pie-info-foldline-map">
                <div class="hive-overview-pie-info-foldline">
                    <div class="hive-overview-pie">
                        <div class="hive-overview">
                            <el-row>
                                <el-col>总览</el-col>
                            </el-row>
                            <el-row>
                                <!-- <el-col :span="8">总量</el-col>
                                <el-col :span="4"></el-col> -->
                                <el-col :span="3">正常</el-col>
                                <el-col :span="3">{{online}}</el-col>
                            </el-row>
                            <el-row>
                                <!-- <el-col :span="8">正在运行</el-col>
                                <el-col :span="4"></el-col> -->
                                <el-col :span="3">异常</el-col>
                                <el-col :span="3">{{exception}}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">离线</el-col>
                                <el-col :span="3">{{offline}}</el-col>
                                <!-- <el-col :span="8">策略保护</el-col>
                                <el-col :span="4"></el-col> -->
                            </el-row>
                        </div>
                        <div class="hive-pie">
                            <echartspie></echartspie>
                        </div>
                    </div>
                    <div class="hive-info">
                         <el-row>
                                <el-col :span="6">蜂箱信息</el-col>
                                <el-col :span="6"></el-col>
                              
                            </el-row>
                             <el-row>
                                <el-col :span="6">出厂批次</el-col>
                                <el-col :span="6"></el-col>
                                <el-col :span="8">产商</el-col>
                                <el-col :span="4"></el-col>
                            </el-row>
                             <el-row>
                                <el-col :span="6">生产日期</el-col>
                                <el-col :span="6"></el-col>
                                <el-col :span="8">状态</el-col>
                                <el-col :span="4"></el-col>
                            </el-row>
                    </div>
                    <div class="hive-foldline">
                        <fold></fold>
                    </div>
                </div>
                <div class="hive-map">
                    <map1></map1>
                </div>
            </div>
            <div class="hive-group">
                <div class="hive-group-add">
                    名称
               <el-input v-model="groupname"></el-input>
                 条件 
                 <el-input v-model="condition"></el-input>
                 参数 
                 <el-input v-model="params"></el-input>
                <el-button type="primary">主要按钮</el-button>
                 <div class="hive-condition-list">
                   
                <el-row class="hive-condition-list-header">
                    <el-col :span="8">蜂箱ID</el-col>
                    <el-col :span="8">温度</el-col>
                    <el-col :span="8">湿度</el-col>
                </el-row>
                <el-row class="hive-condition-list-row" v-for="item in hiveConditionList" :key="item.id">
                    <el-col :span="3">{{item.username?item.username:'-'}}</el-col>
                    <el-col :span="6">{{item.tel?item.tel:'-'}}</el-col>
                    <el-col :span="6">{{item.referral?item.referral:'-'}}</el-col>
                </el-row>
                </div>
                </div>
                <div class="hive-group-list">
                   
                <el-row class="hive-group-list-header">
                    <el-col :span="8">蜂箱ID</el-col>
                    <el-col :span="8">温度</el-col>
                    <el-col :span="8">湿度</el-col>
                </el-row>
                <el-row class="hive-group-list-row" v-for="item in hiveGroupList" :key="item.id">
                    <el-col :span="3">{{item.username?item.username:'-'}}</el-col>
                    <el-col :span="6">{{item.tel?item.tel:'-'}}</el-col>
                    <el-col :span="6">{{item.referral?item.referral:'-'}}</el-col>
                </el-row>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { post } from '../../common/post.js';
import echartspie from './echarts.vue';
import fold from './fold.vue';
import map1 from './map.vue';
import hiveadd from './hiveadd';
export default {
	components: {
		echartspie,
		fold,
		map1,
		hiveadd,
	},
	data() {
		return {
			hiveList: [],
			search: '',
			offline: 0,
			online: 0,
			exception: 0,
			groupname: '',
			condition: '',
			params: '',
			hiveGroupList: [],
            hiveConditionList:[]
		};
	},
	created: {},
	methods: {
		hiveShow() {
			this.$refs.hive.dialogShow();
		},
		getTableData() {
			let _this = this;
			let result = post('', {});
			result.then(res => {});
		},
		add() {
			let _this = this;
			let result = post('', {});
			result.then(res => {});
		},
		delete1() {
			let _this = this;
			let result = post('/', {});
			result.then(res => {});
		},
	},
};
</script>

<style scoped>
.hive-total {
	width: 100%;
	height: 100%;
}

.hive-left {
	width: 30%;
	height: 100%;
}
.hive-right {
	width: 70%;
	height: 100%;
}

.hive-content {
	width: 100%;
	height: 40%;
	display: flex;
}

.hive-list {
	width: 100%;
	height: 80%;
}

.hive-list-header {
	/* width: 100%;
	height: 10%; */
	border-bottom: 1px solid #ccc;
	background-color: white;
	margin-top: 0px;
	height: 30px;
	line-height: 30px;
}

.hive-list-row {
	height: 100px;
	line-height: 100px;
	border-bottom: 1px solid #ccc;
	font-size: 14px;
}

.hive-overview-pie-info-foldline-map {
	width: 100%;
	height: 600px;
	display: flex;
}
.hive-overview-pie-info-foldline {
	width: 50%;
	height: 600px;
}
.hive-map {
	width: 50%;
	height: 100%;
}
.hive-overview-pie {
	width: 100%;
	height: 300px;
	display: flex;
}
.hive-overview {
	width: 50%;
	height: 300px;
}
.hive-overview .el-row {
	text-align: left;
	font-size: 15px;
	height: 30px;
	line-height: 30px;
}

.hive-overview .el-col {
	text-indent: 20px;
	width: 50%;
}
.hive-pie {
	width: 50%;
	height: 248;
}

.hive-info {
	width: 100%;
	height: 100px;
}

.hive-foldline {
	width: 100%;
	height: 200px;
}

.hive-group {
	width: 100%;
	height: auto;
	display: flex;
}

.hive-group-add {
	width: 50%;
	height: 100%;
}

.hive-group-list {
	width: 50%;
	height: 100%;
}

.hive-top {
	width: 100%;
	height: 50px;
	background-color: blue;
	position: relative;
	color: white;
}
.hive-control-btn {
	position: absolute;
	left: 0;
	top: 0;
	height: 50px;
	line-height: 50px;
}

.hive-control-btn span {
	margin-left: 10px;
}

.hive-control-btn span:hover {
	cursor: pointer;
	color: red;
}

.hive-top-input {
	position: absolute;
	height: 50px;
	line-height: 40px;
	width: 200px;
	right: 15px;
	margin-top: 5px;
}
</style>