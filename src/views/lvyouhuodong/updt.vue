<template>
    <div class="lvyouhuodong-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix updt">
                <el-page-header @back="$router.go(-1)" content="编辑旅游活动"> </el-page-header>
            </div>
            <div class="form-database-form">
                <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                    <el-form-item label="编号" prop="bianhao" :rules="[{required:true, message:'请填写编号'}]">
                        <el-input type="text" placeholder="输入编号" style="width: 250px" v-model="form.bianhao" />
                    </el-form-item>

                    <el-form-item label="标题" prop="biaoti" required :rules="[{required:true, message:'请填写标题'}]">
                        <el-input type="text" placeholder="输入标题" style="width: 450px" v-model="form.biaoti" />
                    </el-form-item>

                    <el-form-item label="类型" prop="leixing">
                        <el-select v-model="form.leixing"
                            ><el-option label="自行景点" value="自行景点"></el-option>
                            <el-option label="旅游线路" value="旅游线路"></el-option>
                            <el-option label="文化活动" value="文化活动"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="图片" prop="tupian" required :rules="[{required:true, message:'请填写图片'}]">
                        <e-upload-image v-model="form.tupian"></e-upload-image>
                    </el-form-item>

                    <el-form-item
                        label="活动价格"
                        prop="huodongjiage"
                        required
                        :rules="[{required:true, message:'请填写活动价格'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入活动价格" style="width: 250px" v-model.number="form.huodongjiage" />
                    </el-form-item>

                    <el-form-item label="开始时间" prop="kaishishijian" required :rules="[{required:true, message:'请填写开始时间'}]">
                        <el-date-picker v-model="form.kaishishijian" type="datetime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束时间" prop="jieshushijian" required :rules="[{required:true, message:'请填写结束时间'}]">
                        <el-date-picker v-model="form.jieshushijian" type="datetime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="活动详情" prop="huodongxiangqing"> <e-editor v-model="form.huodongxiangqing"></e-editor> </el-form-item>

                    <el-form-item label="活动状态" prop="huodongzhuangtai">
                        <el-select v-model="form.huodongzhuangtai"
                            ><el-option label="进行中" value="进行中"></el-option>
                            <el-option label="已结束" value="已结束"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="btnText">
                        <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
    .lvyouhuodong-add {
    }
</style>
<script>
    import api from "@/api";
    import rule from "@/utils/rule";
    import { extend } from "@/utils/extend";

    export default {
        name: "lvyouhuodong-add",
        data() {
            return {
                rule,
                loading: false,
                form: {
                    bianhao: rule.getID(),
                    biaoti: "",
                    leixing: "",
                    tupian: "",
                    huodongjiage: "",
                    kaishishijian: "",
                    jieshushijian: "",
                    huodongxiangqing: "",
                    huodongzhuangtai: "",
                },
            };
        },
        watch: {
            id: {
                handler() {
                    this.loadInfo();
                },
            },
        },
        props: {
            isRead: {
                type: Boolean,
                default: true,
            },
            btnText: {
                type: String,
                default: "提交",
            },
            id: {
                type: [String, Number],
                required: true,
            },
        },

        computed: {},
        methods: {
            submit() {
                this.$refs.formModel
                    .validate()
                    .then((res) => {
                        if (this.loading) return;
                        this.loading = true;
                        var form = this.form;

                        this.$post(api.lvyouhuodong.update, form)
                            .then((res) => {
                                this.loading = false;
                                if (res.code == api.code.OK) {
                                    this.$message.success("添加成功");
                                    this.$emit("success", res.data);
                                    this.$refs.formModel.resetFields();
                                    this.loadInfo();
                                } else {
                                    this.$message.error(res.msg);
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                                this.$message.error(err.message);
                            });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            },
            loadInfo() {
                // 更新数据,获取数据
                this.loading = true;
                var form = this.form;
                this.$post(api.lvyouhuodong.edit, {
                    id: this.id,
                })
                    .then((res) => {
                        this.loading = false;
                        if (res.code == api.code.OK) {
                            extend(this, res.data);
                            this.form = res.data.mmm;
                        } else {
                            this.$message.error(res.msg);
                            this.$router.go(-1);
                        }
                    })
                    .catch((err) => {
                        this.$message.error(err.message);
                        this.$router.go(-1);
                    });
            },
        },
        created() {
            this.loadInfo();
        },
        mounted() {},
        destroyed() {},
    };
</script>
