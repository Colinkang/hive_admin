<template>
    <el-dialog title="蜂箱添加" :visible.sync="dialogFormVisible">
        <el-form :model="hive" :ref="hive">
            <el-form-item label="蜂箱ID" :label-width="formLabelWidth">
                <el-input v-model="hive.hiveID"></el-input>
            </el-form-item>
            <el-form-item label="出厂批次" :label-width="formLabelWidth">
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
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogShow">确 定</el-button>
        </div>
        </el-dialog>
                  
</template>
<script>
import { post } from '../../common/post.js';
export default {
	props: ['dialogFormVisible'],
	data() {
		return {
			hive: {
				hiveID: '',
				batch: '',
				productDate: '',
				manufacturer: '',
				status: '',
				beekeeperID: '',
				tel: '',
				verifyCode: '',
			},
			formLabelWidth: '',
			dialogFormVisible: false,
		};
	},
	methods: {
		dialogShow() {
			this.dialogFormVisible = true;
            // this.$emit('hive', { dialogFormVisible: true });
            // post('/')
		},
	},
};
</script>

