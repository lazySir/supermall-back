<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="’el-icon-plus">添加</el-button>
    <!-- 表格组件 

    el-table : 一个表格  
    border属性 代表有表格有边框

    el-table-column是列 有几个代表有几列
    label：显示的标题
    width：对应列的宽度
    align：标题的对齐方式
    -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center">
      </el-table-column>

      <el-table-column prop="prop" label="品牌名字" width="width">
      </el-table-column>

      <el-table-column prop="prop" label="品牌LOGO" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>
    <!-- 分页器 
    current-page:当前第几页，
    total:数据的总条数，
    page-size：每一页展示的条数
    layout:可以调整显示顺序
    -->
    <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    <el-pagination
      style="margin-top: 20px; textAlign: center"
      :current-page="6"
      :total="99"
      :page-size="3"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->,sizes,total "
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
};
</script>

<style></style>
