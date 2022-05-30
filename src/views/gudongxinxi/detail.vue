<template>
    <div class="gudongxinxi-detail" v-loading="loading" ref="print">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
        <div class="admin-detail">
            <div class="detail detail-text">
                <div class="detail-title">古董编号：</div>
                <div class="detail-content">{{ map.gudongbianhao }}</div>
            </div>
            <div class="detail detail-text">
                <div class="detail-title">年代：</div>
                <div class="detail-content">{{ map.niandai }}</div>
            </div>
            <div class="detail detail-text">
                <div class="detail-title">尺寸：</div>
                <div class="detail-content">{{ map.chicun }}</div>
            </div>
            <div class="detail detail-longtext">
                <div class="detail-title">古董名称：</div>
                <div class="detail-content">{{ map.gudongmingcheng }}</div>
            </div>
            <div class="detail detail-select">
                <div class="detail-title">古董分类：</div>
                <div class="detail-content">
                    <e-select-view module="gudongfenlei" :value="map.gudongfenlei" select="id" show="fenleimingcheng"></e-select-view>
                </div>
            </div>
            <div class="detail detail-select">
                <div class="detail-title">古董级别：</div>
                <div class="detail-content">{{ map.gudongjibie }}</div>
            </div>
            <div class="detail detail-textarea">
                <div class="detail-title">历史文化：</div>
                <div class="detail-content">{{ map.lishiwenhua }}</div>
            </div>
            <div class="detail detail-video">
                <div class="detail-title">古董视频：</div>
                <div class="detail-content">
                    <e-video :src="map.gudongshipin"></e-video>
                </div>
            </div>
            <div class="detail detail-images">
                <div class="detail-title">古董图片：</div>
                <div class="detail-content">
                    <e-images :src="map.gudongtupian" type="detail"></e-images>
                </div>
            </div>
            <div class="detail detail-editor">
                <div class="detail-title">古董概述：</div>
                <div class="detail-content">
                    <div v-html="map.gudonggaishu"></div>
                </div>
            </div>
        </div>
        <div class="mt10">
            <el-button type="default" class="hidePrint" @click="$router.go(-1)"> 返回 </el-button>
            <el-button type="success" class="hidePrint" @click="$print"> 打印本页 </el-button>
        </div>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
    .gudongxinxi-detail {
        .admin-detail {
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            .detail {
                width: 50%;
                padding: 5px;
                display: flex;
                margin-bottom: 10px;
                border-bottom: 1px solid #DEDEDE;
                .detail-title {
                    width: 120px;
                    text-align: right;
                    flex-shrink: 0;
                }
                .detail-content {
                    flex-grow: 1;
                }
            }
            .detail.detail-images {
                width: 100%;
                flex-wrap: wrap;
                .detail-title {
                    display: none;
                }

                .detail-content {
                    width: 100%;
                    padding: 10px;
                }
            }
            .detail.detail-editor,
            .detail.detail-dataset {
                width: 100%;
                flex-wrap: wrap;
                .detail-title {
                    width: 100%;
                    padding: 10px;
                    margin-top: 10px;
                    background: #9a0606;
                    color: #ffffff;
                    text-align: left;
                }
                .detail-content {
                    padding: 10px;
                }
            }
        }
    }
</style>
<script>
    import api from "@/api";
    import { extend } from "@/utils/extend";

    export default {
        data() {
            return {
                loading: false,
                map: {},
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
            goBack() {
                this.$router.go(-1);
            },
            loadDetail() {
                if (this.loading) return;
                this.loading = true;
                this.$get(api.gudongxinxi.detail, {
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
