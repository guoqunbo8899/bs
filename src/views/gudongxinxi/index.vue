<template>
    <div v-loading="loading">
        <div>
            <e-container>
                <e-module-model-box title="古董列表">
                    <div class="snick clearfix">
                        <div style="margin-bottom: 20px">
                            <form action="javascript:;" @submit="searchSubmit" class="form-search">
                                <table class="jd-search">
                                    <tbody>
                                        <tr>
                                            <td class="label">古董分类</td>
                                            <td>
                                                <p class="search-radio">
                                                    <a href="javascript:;" @click="selectRadio('gudongfenlei','')" :class="{active:!search.gudongfenlei}">全部</a>

                                                    <a
                                                        href="javascript:;"
                                                        v-for="r in mapgudongfenlei1"
                                                        @click="selectRadio('gudongfenlei',r.id)"
                                                        :class="{active:search.gudongfenlei == r.id}"
                                                        v-text="r.fenleimingcheng"
                                                    >
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="label">古董级别</td>
                                            <td>
                                                <p class="search-radio">
                                                    <a href="javascript:;" @click="selectRadio('gudongjibie','')" :class="{active:!search.gudongjibie}">全部</a>

                                                    <a href="javascript:;" :class="{active:search.gudongjibie == '一级'}" @click="selectRadio('gudongjibie','一级')">一级</a>
                                                    <a href="javascript:;" :class="{active:search.gudongjibie == '二级'}" @click="selectRadio('gudongjibie','二级')">二级</a>
                                                    <a href="javascript:;" :class="{active:search.gudongjibie == '三级'}" @click="selectRadio('gudongjibie','三级')">三级</a>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="label">古董名称</td>
                                            <td>
                                                <el-input type="text" style="width: 150px" v-model="search.gudongmingcheng" placeholder="请输入关键词"> </el-input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="label">年代</td>
                                            <td>
                                                <el-input type="text" style="width: 150px" v-model="search.niandai" placeholder="请输入关键词"> </el-input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="label">历史文化</td>
                                            <td>
                                                <el-input type="text" style="width: 150px" v-model="search.lishiwenhua" placeholder="请输入关键词"> </el-input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <el-button type="success" @click="searchSubmit">搜索</el-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <el-row>
                            <el-col class="snock" v-for="r in list" :md="6">
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
    </div>
</template>
<style type="text/scss" scoped lang="scss"></style>
<script>
    import api from "@/api";
    import { extend } from "@/utils/extend";
    import objectDiff from "objectdiff";

    /**
     * 后台列表页面
     */
    export default {
        data() {
            return {
                loading: false,
                list: [],
                search: {
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
                page: 1, // 当前页
                pagesize: 12, // 页大小
                totalCount: 0, // 总行数
                total: {},

                mapgudongfenlei1: [],
            };
        },
        watch: {},
        computed: {},
        methods: {
            searchSubmit() {
                this.loadList(1);
            },
            loadList(page) {
                // 防止重新点加载列表
                if (this.loading) return;
                this.loading = true;
                this.page = page;
                // 筛选条件
                var filter = extend(true, {}, this.search, { page: page + "", pagesize: this.pagesize + "" });
                var diff = objectDiff.diff(filter, this.$route.query);
                if (diff.changed != "equal") {
                    // 筛选的条件不一致则更新链接
                    this.$router.replace({
                        // 更新query
                        path: this.$route.path,
                        query: filter,
                    });
                }
                this.$post(api.gudongxinxi.weblist, filter)
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
            selectRadio(target, name) {
                this.search[target] = name;
                this.searchSubmit(1);
            },
        },
        beforeRouteUpdate(to, form, next) {
            var search = extend(this.search, to.query);
            if (search.page) {
                this.page = Math.floor(to.query.page);
                delete search.page;
            }
            if (search.pagesize) {
                this.pagesize = Math.floor(to.query.pagesize);
                delete search.pagesize;
            }
            this.loadList(1);
            next();
        },
        created() {
            var search = extend(this.search, this.$route.query);
            if (search.page) {
                this.page = Math.floor(this.$route.query.page);
                delete search.page;
            }
            if (search.pagesize) {
                this.pagesize = Math.floor(this.$route.query.pagesize);
                delete search.pagesize;
            }
            this.loadList(this.page);
        },
        mounted() {},
        destroyed() {},
    };
</script>
