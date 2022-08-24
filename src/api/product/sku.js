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




//skuForm数据的展示与收集
// {
//   "category3Id":0,
//   "createTime":
//   "id":0,
//   "isSale":0,
//   "price":0,
//   "skuAttrValueList":[
//     {
//       "attrId":0,
//       "attrName":"string",
//       "id":0,
//       "skuId":0,
//       "valueId":0,
//       "valueName":"string"
//     }
//   ],
//   "skuDefaultImg":'string',
//   "skuDesc":'string',
//   "skuImageList":[
//     {
//       "id":0,
//       "imgName":"string",
//       "imgUrl":"string",
//       "isDeFault":"string",
//       "skuId":0,
//       "spuImgId":0
//     }
//   ],
//   "skuName":"string",
//   "skuSaleAttrValueList":[{
//     "id":0,
//     "saleAttrId":0,
//     "saleAttrName":0,
//     "saleAttrValueName":'string',
//     "skuId":0,
//     "spuId":0
//   }],
//   "spuId":0,
//   "tmId":0,
//   "weight":"string"
// }