export default [
    {
        path: "yonghuadd",
        name: "IndexyonghuAdd",
        component: () => import("@/views/yonghu/webadd"),
        meta: { title: "用户添加" },
    },
    {
        path: "pinglunadd",
        name: "IndexpinglunAdd",
        component: () => import("@/views/pinglun/webadd"),
        meta: { title: "评论添加", authLogin: true, msg: true },
    },
    {
        path: "gudongxinxi",
        name: "IndexgudongxinxiList",
        component: () => import("@/views/gudongxinxi/index"),
        meta: { title: "古董信息列表" },
    },
    {
        path: "gudongxinxidetail",
        name: "IndexgudongxinxiDetail",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/gudongxinxi/webdetail"),
        meta: { title: "古董信息详情" },
    },
    {
        path: "lvyouhuodong",
        name: "IndexlvyouhuodongList",
        component: () => import("@/views/lvyouhuodong/index"),
        meta: { title: "旅游活动列表" },
    },
    {
        path: "lvyouhuodongdetail",
        name: "IndexlvyouhuodongDetail",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/lvyouhuodong/webdetail"),
        meta: { title: "旅游活动详情" },
    },
    {
        path: "huodongbaomingadd",
        name: "IndexhuodongbaomingAdd",
        component: () => import("@/views/huodongbaoming/webadd"),
        meta: { title: "活动报名添加", authLogin: true, msg: true },
    },
    {
        path: "shangpinxinxi",
        name: "IndexshangpinxinxiList",
        component: () => import("@/views/shangpinxinxi/index"),
        meta: { title: "商品信息列表" },
    },
    {
        path: "shangpinxinxidetail",
        name: "IndexshangpinxinxiDetail",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/shangpinxinxi/webdetail"),
        meta: { title: "商品信息详情" },
    },
    {
        path: "gouwucheadd",
        name: "IndexgouwucheAdd",
        component: () => import("@/views/gouwuche/webadd"),
        meta: { title: "购物车添加", authLogin: true, msg: true },
    },
    {
        path: "shangpinzixunadd",
        name: "IndexshangpinzixunAdd",
        component: () => import("@/views/shangpinzixun/webadd"),
        meta: { title: "商品咨询添加", authLogin: true, msg: true },
    },
    {
        path: "huodongzixunadd",
        name: "IndexhuodongzixunAdd",
        component: () => import("@/views/huodongzixun/webadd"),
        meta: { title: "活动咨询添加", authLogin: true, msg: true },
    },
];
