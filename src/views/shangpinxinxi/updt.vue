<template>
    <div class="shangpinxinxi-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix updt">
                <el-page-header @back="$router.go(-1)" content="编辑商品信息"> </el-page-header>
            </div>
            <div class="form-database-form">
                <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                    <el-form-item label="商品编号" prop="shangpinbianhao" :rules="[{required:true, message:'请填写商品编号'}]">
                        <el-input type="text" placeholder="输入商品编号" style="width: 250px" v-model="form.shangpinbianhao" />
                    </el-form-item>

                    <el-form-item label="商品名称" prop="shangpinmingcheng" required :rules="[{required:true, message:'请填写商品名称'}]">
                        <el-input type="text" placeholder="输入商品名称" style="width: 450px" v-model="form.shangpinmingcheng" />
                    </el-form-item>

                    <el-form-item label="分类" prop="fenlei" required :rules="[{required:true, message:'请填写分类'}]">
                        <el-select v-model="form.fenlei"><e-select-option type="option" module="shangpinfenlei" value="id" label="fenleimingcheng"></e-select-option></el-select>
                    </el-form-item>

                    <el-form-item label="商品图片" prop="shangpintupian" required :rules="[{required:true, message:'请填写商品图片'}]">
                        <e-upload-images v-model="form.shangpintupian"></e-upload-images>
                    </el-form-item>

                    <el-form-item label="商品视频" prop="shangpinshipin" required :rules="[{required:true, message:'请填写商品视频'}]">
                        <e-upload-file v-model="form.shangpinshipin"></e-upload-file>
                    </el-form-item>

                    <el-form-item
                        label="商品价格"
                        prop="shangpinjiage"
                        required
                        :rules="[{required:true, message:'请填写商品价格'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入商品价格" style="width: 250px" v-model.number="form.shangpinjiage" />
                    </el-form-item>

                    <el-form-item label="商品销量" prop="shangpinxiaoliang" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                        <el-input type="number" placeholder="输入商品销量" style="width: 250px" v-model.number="form.shangpinxiaoliang" />
                    </el-form-item>

                    <el-form-item label="商品型号" prop="shangpinxinghao" required :rules="[{required:true, message:'请填写商品型号'}]">
                        <e-spec v-model="form.shangpinxinghao" />
                    </el-form-item>

                    <el-form-item label="商品颜色" prop="shangpinyanse" required :rules="[{required:true, message:'请填写商品颜色'}]">
                        <e-spec v-model="form.shangpinyanse" />
                    </el-form-item>

                    <el-form-item label="商品详情" prop="shangpinxiangqing"> <e-editor v-model="form.shangpinxiangqing"></e-editor> </el-form-item>

                    <el-form-item v-if="btnText">
                        <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
    .shangpinxinxi-add {
    }
</style>
<script>
    import api from "@/api";
    import rule from "@/utils/rule";
    import { extend } from "@/utils/extend";

    export default {
        name: "shangpinxinxi-add",
        data() {
            return {
                rule,
                loading: false,
                form: {
                    shangpinbianhao: rule.getID(),
                    shangpinmingcheng: "",
                    fenlei: "",
                    shangpintupian: "",
                    shangpinshipin: "",
                    shangpinjiage: "",
                    shangpinxiaoliang: "",
                    shangpinxinghao: "",
                    shangpinyanse: "",
                    shangpinxiangqing: "",
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

                        this.$post(api.shangpinxinxi.update, form)
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
                this.$post(api.shangpinxinxi.edit, {
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
