<template>
    <div class="gudongxinxi-detail" v-loading="loading">
        <div>
            <e-container>
                <div class="">
                    <div class="goods-info clearfix">
                        <div class="gallery-list">
                            <e-shangpinban :images="map.gudongtupian"></e-shangpinban>
                        </div>
                        <div class="goods-right-content">
                            <h3 class="title" v-text="map.gudongmingcheng"></h3>
                            <div class="descount">
                                <div>
                                    <span class="name"> 古董编号： </span>
                                    <span class="val"> {{ map.gudongbianhao }} </span>
                                </div>
                                <div>
                                    <span class="name"> 古董分类： </span>
                                    <span class="val"> <e-select-view module="gudongfenlei" :value="map.gudongfenlei" select="id" show="fenleimingcheng"></e-select-view> </span>
                                </div>
                                <div>
                                    <span class="name"> 年代： </span>
                                    <span class="val"> {{ map.niandai }} </span>
                                </div>
                                <div>
                                    <span class="name"> 古董级别： </span>
                                    <span class="val"> {{ map.gudongjibie }} </span>
                                </div>
                                <div>
                                    <span class="name"> 尺寸： </span>
                                    <span class="val"> {{ map.chicun }} </span>
                                </div>
                                <div>
                                    <span class="name"> 历史文化： </span>
                                    <span class="val"> {{ map.lishiwenhua }} </span>
                                </div>
                            </div>
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
                        <el-tab-pane label="古董概述">
                            <div style="text-indent: 2em">
                                <div v-html="map.gudonggaishu"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="视频介绍">
                            <div style="text-indent: 2em">
                                <e-video :src="map.gudongshipin"></e-video>
                            </div>
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
    import { extend } from "@/utils/extend";
    import jdk from "@/utils/extend";
    export default {
        data() {
            return {
                loading: false, // 加载

                map: {
                    gudongbianhao: "",
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
                this.$get(api.gudongxinxi.webdetail, {
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
        created() {},
        mounted() {},
        destroyed() {},
    };
</script>
