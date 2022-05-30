<template>
    <div class="shangpinxinxi-detail" v-loading="loading">
        <div>
            <e-container>
                <div class="">
                    <div class="goods-info clearfix">
                        <div class="gallery-list">
                            <e-shangpinban :images="map.shangpintupian"></e-shangpinban>
                        </div>
                        <div class="goods-right-content">
                            <h3 class="title" v-text="map.shangpinmingcheng"></h3>
                            <div class="descount">
                                <div>
                                    <span class="name"> 商品编号： </span>
                                    <span class="val"> {{ map.shangpinbianhao }} </span>
                                </div>
                                <div>
                                    <span class="name"> 分类： </span>
                                    <span class="val"> <e-select-view module="shangpinfenlei" :value="map.fenlei"
                                                                      select="id"
                                                                      show="fenleimingcheng"></e-select-view> </span>
                                </div>
                                <div>
                                    <span class="name"> 商品价格： </span>
                                    <span class="val"> {{ map.shangpinjiage }} </span>
                                </div>
                                <div>
                                    <span class="name"> 商品销量： </span>
                                    <span class="val"> {{ map.shangpinxiaoliang }} </span>
                                </div>
                                <div>
                                    <span class="name"> 商品型号： </span>
                                    <span class="val"> {{ map.shangpinxinghao }} </span>
                                </div>
                                <div>
                                    <span class="name"> 商品颜色： </span>
                                    <span class="val"> {{ map.shangpinyanse }} </span>
                                </div>
                                <div>
                                    <span class="name"> 点击量： </span>
                                    <span class="val"> {{ map.dianjiliang }} </span>
                                </div>
                            </div>

                            <el-button type="primary" @click="$router.push('/gouwucheadd?id='+map.id)">加入购物车</el-button>
                            <el-button type="primary" @click="$router.push('/shangpinzixunadd?id='+map.id)">商品咨询</el-button>
                        </div>
                    </div>
                    <div class="goods-content"></div>
                </div>
            </e-container>
        </div>
        <div>
            <e-container>
                <e-container>
                    <el-tabs type="border-card">
                        <el-tab-pane label="商品详情">
                            <div style="text-indent: 2em">
                                <div v-html="map.shangpinxiangqing"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="商品视频">
                            <div style="text-indent: 2em">
                                <e-video :src="map.shangpinshipin"></e-video>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="评论区">
                            <e-comments
                                    module="shangpinxinxi"
                                    :lists="comments"
                                    :biaoti="map.shangpinmingcheng"
                                    user="yonghu"
                                    headimg="touxiang"
                                    :is-reply="false"
                                    name="yonghuming"
                            >
                            </e-comments>
                        </el-tab-pane>
                    </el-tabs>
                </e-container>
            </e-container>
        </div>
    </div>
</template>
<style type="text/scss" scoped lang="scss"></style>
<script>
    import api from "@/api";
    import {extend} from "@/utils/extend";
    import jdk from "@/utils/extend";

    export default {
        data() {
            return {
                loading: false, // 加载

                map: {
                    shangpinbianhao: "",
                    shangpinmingcheng: "",
                    fenlei: "",
                    shangpintupian: "",
                    shangpinshipin: "",
                    shangpinjiage: "",
                    shangpinxiaoliang: "",
                    shangpinxinghao: "",
                    shangpinyanse: "",
                    dianjiliang: "",
                    shangpinxiangqing: "",
                },
                comments: [],
            };
        },
        props: {
            id: {
                type: [String, Number],
                required: true,
            },
        },
        watch: {
            id: {
                handler() {
                    this.loadDetail();
                },
                immediate: true,
            },
        },
        computed: {},
        methods: {
            loadDetail() {
                if (this.loading) return;
                this.loading = true;
                this.$get(api.shangpinxinxi.webdetail, {
                    id: this.id,
                })
                    .then((res) => {
                        this.loading = false;
                        if (res.code == api.code.OK) {
                            extend(this, res.data);
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                    .catch((err) => {
                        this.loading = false;
                        this.$message.error(err.message);
                    });
            },
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
    };
</script>
