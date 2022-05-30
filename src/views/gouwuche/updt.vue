<template>
    <div class="gouwuche-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix updt">
                <el-page-header @back="$router.go(-1)" content="编辑购物车"> </el-page-header>
            </div>
            <div class="form-database-form">
                <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="商品编号" prop="shangpinbianhao"> {{ form.shangpinbianhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="商品名称" prop="shangpinmingcheng"> {{ form.shangpinmingcheng }} </el-form-item>

                    <el-form-item v-if="isRead" label="分类" prop="fenlei">
                        <e-select-view module="shangpinfenlei" :value="form.fenlei" select="id" show="fenleimingcheng"></e-select-view>
                    </el-form-item>

                    <el-form-item v-if="isRead" label="商品图片" prop="shangpintupian">
                        <e-img :src="form.shangpintupian" type="list" style="max-width: 120px"></e-img>
                    </el-form-item>

                    <el-form-item v-if="isRead" label="商品价格" prop="shangpinjiage" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                        {{ form.shangpinjiage }}
                    </el-form-item>

                    <el-form-item v-if="isRead" label="商品型号" prop="shangpinxinghao">
                        <el-radio-group v-model="form.shangpinxinghao" size="mini">
                            <el-radio-button v-for="v in shangpinxinghaoSpec" :label="v" :key="v"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item v-if="isRead" label="商品颜色" prop="shangpinyanse">
                        <el-radio-group v-model="form.shangpinyanse" size="mini">
                            <el-radio-button v-for="v in shangpinyanseSpec" :label="v" :key="v"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item
                        label="购买数量"
                        prop="goumaishuliang"
                        required
                        :rules="[{required:true, message:'请填写购买数量'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入购买数量" style="width: 250px" v-model.number="form.goumaishuliang" />
                    </el-form-item>

                    <el-form-item label="购买用户" prop="goumaiyonghu"> <el-input v-model="form.goumaiyonghu" readonly style="width: 250px"></el-input> </el-form-item>

                    <el-form-item v-if="btnText">
                        <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
    .gouwuche-add {
    }
</style>
<script>
    import api from "@/api";
    import rule from "@/utils/rule";
    import { extend } from "@/utils/extend";

    export default {
        name: "gouwuche-add",
        data() {
            return {
                rule,
                loading: false,
                form: {
                    shangpinbianhao: "",
                    shangpinmingcheng: "",
                    fenlei: "",
                    shangpintupian: "",
                    shangpinjiage: "",
                    shangpinxinghao: "",
                    shangpinyanse: "",
                    goumaishuliang: "",
                    goumaiyonghu: this.$store.state.user.session.username,
                    shangpinxinxiid: 0,
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

        computed: {
            shangpinxinghaoSpec() {
                return this.readMap.shangpinxinghao ? this.readMap.shangpinxinghao.split(",") : [];
            },
            shangpinyanseSpec() {
                return this.readMap.shangpinyanse ? this.readMap.shangpinyanse.split(",") : [];
            },
        },
        methods: {
            submit() {
                this.$refs.formModel
                    .validate()
                    .then((res) => {
                        if (this.loading) return;
                        this.loading = true;
                        var form = this.form;

                        this.$post(api.gouwuche.update, form)
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
                this.$post(api.gouwuche.edit, {
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
