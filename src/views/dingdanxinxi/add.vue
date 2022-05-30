<template>
    <div class="dingdanxinxi-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title"> 添加订单信息</span>
            </div>
            <div class="form-database-form">
                <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                    <el-form-item label="订单号" prop="dingdanhao" :rules="[{required:true, message:'请填写订单号'}]">
                        <el-input type="text" placeholder="输入订单号" style="width: 250px" v-model="form.dingdanhao"/>
                    </el-form-item>

                    <el-form-item label="订单商品" prop="dingdanshangpin">
                        <e-dataset-table table="gouwuche" :where="{ goumaiyonghu : $session.username  }" order="id desc"
                                         var="dataSets">
                            <template v-slot="{dataSets}">
                                <div id="dataListdingdanshangpin" style="text-align: left">
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
                                            <td>
                                                <e-select-view module="shangpinfenlei" :value="dataMap.fenlei"
                                                               select="id" show="fenleimingcheng"></e-select-view>
                                            </td>
                                            <td>
                                                <e-img :src="dataMap.shangpintupian" type="list"
                                                       style="max-width: 120px"></e-img>
                                            </td>
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

                    <el-form-item
                            label="订单金额"
                            prop="dingdanjine"
                            required
                            :rules="[{required:true, message:'请填写订单金额'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入订单金额" style="width: 250px"
                                  v-model.number="form.dingdanjine"/>
                    </el-form-item>

                    <el-form-item label="选择地址" prop="xuanzedizhi">
                        <e-select-list
                                :model="form"
                                v-model="form.xuanzedizhi"
                                module="shouhuodizhi"
                                select-update="shouhuodizhi,lianxidianhua,shouhuoren"
                                search-update=""
                                @update-where="updateWhere"
                        ></e-select-list>
                        <table>
                            <tr>
                                <td width="120">收货地址</td>
                                <td>{{ form.shouhuodizhi }}</td>
                            </tr>
                            <tr>
                                <td width="120">联系电话</td>
                                <td>{{ form.lianxidianhua }}</td>
                            </tr>
                            <tr>
                                <td width="120">收货人</td>
                                <td>{{ form.shouhuoren }}</td>
                            </tr>
                        </table>
                    </el-form-item>

                    <el-form-item label="收货地址" prop="shouhuodizhi">
                        <el-input type="text" placeholder="输入收货地址" style="width: 250px" v-model="form.shouhuodizhi"/>
                    </el-form-item>

                    <el-form-item label="联系电话" prop="lianxidianhua">
                        <el-input type="text" placeholder="输入联系电话" style="width: 250px" v-model="form.lianxidianhua"/>
                    </el-form-item>

                    <el-form-item label="收货人" prop="shouhuoren">
                        <el-input type="text" placeholder="输入收货人" style="width: 250px" v-model="form.shouhuoren"/>
                    </el-form-item>

                    <el-form-item label="下单用户" prop="xiadanyonghu">
                        <el-input v-model="form.xiadanyonghu" readonly style="width: 250px"></el-input>
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
    .dingdanxinxi-add {
    }
</style>
<script>
    import api from "@/api";
    import rule from "@/utils/rule";
    import {extend} from "@/utils/extend";

    export default {
        name: "dingdanxinxi-add",
        data() {
            return {
                rule,
                loading: false,
                form: {
                    dingdanhao: rule.getID(),
                    dingdanshangpin: "",
                    dingdanjine: this.$route.query.sum_xiaoji,
                    xuanzedizhi: "",
                    shouhuodizhi: "",
                    lianxidianhua: "",
                    shouhuoren: "",
                    xiadanyonghu: this.$store.state.user.session.username,
                    dingdanzhuangtai: "待支付",

                    iszf: "否",
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
            updateWhere(where){


                where.tianjiaren = this.$store.state.user.session.username;

            },
            submit() {
                this.$refs.formModel
                    .validate()
                    .then((res) => {
                        if (this.loading) return;
                        this.loading = true;
                        var form = this.form;

                        this.$post(api.dingdanxinxi.insert, form)
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
                var form = this.form;
                // 获取模块得数据
                this.loading = true;
                this.$post(api.dingdanxinxi.create, {
                    id: this.$route.query.id,
                })
                    .then((res) => {
                        this.loading = false;
                        if (res.code == api.code.OK) {
                            extend(this, res.data);
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
        mounted() {
        },
        destroyed() {
        },
    };
</script>
