import request from "@/utils/request";

//获取sku列表的接口
export const reqSkuList = (page, limit) =>
  request({
    url: `/admin/product/list/${page}/${limit}`,
    method: "get",
  });
