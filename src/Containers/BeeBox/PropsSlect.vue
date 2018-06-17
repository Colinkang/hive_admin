<template>
<div class="form-row">
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
        <span style="margin-right:5px"><input type="text" name="" value="" style="width:60px" placeholder="起始维度" v-model="input1"></span>--
        <span><input type="text" name="" value="" style="width:60px" placeholder="终止纬度" v-model="input2"></span>
      </div>

    </div>
  </div>
  <div class="form-row">
    <div class="sure-btn" @click="sure">
      确认
    </div>
  </div>
  <div class="form-row">
    <div class="tiaojian">
      <div class="">
        已有条件
      </div>

    </div>
    <div class="canshu" style="text-align:right">
      <span class="hover" style="margin-right:20px" @click="add"><i class="iconfont icon-add"></i>
      添加
      </span>
      <span class="hover"> <i class="iconfont icon-069delete"></i>
      删除
      </span>
    </div>
  </div>
  <div class="form-row">
      <div class="condition-box">
        <div  v-for="(item,index) in condition" @click="slectThisCondition(index)" :class="`condition-row ${conditionIndex === index?'selected':''}`">
            <div class="">
                {{item.name}}:{{item.text}}
            </div>
            <div class="">
              <ul>
                <li v-for="item1 in item.children">  {{item1.name}}:{{item1.text}}</li>
              </ul>
            </div>
        </div>
      </div>
  </div>
</div>
</template>
<script>
import _ from 'lodash'
const config = {
  'id': 'id',
  "beeFarmerName": '蜂农姓名',
  'beeFarmerId': '蜂农ID',
  'manufacturer': '制造商',
  'batchNo': '批次',
  'productionDate': '生产日期',
  'position': '地理位置'
}
export default {
  name: "",
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
    conditionIndex: ''
  }),
  methods: {
    selectProps(e) {
      let value = e.target.value
      this.slectType = value
    },
    sure() {
      let slectType = this.slectType
      console.log(slectType)
      switch (slectType) {
        case ('id'):
          if (!this.input1 || !this.input2) {
            alert('请输入查询id的范围')
          } else {
            this.createcondition('id', [this.input1, this.input2])
          }
          break;
        case ('beeFarmerName'):
          if (!this.input1) {
            alert('请输入要查询的蜂农名字')
          } else {
            this.createcondition('beeFarmerName', [this.input1])
          }
          break;
        case ('beeFarmerId'):
          if (!this.input1) {
            alert('请输入要查询的蜂农Id')
          } else {
            this.createcondition('beeFarmerId', [this.input1])
          }
          break;
        case ('manufacturer'):
          if (!this.input1) {
            alert('请输入要查询的制造商')
          } else {
            this.createcondition('manufacturer', [this.input1])
          }
          break;
        case ('batchNo'):
          if (!this.input1) {
            alert('请输入要查询的批次范围')
          } else {
            this.createcondition('batchNo', [this.input1, this.input2])
          }
          break;
        case ('productionDate'):
          if (!this.date) {
            alert('请输入要查询的生产日期')
          } else {
            this.createcondition('productionDate', this.date)
          }
          break;
        case ('position'):
          if (!this.input1 && !this.input2 && !this.input3 && !this.input4) {
            alert('请输入要查询经纬度范围')
          } else {
            this.createcondition('position', [this.input1, this.input2, this.input3, this.input4])
          }
          break;
      }
      // this.input1="";
      // this.input2="";
      // this.input3="";
      // this.input4="";
    },
    createcondition(slectType, valueArr) {

      let condition = {}

      switch (slectType) {
        case ('id'):
          condition = {
            name: "ID",
            text: `从${valueArr[0]}至${valueArr[1]}`,
            type: 'id',
            value: valueArr,
            children:[]
          }
          break;
        case ('beeFarmerName'):
          condition = {
            name: "蜂农名称",
            text: valueArr[0],
            type: 'beeFarmerName',
            value: valueArr,
            children:[]
          }
          break;
        case ('beeFarmerId'):
          condition = {
            name: "蜂农ID",
            text: valueArr[0],
            type: 'beeFarmerId',
            value: valueArr,
            children:[]
          }
          break;
        case ('manufacturer'):
          condition = {
            name: "制造商",
            text: valueArr[0],
            type: 'manufacturer',
            value: valueArr,
            children:[]
          }
          break;
        case ('batchNo'):
          condition = {
            name: "批次范围",
            text: `从${valueArr[0]}至${valueArr[1]}`,
            type: 'batchNo',
            value: valueArr,
            children:[]
          }
          break;
        case ('productionDate'):
          condition = {
            name: "生产日期",
            text: this.date,
            type: 'batchNo',
            value: [this.date],
            children:[]
          }
          break;
        case ('position'):
          condition = {
            name: "地理位置",
            text: `【${valueArr[0]},${valueArr[2]}】,【${valueArr[1]},${valueArr[3]}】`,
            type: 'batchNo',
            value: [this.date],
            children:[]
          }
          break;
      }
      let conditionArr = _.cloneDeep(this.condition)

      if (this.conditionIndex==="") {
        conditionArr.push(condition)
      } else {
        conditionArr[this.conditionIndex].children.push(condition)
      }
      this.condition=conditionArr
      this.conditionIndex=""
      this.input1="";
      this.input2="";
      this.input3="";
      this.input4="";
      console.log(conditionArr)

    },
    slectThisCondition(index){
      this.conditionIndex = index
    },
    inputChange(e, key) {
      //let value = e.target.value
      console.log(key)
    },
    add(){

    }

  }
}
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
.condition-box{
  width: 100%;
  height: 165px;
  background: white;
  color:black;
  overflow: scroll;
}
.condition-row:hover{
  background: rgb(107, 152, 171);
  cursor: pointer;
}
.selected{
  background: rgb(107, 152, 171)
}
.hover:hover{
  color: rgb(31, 132, 170);
  cursor: pointer;
}
</style>
