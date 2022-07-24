import request from "@/utils/request";

//获取一级分类数据接口
// /admin/product/getCategory1 get
export const reqCategory1List = () =>
  request({
    url: "/admin/product/getCategory1",
    method: "get",
  });

//获取二级分类数据接口
// /admin/product/getCategory2/{category1Id} get
export const reqCategory2List = (category1Id) =>
  request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });

//获取三级分类数据接口
// /admin/product/getCategory3/{category2Id} get
export const reqCategory3List = (category2Id) =>
  request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });

//获取平台属性的接口
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

//添加属性与属性值的接口
// post /admin/product/saveAttrInfo
// {
//   "attrName": "string", 属性名
//   "attrValueList": [     因为 属性值 可以多个 因此需要的是数组
//     {
//       "attrId": 0,       属性的id
//
//       "valueName": "string" 属性值
//     }
//   ],
//   "categoryId": 0,    category3ID
//   "categoryLevel": 0,  3
// }
export const reqAddOrUpdateAttr = (data) =>
  request({
    url: `/admin/product/saveAttrInfo `,
    method: "post",
    data,
  });
