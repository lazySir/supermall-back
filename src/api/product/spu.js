import request from "@/utils/request";

//获取SPU列表
// /admin/product/{page}/{limit} get page limit category3Id
export const reqSpuList= (page,limit,category3Id)=>request({
  url:`/admin/product/${page}/${limit}`,
  method:'get',
  params:{category3Id}
})

//获取品牌的数据需要发请求的 /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList =()=>request({
  url:`/admin/product/baseTrademark/getTrademarkList`,
  method:'get'
})
//获取销售属性 /admin/product/baseSaleAttrList ---整个平台销售属性一共三个

export const reqBaseSaleAttrList=()=>request({
  url:`/admin/product/baseSaleAttrList`,
  method:'get'
})

//获取某一个SPU信息   /admin/product/getSpuById/${id} get
export const reqSpu =(spuId)=>request({
  url:`/admin/product/getSpuById/${spuId}`,
  method:'get'
})
//获取SPU图片 /admin/product/spuImageList/ get

export const reqSpuImageList =(spuId)=>request({
  url:`/admin/product/spuImageList/${spuId}`,
  method:"get"
})

