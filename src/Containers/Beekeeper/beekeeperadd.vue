<template>
    <el-dialog title="蜂箱添加" :visible.sync="dialogFormVisible">
                        <el-form :model="beekeeper" :ref="beekeeper">
                               <el-form-item label="蜂农ID" :label-width="formLabelWidth">
                                    <el-input v-model="beekeeper.beekeeperID"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="出厂批次" :label-width="formLabelWidth">
                                    <el-input v-model="hive.batch"></el-input>
                                </el-form-item>
                                <el-form-item label="生产日期" :label-width="formLabelWidth">
                                    <el-input v-model="hive.productDate"></el-input>
                                </el-form-item>
                                <el-form-item label="产商" :label-width="formLabelWidth">
                                    <el-input v-model="hive.manufacturer"></el-input>
                                </el-form-item>
                                <el-form-item label="状态" :label-width="formLabelWidth">
                                    <el-input v-model="hive.status"></el-input>
                                </el-form-item>
                                <el-form-item label="所属蜂农ID" :label-width="formLabelWidth">
                                    <el-input v-model="hive.beekeeperID"></el-input>
                                </el-form-item>
                                <el-form-item label="电话" :label-width="formLabelWidth">
                                    <el-input v-model="hive.tel"></el-input>
                                </el-form-item>
                                <el-form-item label="验证码" :label-width="formLabelWidth">
                                    <el-input v-model="hive.verifyCode"></el-input>
                                </el-form-item> -->
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                            </div>
                        </el-dialog>
</template>
<script>
export default {
	data() {
		return {
			beekeeper: {
				beekeeperID: 1,
			},
			dialogFormVisible: false,
		};
	},
};
</script>
<style scoped>
</style>


