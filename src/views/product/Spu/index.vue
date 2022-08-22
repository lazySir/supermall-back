<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动已经是全局组件 -->
      <CategorySelect :show="!isShowTable" @getCategoryId="getCategoryId">
      </CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部这里是由三部分切换的 -->
      <div>
        <!-- 展示spu列表的结构 -->
        <el-button type="primary"  icon="el-icon-plus">添加SPU</el-button>

        <el-table style="width: 100%;margin-top:10px" border>
          <el-table-column type='index' align='center' label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{row,$index}">
            <!-- 这里的按钮将来用hintButton替换 -->
            <el-button type="success" icon='el-icon-plus' size='mini'></el-button>
            <el-button type="warning" icon='el-cion-edit' size='mini'></el-button>
            <el-button type="info"    icon='el-cion-info' size='mini'></el-button>
            <el-button type="danger"  icon='el-cion-delete'size='mini'></el-button>
          </template>
          </el-table-column>
        </el-table>
        <!-- //分页器 -->
                  <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
        <el-pagination
        style='text-align:center'
          :current-page="6"
          :page-sizes="[3, 5, 10]"
          :page-size="pageSize"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total=23>
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动可操作性
      isShowTable: true,
    };
  },
  methods: {
    //三级联动的自定义事件，可以把子组件的id传递给父组件
    getCategoryId(value) {
      //categoryid:获取几级ID ，level判断是几级id
      const { categoryId, level } = value;
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //获取spu类的列表数据进行展示
        this.getSpuList();
      }
    },
    //获取spu列表数据的方法
    getSpuList() {},
  },
};
</script>

<style></style>
