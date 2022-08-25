import request from "@/utils/request";

//获取SPU列表
// /admin/product/{page}/{limit} get page limit category3Id
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

//获取品牌的数据需要发请求的 /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList = () =>
  request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: "get",
  });
//获取销售属性 /admin/product/baseSaleAttrList ---整个平台销售属性一共三个

export const reqBaseSaleAttrList = () =>
  request({
    url: `/admin/product/baseSaleAttrList`,
    method: "get",
  });

//获取某一个SPU信息   /admin/product/getSpuById/${id} get
export const reqSpu = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "get",
  });


//添加spu时需要给服务器携带的参数
// spu: {
//   category3Id: 0,
//   tmId: 0,
//   description: "string",
//   spuName: "string",
//   spuImageList: [
//     {
//       id: 0,
//       imgName: "string",
//       imgUrl: "string",
//       spuId: 0,
//     },
//   ],
//   spuSaleAttrList: [
//     {
//       baseSaleAttrId: 0,
//       id: 0,
//       saleAttrName: "string",
//       spuId: 0,
//       spuSaleAttrValueList: [
//         {
//           baseSaleAttrId: 0,
//           id: 0,
//           isChecked: "string",
//           saleAttrName: "string",
//           saleAttrValueName: "string",
//           spuId: 0,
//         },
//       ],
//     },
//   ],
// },

//修改和添加SPU  携带给服务器参数的数据大致一样 区别就是是否携带id
export const reqAddOrUpdateSpu = (spuInfo) => {
  //携带的参数有ID---修改spu
  if (spuInfo.id) {
    return request({
      url: `/admin/product/updateSpuInfo`,
      method: "post",
      data: spuInfo,
    });
  } else {
    //携带的参数不带有ID ---添加spu
    return request({
      url: `/admin/product/saveSpuInfo`,
      method: "post",
      data: spuInfo,
    });
  }
};


//删除某一个spu
//admin/product/deleteSpu/{spuId}
export const reqDeleteSpu=(spuId)=>request({
  url:`/admin/product/deleteSpu/${spuId}`,
  method:'delete'
})



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

//添加sku
// /admin/product/saveSkuInfo post
export const reqAddSku=(skuInfo)=>request({
  url:`/admin/product/saveSkuInfo`,
  method:'post',
  data:skuInfo
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