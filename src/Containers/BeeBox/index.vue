<template>
  <div class="outer-box">
    <div class="hive-top">
            <div class="hive-control-btn">
                
                <span><i class="iconfont icon-add"></i>
                  <el-button type="text" >添加</el-button>
                </span>
                <span><i class="iconfont icon-069delete"></i>
                  <el-button type="text" >删除</el-button>
                </span>
                <span><i class="iconfont icon-shuaxin1"></i>
                  <el-button type="text" >刷新</el-button>
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
    <div class="box">
      <div class="section-left">
        <table border="0">
          <tr>
            <th>封箱ID</th>
            <th>温度</th>
            <th>湿度</th>
            <th>重量</th>
            <th>压强</th>
            <th>状态</th>
            <th>电量</th>
          </tr>
          <tr v-for="(item) in hiveList" @click="slectThisRow(item.boxId)">
            <td>-</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
        </table>
      </div>
      <div class="section-right">
        <div class="section-right-top">
          <div class="section-right-top-left">
            <div class="overview">
              <div class="overview-chart">
                <div class="overview-chart-left">
                  <div class="overview-chart-left-row">
                    <div class="section-title">
                      总览
                    </div>
                    <div class="overview-row">
                      <div class="overview-row-left">
                        数量：111
                      </div>
                      <div class="overview-row-right">
                        正常
                      </div>
                    </div>
                    <div class="overview-row">
                      <div class="overview-row-left">
                        正在运行：111
                      </div>
                      <div class="overview-row-right">
                        异常
                      </div>
                    </div>
                    <div class="overview-row">
                      <div class="overview-row-left">
                        离线
                      </div>
                      <div class="overview-row-right">
                        策略维护
                      </div>
                    </div>
                  </div>
                </div>
                <div class="overview-chart-right">
                  这里显示饼图
                </div>
              </div>

            </div>
            <div class="detail-box">
              <div class="section-title">
                蜂箱信息
              </div>
              <div class="dtail-row">
                <div class="detail-col">
                  蜂箱ID:123
                </div>
                <div class="detail-col">
                  出厂批次: 111
                </div>
                <div class="detail-col">
                  厂商:111
                </div>
              </div>
              <div class="dtail-row">
                <div class="detail-col">
                  蜂箱定位:22
                </div>
                <div class="detail-col">
                  生产日期:111
                </div>
                <div class="detail-col">
                  状态:111
                </div>
              </div>
            </div>
            <div class="line-chart-box">
              这里显示曲线图
            </div>
          </div>
          <div class="section-right-top-right">
            这里显示地图
          </div>
        </div>
        <div class="section-right-bottom">
          <div class="section-right-bottom-left">
            <div class="form-title">
              编组
            </div>
            <div class="form-row">
              <span>名称</span>
              <input type="text" name="" value="" class="name-input">
            </div>
            <div class="form-row">
              <div class="tiaojian">
                <div class="">
                  条件
                </div>
                <select style="width:90%;">
                  <option value ="volvo">Volvo</option>
                  <option value ="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div class="canshu">
                <div class="">
                  参数
                </div>
                <input type="text" name="" value="" style="width:90%">
              </div>
            </div>
            <div class="form-row">
                <div class="sure-btn">
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
                <span style="margin-right:20px"><i class="iconfont icon-add"></i>添加</span>
                <span <i class="iconfont icon-069delete"></i>删除</span>

              </div>
            </div>
            <div class="form-row">
              <textarea name="name" rows="8" ></textarea>
            </div>
            <div class="form-row">
              筛选结果
            </div>
          </div>
          <div class="section-right-bottom-right">
            <div class="form-title">
              现有组
            </div>
            <div class="form-row group-table">
              <table border="0" style="border:none">
                <tr style="border:none;background:#40577f;color:white">
                  <th style="border:none;width:25%;color:white"><el-checkbox v-model="checked">名称<i class="iconfont icon-duibi" style="font-size:12px"></i></el-checkbox></th>
                  <th style="border:none;width:25%;color:white">蜂箱数量<i class="iconfont icon-duibi" style="font-size:12px"></i></th>
                  <th style="border:none;width:50%;color:white">备注</th>
                </tr>
                <tr >
                  <td style="width:25%;">-</td>
                  <td style="width:25%;">1</td>
                  <td style="width:50%;">2</td>
                </tr>
                <tr >
                  <td style="width:25%;">-</td>
                  <td style="width:25%;">1</td>
                  <td style="width:50%;">2</td>
                </tr>
                <tr >
                  <td style="width:25%;">-</td>
                  <td style="width:25%;">1</td>
                  <td style="width:50%;">2</td>
                </tr>
                <tr >
                  <td style="width:25%;">-</td>
                  <td style="width:25%;">1</td>
                  <td style="width:50%;">2</td>
                </tr>
              </table>
            </div>
            <div class="form-row">
              <span>共（2）</span>
              <span class="icon-span"><i class="iconfont icon-shuaxin1">删除</i> </span>
              <span class="icon-span"><i class="iconfont icon-shuaxin1">刷新</i> </span>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      hiveList: [1, 2, 3, 4, 5, 6, 7, 8, 8, 98, 7, 6, 5, 1, 3, 4, 5, 5],
      checked:true,
      search:""
    };
  },
  created: function() {

  },

  methods: {
    slectThisRow(id) {
      //  this.idChange(id)
    },

  },
};
</script>

