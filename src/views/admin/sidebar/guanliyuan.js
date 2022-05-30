export default [
    {
        label: "账号管理",
        to: "",
        children: [
            {
                label: "管理员账号管理",
                to: "/admin/admins",
            },
            {
                label: "管理员账号添加",
                to: "/admin/adminsadd",
            },
            {
                label: "用户管理",
                to: "/admin/yonghu",
            },
            {
                label: "添加新用户",
                to: "/admin/yonghuadd",
            },
            {
                label: "密码修改",
                to: "/admin/mod",
            },
        ],
    },
    {
        label: "古董分类管理",
        to: "",
        children: [
            {
                label: "古董分类添加",
                to: "/admin/gudongfenleiadd",
            },
            {
                label: "古董分类查询",
                to: "/admin/gudongfenlei",
            },
        ],
    },
    {
        label: "古董信息管理",
        to: "",
        children: [
            {
                label: "古董信息添加",
                to: "/admin/gudongxinxiadd",
            },
            {
                label: "古董信息查询",
                to: "/admin/gudongxinxi",
            },
        ],
    },
    {
        label: "旅游活动管理",
        to: "",
        children: [
            {
                label: "旅游活动添加",
                to: "/admin/lvyouhuodongadd",
            },
            {
                label: "旅游活动查询",
                to: "/admin/lvyouhuodong",
            },
            {
                label: "活动报名查询",
                to: "/admin/huodongbaoming",
            },
        ],
    },
    {
        label: "商品信息管理",
        to: "",
        children: [
            {
                label: "商品分类添加",
                to: "/admin/shangpinfenleiadd",
            },
            {
                label: "商品分类查询",
                to: "/admin/shangpinfenlei",
            },
            {
                label: "商品信息添加",
                to: "/admin/shangpinxinxiadd",
            },
            {
                label: "商品信息查询",
                to: "/admin/shangpinxinxi",
            },
        ],
    },
    {
        label: "订单信息管理",
        to: "",
        children: [
            {
                label: "订单信息查询",
                to: "/admin/dingdanxinxi",
            },
            {
                label: "订单发货查询",
                to: "/admin/dingdanfahuo",
            },
            {
                label: "订单签收查询",
                to: "/admin/dingdanqianshou",
            },
        ],
    },
    {
        label: "可视化分析统计",
        to: "",
        children: [
            {
                label: "商品销售可视化",
                to: "/admin/total?src=total1.jsp",
            },
            {
                label: "商品点击量可视化",
                to: "/admin/total?src=total2.jsp",
            },
        ],
    },
    {
        label: "系统管理",
        to: "",
        children: [
            {
                label: "友情链接添加",
                to: "/admin/youqinglianjieadd",
            },
            {
                label: "友情链接查询",
                to: "/admin/youqinglianjie",
            },
            {
                label: "轮播图添加",
                to: "/admin/lunbotuadd",
            },
            {
                label: "轮播图查询",
                to: "/admin/lunbotu",
            },
            {
                label: "浏览记录查询",
                to: "/admin/liulanjilu",
            },
            {
                label: "商品咨询查询",
                to: "/admin/shangpinzixun",
            },
            {
                label: "活动咨询查询",
                to: "/admin/huodongzixun",
            },
            {
                label: "评论管理",
                to: "/admin/pinglun",
            },
        ],
    },
];
