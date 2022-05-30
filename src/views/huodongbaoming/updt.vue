<template>
    <div class="huodongbaoming-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix updt">
                <el-page-header @back="$router.go(-1)" content="编辑活动报名"> </el-page-header>
            </div>
            <div class="form-database-form">
                <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="编号" prop="bianhao"> {{ form.bianhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="标题" prop="biaoti"> {{ form.biaoti }} </el-form-item>

                    <el-form-item v-if="isRead" label="类型" prop="leixing"> {{ form.leixing }} </el-form-item>

                    <el-form-item v-if="isRead" label="图片" prop="tupian"> <e-img :src="form.tupian" style="max-width: 120px" /> </el-form-item>

                    <el-form-item v-if="isRead" label="活动价格" prop="huodongjiage" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                        {{ form.huodongjiage }}
                    </el-form-item>

                    <el-form-item v-if="isRead" label="开始时间" prop="kaishishijian"> {{ form.kaishishijian }} </el-form-item>

                    <el-form-item v-if="isRead" label="结束时间" prop="jieshushijian"> {{ form.jieshushijian }} </el-form-item>

                    <el-form-item label="报名编号" prop="baomingbianhao" :rules="[{required:true, message:'请填写报名编号'}]">
                        <el-input type="text" placeholder="输入报名编号" style="width: 250px" v-model="form.baomingbianhao" />
                    </el-form-item>

                    <el-form-item
                        label="报名人数"
                        prop="baomingrenshu"
                        required
                        :rules="[{required:true, message:'请填写报名人数'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入报名人数" style="width: 250px" v-model.number="form.baomingrenshu" />
                    </el-form-item>

                    <el-form-item
                        label="联系方式"
                        prop="lianxifangshi"
                        required
                        :rules="[{required:true, message:'请填写联系方式'}, {validator:rule.checkPhone, message:'请输入正确手机号码'}]"
                    >
                        <el-input type="text" placeholder="输入联系方式" style="width: 250px" v-model="form.lianxifangshi" />
                    </el-form-item>

                    <el-form-item label="昵称" prop="nicheng" required :rules="[{required:true, message:'请填写昵称'}]">
                        <el-input type="text" placeholder="输入昵称" style="width: 250px" v-model="form.nicheng" />
                    </el-form-item>

                    <el-form-item label="报名用户" prop="baomingyonghu"> <el-input v-model="form.baomingyonghu" readonly style="width: 250px"></el-input> </el-form-item>

                    <el-form-item label="报名状态" prop="baomingzhuangtai">
                        <el-select v-model="form.baomingzhuangtai"
                            ><el-option label="待支付" value="待支付"></el-option>
                            <el-option label="报名成功" value="报名成功"></el-option>
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
    .huodongbaoming-add {
    }
</style>
<script>
    import api from "@/api";
    import rule from "@/utils/rule";
    import { extend } from "@/utils/extend";

    export default {
        name: "huodongbaoming-add",
        data() {
            return {
                rule,
                loading: false,
                form: {
                    bianhao: "",
                    biaoti: "",
                    leixing: "",
                    tupian: "",
                    huodongjiage: "",
                    kaishishijian: "",
                    jieshushijian: "",
                    baomingbianhao: rule.getID(),
                    baomingrenshu: "",
                    lianxifangshi: "",
                    nicheng: "",
                    baomingyonghu: this.$store.state.user.session.username,
                    baomingzhuangtai: "",

                    lvyouhuodongid: 0,
                    iszf: "否",
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

                        this.$post(api.huodongbaoming.update, form)
                            .then((res) => {
                                this.loading = false;
                                if (res.code == api.code.OK) {
                                    this.$message.success("添加成功");
                                    this.$emit("success", res.data);
                                    this.$refs.formModel.resetFields();
                                    this.$router.go(-1);
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
                this.$post(api.huodongbaoming.edit, {
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
