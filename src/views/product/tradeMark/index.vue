<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 表格组件 

    el-table : 一个表格  
    border属性 代表有表格有边框
    data:要展示的数据  要是个数组类型

    el-table-column是列 有几个代表有几列
    label：显示的标题
    width：对应列的宽度
    align：标题的对齐方式
    type:序号 为index
    prop：对应列内容的字段
    -->
    <el-table  :data=list style="width: 100%" border>
      <el-table-column prop="prop" type='index' label="序号" width="80px" align="center">
      </el-table-column>

      <el-table-column prop="tmName" label="品牌名字" width="width">
      </el-table-column>

      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!-- 图片得用到作用域插槽 -->
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="height:100px;width:100px">
        </template>
      </el-table-column>
      
      <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{row,$index}">
            <el-button type="warning" icon='el-icon-edit' size='mini'>修改</el-button></el-button>
            <el-button type="primary" icon='el-icon-delete' size="mini">删除</el-button>
          </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 
    current-page:当前第几页，
    total:数据的总条数，
    page-size：每一页展示的条数
    page-sizes：可以设置每一个展示多少条数据
    layout:可以调整显示顺序 分页器布局
    -->
    <!-- @size-change="handleSizeChange"
  @current-change="handleCurrentChange" -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :total="total"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      @current-change="handleCurrentChange"  
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,->,sizes,total "
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      //当前第几页
      page: 1,
      //当前页数的展示条数
      limit: 3,
      //总共数据的条数
      total:0,
      //列表展示的数据
      list:[]
    };
  },
  methods: {
    //获取品牌列表的数据
   async getPageList() {
      //解构出参数
      const { page, limit } = this;
      //初始化了两个参数 page limit  因为这个接口需要当前页数和显示条数
      let res = await this.$API.trademark.reqTradeMarkList(page, limit);
        if(res.code==200){
          //总条数与展示的数据
          this.total=res.data.total,
          this.list=res.data.records
        }
    },

  handleCurrentChange(pager){
    //修改参数page
    this.page=pager;
    this.getPageList()
  },
  //当分页器每一页需要展示的条数的个数发生变化时会触发
  handleSizeChange(limit){
    this.limit = limit;
    this.getPageList()
  }
 
 },

  mounted() {
    this.getPageList();
  },
};
</script>

<style></style>
