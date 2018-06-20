<template>
<div class="form-row">
  <div class="form-row">
    <span>名称</span>
    <input type="text" v-model="groupName" class="name-input" style="width:180px">
  </div>
  <div class="tiaojian" style="vertical-align: top;">
    <div class="">
      条件
    </div>
    <select style="width:90%;" @change="selectProps">
        <option value ="id">ID</option>
        <option value ="beeFarmerName">蜂农姓名</option>
        <option value ="beeFarmerId">蜂农ID</option>
        <option value="manufacturer">制造商</option>
        <option value="batchNo">批次</option>
        <option value="productionDate">生产日期</option>
        <option value="position">地理位置</option>
      </select>
  </div>
  <div class="canshu">
    <div class="">
      参数({{ slectType==='id' ?'输入id范围' :slectType==='beeFarmerName' ?'输入蜂农姓名' :slectType==='beeFarmerId' ?'输入蜂农Id' :slectType==='manufacturer' ?'输入制造商名字' :slectType==='batchNo' ?'输入批次范围' :slectType==='date' ?'输入生产日期' :'输入地理位置范围' }})
    </div>
    <div class="" v-if="slectType==='id'||slectType==='batchNo'">
      <span style="margin-right:5px"><input type="text" name="" value="" style="width:60px" v-model="input1"></span>--
      <span><input type="text" name="" value="" style="width:60px" v-model="input2"></span>
    </div>
    <div class="" v-else-if="slectType==='beeFarmerName'||slectType==='beeFarmerId'||slectType==='manufacturer'">
      <span><input type="text" name="" value="" style="width:130px" v-model="input1"></span>
    </div>
    <div class="" v-else-if="slectType==='productionDate'">
      <span>
          <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width:130px">
        </el-date-picker>
        </span>
    </div>
    <div class="" v-else-if="slectType==='position'">
      <div class="">
        <span style="margin-right:5px"><input type="text" name="" value="" style="width:60px" placeholder="起始经度" v-model="input1"></span>--
        <span><input type="text" name="" value="" style="width:60px" placeholder="终止经度" v-model="input2"></span>
      </div>
      <div class="" style="margin-top:5px;">
        <span style="margin-right:5px"><input type="text" name="" value="" style="width:60px" placeholder="起始维度" v-model="input3"></span>--
        <span><input type="text" name="" value="" style="width:60px" placeholder="终止纬度" v-model="input4"></span>
      </div>

    </div>
  </div>
  <div class="form-row" style="display:flex">
    <div class="sure-btn" @click="sure">
      确认
    </div>
    <div class="sure-btn" @click="save" style="margin-left:20px">
      保存
    </div>
  </div>
  <div class="form-row">
    <div class="tiaojian">
      <div class="">
        已有条件
      </div>

    </div>
    <div class="canshu" style="text-align:right">
      <span class="hover" style="margin-right:20px" @click="search"><i class="iconfont icon-search"></i>
      查询
      </span>
      <span class="hover" @click="deleteById"> <i class="iconfont icon-069delete" ></i>
      删除
      </span>
    </div>
  </div>
  <div class="form-row">
    <div class="condition-box">
      <div v-for="(item,index) in condition" @click="slectThisCondition(index)" :class="`condition-row ${conditionIndex === index?'selected':''}`">
        <div class="">
          {{item.name}}:{{item.text}}
        </div>
        <div class="">
          <ul>
            <li v-for="item1 in item.children"> {{item1.name}}:{{item1.text}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import _ from 'lodash';
import { get, post } from '../../common/post.js';
import { HIVE_ADMIN_ID } from '../../common/localStorageKey';
import LocalStore from '../../common/localStore';
const config = {
	id: 'id',
	beeFarmerName: '蜂农姓名',
	beeFarmerId: '蜂农ID',
	manufacturer: '制造商',
	batchNo: '批次',
	productionDate: '生产日期',
	position: '地理位置',
};
let timer;
export default {
	name: '',
	data: () => ({
		selectClass: 'range',
		slectType: 'id',
		date: '',
		//最所四个输入框，如果只有一个全用input1
		input1: '',
		input2: '',
		input3: '',
		input4: '',
		//查询条件数组
		condition: [],
		conditionIndex: '',
		groupName: '',
	}),
	beforeDestroy(){
		clearInterval(timer)
	},
	methods: {
		selectProps(e) {
			let value = e.target.value;
			this.slectType = value;
		},
		sure() {
			let slectType = this.slectType;
			console.log(slectType);
			switch (slectType) {
				case 'id':
					if (!this.input1 || !this.input2) {
						alert('请输入查询id的范围');
					} else {
						this.createcondition('id', [this.input1, this.input2]);
					}
					break;
				case 'beeFarmerName':
					if (!this.input1) {
						alert('请输入要查询的蜂农名字');
					} else {
						this.createcondition('beeFarmerName', [this.input1]);
					}
					break;
				case 'beeFarmerId':
					if (!this.input1) {
						alert('请输入要查询的蜂农Id');
					} else {
						this.createcondition('beeFarmerId', [this.input1]);
					}
					break;
				case 'manufacturer':
					if (!this.input1) {
						alert('请输入要查询的制造商');
					} else {
						this.createcondition('manufacturer', [this.input1]);
					}
					break;
				case 'batchNo':
					if (!this.input1) {
						alert('请输入要查询的批次范围');
					} else {
						this.createcondition('batchNo', [this.input1, this.input2]);
					}
					break;
				case 'productionDate':
					if (!this.date) {
						alert('请输入要查询的生产日期');
					} else {
						this.createcondition('productionDate', this.date);
					}
					break;
				case 'position':
					if (!this.input1 && !this.input2 && !this.input3 && !this.input4) {
						alert('请输入要查询经纬度范围');
					} else {
						this.createcondition('position', [this.input1, this.input2, this.input3, this.input4]);
					}
					break;
			}
			// this.input1="";
			// this.input2="";
			// this.input3="";
			// this.input4="";
		},
		createcondition(slectType, valueArr) {
			let condition = {};

			switch (slectType) {
				case 'id':
					condition = {
						name: 'ID',
						text: `从${valueArr[0]}至${valueArr[1]}`,
						type: 'id',
						value: valueArr,
						children: [],
					};
					break;
				case 'beeFarmerName':
					condition = {
						name: '蜂农名称',
						text: valueArr[0],
						type: 'beeFarmerName',
						value: valueArr,
						children: [],
					};
					break;
				case 'beeFarmerId':
					condition = {
						name: '蜂农ID',
						text: valueArr[0],
						type: 'beeFarmerId',
						value: valueArr,
						children: [],
					};
					break;
				case 'manufacturer':
					condition = {
						name: '制造商',
						text: valueArr[0],
						type: 'manufacturer',
						value: valueArr,
						children: [],
					};
					break;
				case 'batchNo':
					condition = {
						name: '批次范围',
						text: `从${valueArr[0]}至${valueArr[1]}`,
						type: 'batchNo',
						value: valueArr,
						children: [],
					};
					break;
				case 'productionDate':
					condition = {
						name: '生产日期',
						text: this.date,
						type: 'productionDate',
						value: [this.date],
						children: [],
					};
					break;
				case 'position':
					condition = {
						name: '地理位置',
						text: `【${valueArr[0]},${valueArr[2]}】,【${valueArr[1]},${valueArr[3]}】`,
						type: 'position',
						value: [this.date],
						children: [],
					};
					break;
			}
			let conditionArr = _.cloneDeep(this.condition);

			if (this.conditionIndex === '') {
				conditionArr.push(condition);
			} else {
				conditionArr[this.conditionIndex].children.push(condition);
			}
			this.condition = conditionArr;
			this.conditionIndex = '';
			this.input1 = '';
			this.input2 = '';
			this.input3 = '';
			this.input4 = '';
			console.log(conditionArr);
		},
		slectThisCondition(index) {
			this.conditionIndex = index;
		},
		inputChange(e, key) {
			//let value = e.target.value
			console.log(key);
		},
		search(){

			this.add();
			this.$emit('emptyBeeBox');
		},
		add() {
			//console.log(123, this.condition);
			clearInterval(timer)
			let obj = {};
			let array = [];
			let condition = this.condition;
			//console.log(111111, condition);
			for (let con of condition) {
				console.log(98, con);
				obj = {};
				switch (con.type) {
					case 'beeFarmerId':
						{
							obj['beeFarmerId'] = con.value[0];
						}
						break;
					case 'beeFarmerName':
						{
							obj['beeFarmerName'] = con.value[0];
						}
						break;
					case 'manufacturer':
						{
							obj['manfaucturer'] = con.value[0];
						}
						break;
					case 'productionDate':
						{
							obj['productionDate'] = new Date(con.value[0]).getTime();
						}
						break;
					case 'id':
						{
							obj['maxBeeBoxNo'] = con.value[1];
							obj['minBeeBoxNo'] = con.value[0];
						}
						break;
					case 'batchNo':
						{
							obj['maxBatchNo'] = con.value[1];
							obj['minBatchNo'] = con.value[0];
						}
						break;
					case 'position':
						{
							obj['minLongitude'] = con.value[0];
							obj['maxLongitude'] = con.value[1];
							obj['minLatitude'] = con.value[2];
							obj['maxLatitude'] = con.value[3];
						}
						break;
				}
				if (con.children) {
					for (let child of con.children) {
						//console.log(999989, child);
						switch (child.type) {
							case 'beeFarmerId':
								{
									obj['beeFarmerId'] = child.value[0];
								}
								break;
							case 'beeFarmerName':
								{
									obj['beeFarmerName'] = child.value[0];
								}
								break;
							case 'manufacturer':
								{
									obj['manfaucturer'] = child.value[0];
								}
								break;
							case 'productionDate':
								{
									obj['productionDate'] = new Date(child.value[0]).getTime();
								}
								break;
							case 'id':
								{
									obj['maxBeeBoxNo'] = child.value[1];
									obj['minBeeBoxNo'] = child.value[0];
								}
								break;
							case 'batchNo':
								{
									obj['maxBatchNo'] = child.value[1];
									obj['minBatchNo'] = child.value[0];
								}
								break;
							case 'position':
								{
									obj['minLongitude'] = child.value[0];
									obj['maxLongitude'] = child.value[1];
									obj['minLatitude'] = child.value[2];
									obj['maxLatitude'] = child.value[3];
								}
								break;
						}
					}
				}

				array.push(obj);
			}
			//console.log(11121212, array);
			let result = post('/queryGroupBeeBox', {
				filterItems: array,
			});
			result.then(res => {
        timer = setTimeout(()=>{
          this.add()
        }, 10000);
				//console.log(456, res);
				let data = res.data.data;
				//console.log(1234, data);
				if (!data || data.length === 0) {
					this.$message({
						message: '没查询到相关数据',
						type: 'warning',
					});
					return;
				}

				this.ids = [];

				for (let d of data) {
					this.ids.push(d.beeBoxNo);
				}

				// 展示表格数据
				this.$emit('getList',res);
				//
			});
		},
		save() {
			console.log(this.ids);
			if (this.ids === undefined) {
				this.$message({
					message: '请先添加查询条件，才能进行编组',
					type: 'warning',
				});
				return;
			}
			if (this.ids.length === 0) {
				this.$message({
					message: '没有符合该条件的蜂箱，不能添加编组',
					type: 'warning',
				});
				return;
			}
			if (!this.groupName) {
				this.$message({
					message: '编组名称不能为空',
					type: 'warning',
				});
				return;
			}
			let result = post('/saveGroupBeeBox', {
				beeBoxGroup: {
					groupName: this.groupName,
					adminId: LocalStore.getItem(HIVE_ADMIN_ID),
				},
				beeBoxIds: this.ids,
			});
			result.then(res => {
			//	console.log(1123, res);
				if (res.data.responseCode === '000000') {
					this.$message({
						message: '保存编组成功',
						type: 'success',
					});
					this.$emit('getGroup');
				} else if (res.data.responseCode === '000100') {
					this.$message({
						message: '编组名称不能和已有名称相同',
						type: 'warning',
					});
				}
			});
		},
    clearTimer(){
      //alert(222)
      clearInterval(timer)
    },
		deleteById() {
			let index = this.conditionIndex;
			let conditionArr = this.condition;
			//  console.log(conditionArr)
			if (conditionArr.length > 0) {
				conditionArr.splice(index, 1);
				this.conditionIndex = '';
			}
			this.condition = conditionArr;
		},
	},
};
</script>
<style lang="" scoped>
.form-row {
	vertical-align: top;
}

.tiaojian,
.canshu {
	width: 49%;
	display: inline-block;
}

.sure-btn {
	width: 80px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	background: #0b1b36;
	color: white;
	margin-top: 20px;
}

.sure-btn:hover {
	background: #1a335e;
	cursor: pointer;
}

.condition-box {
	width: 100%;
	height: 165px;
	background: white;
	color: black;
	overflow: scroll;
}

.condition-row:hover {
	background: rgb(107, 152, 171);
	cursor: pointer;
}

.selected {
	background: rgb(107, 152, 171);
}

.hover:hover {
	color: rgb(31, 132, 170);
	cursor: pointer;
}
</style>
