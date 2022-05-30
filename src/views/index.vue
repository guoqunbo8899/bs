<template>
    <div v-loading="loading">
        <div>
            <el-carousel indicator-position="outside" height="500px">
                <el-carousel-item v-for="item in bhtList" :key="item.id">
                    <div style="background-size: cover" @click="$goto(item.url)" :style="{'background-image': 'url('+item.image+')',width:'100%', height: '500px'}"></div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>
            <e-container>
                <e-module-model-box title="古董展示">
                    <div class="snick clearfix">
                        <el-row>
                            <el-col class="snock" v-for="r in gudongxinxilist1" :md="6">
                                <div class="services">
                                    <router-link :to="'/gudongxinxidetail?id='+r.id">
                                        <e-img-box :src="r.gudongtupian" class="snocks"></e-img-box>
                                        <h2 v-html="$substr(r.gudongmingcheng,15)"></h2>
                                        <p v-html="$substr(r.lishiwenhua,30)"></p>
                                    </router-link>
                                </div>
                            </el-col>
                        </el-row></div
                ></e-module-model-box>
            </e-container>
        </div>
        <div>
            <e-container>
                <e-module-model-box title="商品">
                    <div class="floor_goods_wrap clearfix">
                        <el-row :gutter="20">
                            <el-col :md="6" v-for="r in shangpinxinxilist2">
                                <div class="floor_goods_wrap_li">
                                    <div class="floor_goods_wrap_b">
                                        <router-link :to="{path:'/shangpinxinxidetail',query:{id:r.id}}" class="floor_goods_img">
                                            <e-img-box :src="r.shangpintupian" pb="100"></e-img-box>
                                        </router-link>
                                        <router-link
                                            :to="{path:'/shangpinxinxidetail',query:{id:r.id}}"
                                            class="floor_goods_tit"
                                            v-html="$substr(r.shangpinmingcheng,20)"
                                        ></router-link>
                                        <router-link
                                            :to="{path:'/shangpinxinxidetail',query:{id:r.id}}"
                                            class="floor_goods_txt"
                                            v-html="$substr(r.shangpinxiangqing,20)"
                                        ></router-link>
                                        <router-link :to="{path:'/shangpinxinxidetail',query:{id:r.id}}" class="floor_goods_price"> ￥{{ r.shangpinjiage }}元 </router-link>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </e-module-model-box>
            </e-container>
        </div>
        <div>
            <e-container>
                <e-module-model-box title="文化旅游活动">
                    <div class="fengjing clearfix">
                        <el-row :gutter="20">
                            <el-col :md="6" v-for="r in lvyouhuodonglist3">
                                <div class="card">
                                    <router-link :to="'/lvyouhuodongdetail?id='+r.id">
                                        <e-img-box :src="r.tupian" pb="100"></e-img-box>
                                    </router-link>
                                    <div class="card-body">
                                        <div class="feng">
                                            <div class="feng-right">
                                                <div class="property-price">
                                                    <h3>￥{{ r.huodongjiage }}</h3>
                                                </div>
                                            </div>
                                            <div class="feng-left">
                                                <router-link :to="{path:'/lvyouhuodongdetail',query:{id:r.id}}">
                                                    <h5 v-html="$substr(r.biaoti,15)"></h5>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row></div
                ></e-module-model-box>
            </e-container>
        </div>
    </div>
</template>
<style type="text/scss" scoped lang="scss"></style>
<script>
    import api from "@/api";
    import { extend } from "@/utils/extend";
    import jdk from "@/utils/extend";
    export default {
        data() {
            return {
                loading: false,
                bhtList: [],
                gudongxinxilist1: [],
                shangpinxinxilist2: [],
                lvyouhuodonglist3: [],
            };
        },
        watch: {},
        computed: {},
        methods: {
            loadPageData() {
                if (this.loading) return;
                this.loading = true;
                this.$get("/index")
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
            this.loadPageData();
        },
        mounted() {},
        destroyed() {},
    };
</script>
