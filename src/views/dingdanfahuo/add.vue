<template>
    <div class="dingdanfahuo-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title"> 添加订单发货</span>
            </div>
            <div class="form-database-form">
                <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="订单号" prop="dingdanhao"> {{ form.dingdanhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="订单商品" prop="dingdanshangpin">
                        <e-dataset-table table="dingdanxinxidingdanshangpin" :where="{ dingdanxinxiid : $route.query.id  }" order="id desc" var="dataSets">
                            <template v-slot="{dataSets}"
                                ><div id="dataListdingdanshangpin" style="text-align: left">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>商品编号</th>
                                                <th>商品名称</th>
                                                <th>分类</th>
                                                <th>商品图片</th>
                                                <th>商品价格</th>
                                                <th>商品型号</th>
                                                <th>商品颜色</th>
                                                <th>购买数量</th>
                                                <th>小计</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="dataMap in dataSets">
                                                <td>{{ dataMap.shangpinbianhao }}</td>
                                                <td>{{ dataMap.shangpinmingcheng }}</td>
                                                <td><e-select-view module="shangpinfenlei" :value="dataMap.fenlei" select="id" show="fenleimingcheng"></e-select-view></td>
                                                <td><e-img :src="dataMap.shangpintupian" type="list" style="max-width: 120px"></e-img></td>
                                                <td>{{ dataMap.shangpinjiage }}</td>
                                                <td>{{ dataMap.shangpinxinghao }}</td>
                                                <td>{{ dataMap.shangpinyanse }}</td>
                                                <td>{{ dataMap.goumaishuliang }}</td>
                                                <td>{{ dataMap.xiaoji }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </template>
                        </e-dataset-table>
                    </el-form-item>

                    <el-form-item v-if="isRead" label="订单金额" prop="dingdanjine" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                        {{ form.dingdanjine }}
                    </el-form-item>

                    <el-form-item v-if="isRead" label="收货地址" prop="shouhuodizhi"> {{ form.shouhuodizhi }} </el-form-item>

                    <el-form-item v-if="isRead" label="联系电话" prop="lianxidianhua"> {{ form.lianxidianhua }} </el-form-item>

                    <el-form-item v-if="isRead" label="收货人" prop="shouhuoren"> {{ form.shouhuoren }} </el-form-item>

                    <el-form-item v-if="isRead" label="下单用户" prop="xiadanyonghu"> {{ form.xiadanyonghu }} </el-form-item>

                    <el-form-item label="物流公司" prop="wuliugongsi" required :rules="[{required:true, message:'请填写物流公司'}]">
                        <el-input type="text" placeholder="输入物流公司" style="width: 250px" v-model="form.wuliugongsi" />
                    </el-form-item>

                    <el-form-item label="物流单号" prop="wuliudanhao" required :rules="[{required:true, message:'请填写物流单号'}]">
                        <el-input type="text" placeholder="输入物流单号" style="width: 450px" v-model="form.wuliudanhao" />
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
    .dingdanfahuo-add {
    }
</style>
<script>
    import api from "@/api";
    import rule from "@/utils/rule";
    import { extend } from "@/utils/extend";

    export default {
        name: "dingdanfahuo-add",
        data() {
            return {
                readMap: {},
                rule,
                loading: false,
                form: {
                    dingdanhao: "",
                    dingdanshangpin: "",
                    dingdanjine: this.$route.query.sum_xiaoji,
                    shouhuodizhi: "",
                    lianxidianhua: "",
                    shouhuoren: "",
                    xiadanyonghu: this.$store.state.user.session.username,
                    wuliugongsi: "",
                    wuliudanhao: "",

                    dingdanxinxiid: 0,
                },
            };
        },
        watch: {},
        props: {
            isRead: {
                type: Boolean,
                default: true,
            },
            btnText: {
                type: String,
                default: "提交",
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

                        this.$post(api.dingdanfahuo.insert, form)
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
                var form = this.form;
                // 获取模块得数据
                this.loading = true;
                this.$post(api.dingdanfahuo.create, {
                    id: this.$route.query.id,
                })
                    .then((res) => {
                        this.loading = false;
                        if (res.code == api.code.OK) {
                            extend(this, res.data);
                            var readMap = res.data.readMap;
                            for (var i in form) {
                                if (readMap[i] && i != "id") {
                                    form[i] = res.data.readMap[i];
                                }
                            }
                            form.dingdanxinxiid = readMap.id;
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
