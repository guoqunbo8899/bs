export default [
    {
        label: "购物车",
        to: "",
        children: [
            {
                label: "购物车查询",
                to: "/admin/gouwuche_goumaiyonghu",
            },
        ],
    },
    {
        label: "商品订单",
        to: "",
        children: [
            {
                label: "商品订单查询",
                to: "/admin/dingdanxinxi_xiadanyonghu",
            },
            {
                label: "订单发货查询",
                to: "/admin/dingdanfahuo_xiadanyonghu",
            },
            {
                label: "订单签收查询",
                to: "/admin/dingdanqianshou_qianshouyonghu",
            },
        ],
    },
    {
        label: "旅游活动",
        to: "",
        children: [
            {
                label: "活动报名查询",
                to: "/admin/huodongbaoming_baomingyonghu",
            },
        ],
    },
    {
        label: "收货地址",
        to: "",
        children: [
            {
                label: "收货地址添加",
                to: "/admin/shouhuodizhiadd",
            },
            {
                label: "收货地址查询",
                to: "/admin/shouhuodizhi_tianjiaren",
            },
        ],
    },
    {
        label: "个人中心",
        to: "",
        children: [
            {
                label: "修改个人资料",
                to: "/admin/yonghuupdtself",
            },
            {
                label: "修改密码",
                to: "/admin/mod",
            },
            {
                label: "商品咨询",
                to: "/admin/shangpinzixun_zixunyonghu",
            },
            {
                label: "活动咨询",
                to: "/admin/huodongzixun_zixunyonghu",
            },
            {
                label: "浏览记录",
                to: "/admin/liulanjilu_liulanyonghu",
            },
            {
                label: "我的评价",
                to: "/admin/pinglun_pinglunren",
            },
        ],
    },
];
