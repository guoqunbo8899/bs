import http from "@/utils/ajax/http";
import { extend } from "@/utils/extend";

const api = {
    code: {
        OK: 0,
    },
    user: {
        login: "authLogin.do?ac=login",
        tokenLogin: "tokenLogin.do",
        logout: "logout.do",
    },
    checkUpdate: "sh.do",
    editorPassword: "editPassword",
    checkField: "checkno.do",
    dbQuery: "/db/query",
    dbSelect: "/db/select",

    payment: "payment.do",

    captch() {
        var url = "captcha.do?rd=" + Math.floor(Math.random() * 100000);
        return new Promise((resolve, reject) => {
            http.get(url).then((res) => {
                var url = res.data;
                resolve(url);
            }, reject);
        });
    },
    search: {
        select: "selectUpdateSearch.do",
        table: "tableAjax.do?a=table",
        selectView: "selectView.do",
        all: "selectAll.do",
    },
    attachment: {
        uploadUrl: "upload_re.do",
        upload(file) {
            return new Promise((resolve, reject) => {
                var formdata = new FormData();
                formdata.append("fujian", file, file.name || "tmp.png");
                http.post(api.attachment.uploadUrl, formdata)
                    .then((res) => {
                        if (res.code == api.code.OK) {
                            resolve(res.data);
                        } else {
                            reject(res.msg);
                        }
                    })
                    .catch((err) => {
                        reject(err.message);
                    });
            });
        },
    },
    admins: {
        list: "admins_list.do",
        insert: "adminsinsert.do",
        update: "adminsupdate.do",
        delete: "admins_delete.do",
        detail: "admins_detail.do",
        create: "admins_add.do",
        edit: "admins_updt.do",
    },
    yonghu: {
        list: "yonghu_list.do",
        insert: "yonghuinsert.do",
        update: "yonghuupdate.do",
        delete: "yonghu_delete.do",
        detail: "yonghu_detail.do",
        create: "yonghu_add.do",
        edit: "yonghu_updt.do",
    },
    youqinglianjie: {
        list: "youqinglianjie_list.do",
        insert: "youqinglianjieinsert.do",
        update: "youqinglianjieupdate.do",
        delete: "youqinglianjie_delete.do",
        detail: "youqinglianjie_detail.do",
        create: "youqinglianjie_add.do",
        edit: "youqinglianjie_updt.do",
    },
    lunbotu: {
        list: "lunbotu_list.do",
        insert: "lunbotuinsert.do",
        update: "lunbotuupdate.do",
        delete: "lunbotu_delete.do",
        detail: "lunbotu_detail.do",
        create: "lunbotu_add.do",
        edit: "lunbotu_updt.do",
    },
    pinglun: {
        list: "pinglun_list.do",
        insert: "pingluninsert.do",
        update: "pinglunupdate.do",
        delete: "pinglun_delete.do",
        detail: "pinglun_detail.do",
        create: "pinglun_add.do",
        edit: "pinglun_updt.do",
        listpinglunren: "pinglun_list_pinglunren.do",
    },
    liulanjilu: {
        list: "liulanjilu_list.do",
        insert: "liulanjiluinsert.do",
        update: "liulanjiluupdate.do",
        delete: "liulanjilu_delete.do",
        detail: "liulanjilu_detail.do",
        create: "liulanjilu_add.do",
        edit: "liulanjilu_updt.do",
        listliulanyonghu: "liulanjilu_list_liulanyonghu.do",
        batch: "liulanjilu_batch.do",
    },
    gudongfenlei: {
        list: "gudongfenlei_list.do",
        insert: "gudongfenleiinsert.do",
        update: "gudongfenleiupdate.do",
        delete: "gudongfenlei_delete.do",
        detail: "gudongfenlei_detail.do",
        create: "gudongfenlei_add.do",
        edit: "gudongfenlei_updt.do",
    },
    gudongxinxi: {
        list: "gudongxinxi_list.do",
        insert: "gudongxinxiinsert.do",
        update: "gudongxinxiupdate.do",
        delete: "gudongxinxi_delete.do",
        detail: "gudongxinxi_detail.do",
        create: "gudongxinxi_add.do",
        edit: "gudongxinxi_updt.do",
        weblist: "gudongxinxilist.do",
        webdetail: "gudongxinxidetail.do",
    },
    lvyouhuodong: {
        list: "lvyouhuodong_list.do",
        insert: "lvyouhuodonginsert.do",
        update: "lvyouhuodongupdate.do",
        delete: "lvyouhuodong_delete.do",
        detail: "lvyouhuodong_detail.do",
        create: "lvyouhuodong_add.do",
        edit: "lvyouhuodong_updt.do",
        weblist: "lvyouhuodonglist.do",
        webdetail: "lvyouhuodongdetail.do",
    },
    huodongbaoming: {
        list: "huodongbaoming_list.do",
        insert: "huodongbaominginsert.do",
        update: "huodongbaomingupdate.do",
        delete: "huodongbaoming_delete.do",
        detail: "huodongbaoming_detail.do",
        create: "huodongbaoming_add.do",
        edit: "huodongbaoming_updt.do",
        listbaomingyonghu: "huodongbaoming_list_baomingyonghu.do",
    },
    shangpinfenlei: {
        list: "shangpinfenlei_list.do",
        insert: "shangpinfenleiinsert.do",
        update: "shangpinfenleiupdate.do",
        delete: "shangpinfenlei_delete.do",
        detail: "shangpinfenlei_detail.do",
        create: "shangpinfenlei_add.do",
        edit: "shangpinfenlei_updt.do",
    },
    shouhuodizhi: {
        list: "shouhuodizhi_list.do",
        insert: "shouhuodizhiinsert.do",
        update: "shouhuodizhiupdate.do",
        delete: "shouhuodizhi_delete.do",
        detail: "shouhuodizhi_detail.do",
        create: "shouhuodizhi_add.do",
        edit: "shouhuodizhi_updt.do",
        listtianjiaren: "shouhuodizhi_list_tianjiaren.do",
    },
    shangpinxinxi: {
        list: "shangpinxinxi_list.do",
        insert: "shangpinxinxiinsert.do",
        update: "shangpinxinxiupdate.do",
        delete: "shangpinxinxi_delete.do",
        detail: "shangpinxinxi_detail.do",
        create: "shangpinxinxi_add.do",
        edit: "shangpinxinxi_updt.do",
        weblist: "shangpinxinxilist.do",
        webdetail: "shangpinxinxidetail.do",
    },
    gouwuche: {
        list: "gouwuche_list.do",
        insert: "gouwucheinsert.do",
        update: "gouwucheupdate.do",
        delete: "gouwuche_delete.do",
        detail: "gouwuche_detail.do",
        create: "gouwuche_add.do",
        edit: "gouwuche_updt.do",
        listgoumaiyonghu: "gouwuche_list_goumaiyonghu.do",
    },
    dingdanxinxi: {
        list: "dingdanxinxi_list.do",
        insert: "dingdanxinxiinsert.do",
        update: "dingdanxinxiupdate.do",
        delete: "dingdanxinxi_delete.do",
        detail: "dingdanxinxi_detail.do",
        create: "dingdanxinxi_add.do",
        edit: "dingdanxinxi_updt.do",
        listxiadanyonghu: "dingdanxinxi_list_xiadanyonghu.do",
    },
    dingdanxinxidingdanshangpin: {
        list: "dingdanxinxidingdanshangpin_list.do",
        insert: "dingdanxinxidingdanshangpininsert.do",
        update: "dingdanxinxidingdanshangpinupdate.do",
        delete: "dingdanxinxidingdanshangpin_delete.do",
        detail: "dingdanxinxidingdanshangpin_detail.do",
        create: "dingdanxinxidingdanshangpin_add.do",
        edit: "dingdanxinxidingdanshangpin_updt.do",
    },
    dingdanfahuo: {
        list: "dingdanfahuo_list.do",
        insert: "dingdanfahuoinsert.do",
        update: "dingdanfahuoupdate.do",
        delete: "dingdanfahuo_delete.do",
        detail: "dingdanfahuo_detail.do",
        create: "dingdanfahuo_add.do",
        edit: "dingdanfahuo_updt.do",
        listxiadanyonghu: "dingdanfahuo_list_xiadanyonghu.do",
    },
    dingdanqianshou: {
        list: "dingdanqianshou_list.do",
        insert: "dingdanqianshouinsert.do",
        update: "dingdanqianshouupdate.do",
        delete: "dingdanqianshou_delete.do",
        detail: "dingdanqianshou_detail.do",
        create: "dingdanqianshou_add.do",
        edit: "dingdanqianshou_updt.do",
        listqianshouyonghu: "dingdanqianshou_list_qianshouyonghu.do",
    },
    dingdanfahuodingdanshangpin: {
        list: "dingdanfahuodingdanshangpin_list.do",
        insert: "dingdanfahuodingdanshangpininsert.do",
        update: "dingdanfahuodingdanshangpinupdate.do",
        delete: "dingdanfahuodingdanshangpin_delete.do",
        detail: "dingdanfahuodingdanshangpin_detail.do",
        create: "dingdanfahuodingdanshangpin_add.do",
        edit: "dingdanfahuodingdanshangpin_updt.do",
    },
    dingdanqianshoudingdanshangpin: {
        list: "dingdanqianshoudingdanshangpin_list.do",
        insert: "dingdanqianshoudingdanshangpininsert.do",
        update: "dingdanqianshoudingdanshangpinupdate.do",
        delete: "dingdanqianshoudingdanshangpin_delete.do",
        detail: "dingdanqianshoudingdanshangpin_detail.do",
        create: "dingdanqianshoudingdanshangpin_add.do",
        edit: "dingdanqianshoudingdanshangpin_updt.do",
    },
    shangpinzixun: {
        list: "shangpinzixun_list.do",
        insert: "shangpinzixuninsert.do",
        update: "shangpinzixunupdate.do",
        delete: "shangpinzixun_delete.do",
        detail: "shangpinzixun_detail.do",
        create: "shangpinzixun_add.do",
        edit: "shangpinzixun_updt.do",
        listzixunyonghu: "shangpinzixun_list_zixunyonghu.do",
    },
    huodongzixun: {
        list: "huodongzixun_list.do",
        insert: "huodongzixuninsert.do",
        update: "huodongzixunupdate.do",
        delete: "huodongzixun_delete.do",
        detail: "huodongzixun_detail.do",
        create: "huodongzixun_add.do",
        edit: "huodongzixun_updt.do",
        listzixunyonghu: "huodongzixun_list_zixunyonghu.do",
    },
};

export default api;
