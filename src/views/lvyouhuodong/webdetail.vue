<template>
    <div class="lvyouhuodong-detail" v-loading="loading">
        <div>
            <e-container>
                <div class="">
                    <div class="goods-info clearfix">
                        <div class="gallery-list">
                            <e-shangpinban :images="map.tupian"></e-shangpinban>
                        </div>
                        <div class="goods-right-content">
                            <h3 class="title" v-text="map.biaoti"></h3>
                            <div class="descount">
                                <div>
                                    <span class="name"> 编号： </span>
                                    <span class="val"> {{ map.bianhao }} </span>
                                </div>
                                <div>
                                    <span class="name"> 类型： </span>
                                    <span class="val"> {{ map.leixing }} </span>
                                </div>
                                <div>
                                    <span class="name"> 活动价格： </span>
                                    <span class="val"> {{ map.huodongjiage }} </span>
                                </div>
                                <div>
                                    <span class="name"> 开始时间： </span>
                                    <span class="val"> {{ map.kaishishijian }} </span>
                                </div>
                                <div>
                                    <span class="name"> 结束时间： </span>
                                    <span class="val"> {{ map.jieshushijian }} </span>
                                </div>
                                <div>
                                    <span class="name"> 参与人数： </span>
                                    <span class="val"> {{ map.canyurenshu }} </span>
                                </div>
                                <div>
                                    <span class="name"> 活动状态： </span>
                                    <span class="val"> {{ map.huodongzhuangtai }} </span>
                                </div>
                            </div>
                            <el-button type="primary" @click="$router.push('/huodongbaomingadd?id='+map.id)">活动报名</el-button>
                            <el-button type="primary" @click="$router.push('/huodongzixunadd?id='+map.id)">活动咨询</el-button>
                        </div>
                    </div>
                    <div class="goods-content"></div>
                </div>

                <div style="text-indent: 2em">
                    <div v-html="map.huodongxiangqing"></div>
                </div>
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
                    bianhao: "",
                    biaoti: "",
                    leixing: "",
                    tupian: "",
                    huodongjiage: "",
                    kaishishijian: "",
                    jieshushijian: "",
                    canyurenshu: "",
                    huodongxiangqing: "",
                    huodongzhuangtai: "",
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
                this.$get(api.lvyouhuodong.webdetail, {
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