<style scoped>
.outer-box{
  width: 100%;
}
.box {
  position: relative;
  width: 100%;

  display: flex;
}

.hive-top {
	width: 100%;
	height: 50px;
	background-color: #162f46;
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
.el-button--text{
  color:white;
}
.hive-control-btn span {
	margin-left: 10px;
}

.hive-control-btn span:hover,.el-button--text:hover {
	cursor: pointer;
	color: rgb(0, 138, 207);
}

.hive-top-input {
	position: absolute;
	height: 50px;
	line-height: 40px;
	width: 200px;
	right: 15px;
	margin-top: 5px;
}

.section-left {
  position: relative;
  width: 30%;
  overflow: scroll;
  padding-bottom: 20px;
  background: white;
}

.section-right {
  width: 68%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;

}

.section-right-top {
  position: relative;
  width: 100%;
  height: 667px;
  display: flex;
}

.section-right-top-left {
  width: 43%;
  height: 100%;
}

.section-right-top-right {
  margin-left: 2%;
  width: 55%;
  height: 100%;
  background: #0b1b36;
}

.section-right-bottom {
  position: relative;
  width: 100%;
  height: 403px;
  margin-top: 20px;
  display: flex;
  background: #40577f;
}

table {
  border-collapse: collapse;
  width: 100%;
}

table tr:hover {
  cursor: pointer;
  background: #eee;
}

table,
th,
td {
  border: 1px solid #d3d7db;
  font-size: 14px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color:black;
}

table tr th {
  width: 14.28%;
}

.detail-box {
  position: relative;
  width: 100%;
  color: white;
  margin-top: 10px;
  padding-top: 5px;
  height: 85px;
  background: #0b1b36;
}

.section-title {
  width: 100%;
  text-align: left;
  text-indent: 20px;
  margin-top: 10px;
}

.dtail-row {
  width: 90%;
  margin-left: 20px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.detail-col {
  width: 33%;
  text-align: left;
}

.chart-box {
  position: relative;
  color: #daac52;
  height: 450px;
  border: 1px solid #746c5e;
  width: 100%;
  margin-top: 20px;
}

.overview {
  position: relative;
  width: 100%;
  color: #daac52;
  height: 270px;
  background: #0b1b36;
  display: flex;
}

.chart-line {
  width: 100%;
  margin-top: 30px;
  height: 330px;
}

.overview-chart {
  width: 100%;
  height: 100%;
  display: flex;
}

.id-select {
  width: 34%;
  height: 100%;
}

.overview-chart-left {
  width: 45%;
  height: 100%;
  font-size: 14px;
}

.overview-chart-right {
  width: 55%;
  height: 100%;
  background: white;
}

.overview-row {
  width: 100%;
  display: flex;
  margin-top: 30px;
}

.overview-row-left {
  width: 65%;
  text-align: left;
}

.overview-row-right {
  text-align: left;
  width: 35%;
}

.line-chart-box {
  margin-top: 10px;
  width: 100%;
  height: 290px;
  background: #0b1b36;

}

.section-right-bottom-left {
  width: 38%;
  height: 100%;
}

.section-right-bottom-right {
  width: 62%;
  height: 100%;
}

.form-title {
  margin-left: 5px;
  margin-top: 20px;
  text-align: left;
  color: white;
  font-size: 20px
}

.form-row {
  width: 96%;
  margin-left: 2%;
  margin-top: 10px;
  text-align: left;
  color: white;
  font-size: 14px;
}

.name-input {
  width: 80%;
}

.tiaojian,
.canshu {
  width: 49%;
  display: inline-block;
}
.sure-btn{
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #0b1b36;
  color: white;
}
textarea{
  width: 100%;
  height: 150px;
}
.group-table{
  height: 305px;
  background: #e8f0f9;
  overflow:scroll;
}
.icon-span{
  float: right;
  font-size: 12px;
  margin-right: 20px;
}
.icon-span i{
  font-size: 13px;
}
</style>
