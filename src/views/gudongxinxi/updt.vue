<template>
    <div class="gudongxinxi-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix updt">
                <el-page-header @back="$router.go(-1)" content="编辑古董信息"> </el-page-header>
            </div>
            <div class="form-database-form">
                <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                    <el-form-item label="古董编号" prop="gudongbianhao" :rules="[{required:true, message:'请填写古董编号'}]">
                        <el-input type="text" placeholder="输入古董编号" style="width: 250px" v-model="form.gudongbianhao" />
                    </el-form-item>

                    <el-form-item label="古董名称" prop="gudongmingcheng" required :rules="[{required:true, message:'请填写古董名称'}]">
                        <el-input type="text" placeholder="输入古董名称" style="width: 450px" v-model="form.gudongmingcheng" />
                    </el-form-item>

                    <el-form-item label="古董分类" prop="gudongfenlei" required :rules="[{required:true, message:'请填写古董分类'}]">
                        <el-select v-model="form.gudongfenlei"
                            ><e-select-option type="option" module="gudongfenlei" value="id" label="fenleimingcheng"></e-select-option
                        ></el-select>
                    </el-form-item>

                    <el-form-item label="古董图片" prop="gudongtupian" required :rules="[{required:true, message:'请填写古董图片'}]">
                        <e-upload-images v-model="form.gudongtupian"></e-upload-images>
                    </el-form-item>

                    <el-form-item label="古董视频" prop="gudongshipin" required :rules="[{required:true, message:'请填写古董视频'}]">
                        <e-upload-file v-model="form.gudongshipin"></e-upload-file>
                    </el-form-item>

                    <el-form-item label="年代" prop="niandai" required :rules="[{required:true, message:'请填写年代'}]">
                        <el-input type="text" placeholder="输入年代" style="width: 250px" v-model="form.niandai" />
                    </el-form-item>

                    <el-form-item label="古董级别" prop="gudongjibie" required :rules="[{required:true, message:'请填写古董级别'}]">
                        <el-select v-model="form.gudongjibie"
                            ><el-option label="一级" value="一级"></el-option>
                            <el-option label="二级" value="二级"></el-option>
                            <el-option label="三级" value="三级"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="尺寸" prop="chicun" required :rules="[{required:true, message:'请填写尺寸'}]">
                        <el-input type="text" placeholder="输入尺寸" style="width: 250px" v-model="form.chicun" />
                    </el-form-item>

                    <el-form-item label="历史文化" prop="lishiwenhua" required :rules="[{required:true, message:'请填写历史文化'}]">
                        <el-input type="textarea" v-model="form.lishiwenhua"></el-input>
                    </el-form-item>

                    <el-form-item label="古董概述" prop="gudonggaishu"> <e-editor v-model="form.gudonggaishu"></e-editor> </el-form-item>

                    <el-form-item v-if="btnText">
                        <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
    .gudongxinxi-add {
    }
</style>
<script>
    import api from "@/api";
    import rule from "@/utils/rule";
    import { extend } from "@/utils/extend";

    export default {
        name: "gudongxinxi-add",
        data() {
            return {
                rule,
                loading: false,
                form: {
                    gudongbianhao: rule.getID(),
                    gudongmingcheng: "",
                    gudongfenlei: "",
                    gudongtupian: "",
                    gudongshipin: "",
                    niandai: "",
                    gudongjibie: "",
                    chicun: "",
                    lishiwenhua: "",
                    gudonggaishu: "",
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

                        this.$post(api.gudongxinxi.update, form)
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
                this.$post(api.gudongxinxi.edit, {
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
