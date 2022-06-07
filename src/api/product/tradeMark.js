//这个模块主要获取的是品牌管理的数据的模块
import request from "@/utils/request";

//获取品牌信息
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });

  //添加品牌信息
  // /admin/product/baseTrademark/save post  参数：品牌名称 品牌logo
  //切记：对于新增的品牌，给服务器传递数据，不需要传递ID，ID是由服务器生成

  //更新品牌信息
  // /admin/product/baseTrademark/update put 参数三个参数  id、品牌名称、品牌LOGO
  //切记：对于修改某一个品牌的操作，前端携带的参数需要带上id，你需要告诉服务器修改的是哪一个品牌

  export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    if(tradeMark.id){
      //如果带给服务器数据携带ID 代表---》修改
      return request({
        url:"/admin/product/baseTrademark/update",
        data:tradeMark,
        method:"put",
      })
    }else{
      //新增产品
      return request({
        url:'/admin/product/baseTrademark/save',
        data:tradeMark,
        method:'post'
      })
    }
  }

  //删除品牌的接口
  // /admin/product/baseTrademark/remove/{id} delete

  export const reqDeleteTradeMark = (id)=>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete'
  })