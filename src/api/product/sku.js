import request from '@/utils/request'
//获取sku图片的接口
// /admin/product/spuImageList/{spuId}
export const reqSpuImageList =(spuId)=>request({
  url:`/admin/product/spuImageList/${spuId}`,
  method:'get'
})
//获取销售属性列表
// /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList=(spuId)=>request({
  url:`/admin/product/spuSaleAttrList/${spuId}`,
  method:'get'
})
//获取平台属性的数据
// /admin/product/attrInfoList/
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>request({
  url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method:'get'
})