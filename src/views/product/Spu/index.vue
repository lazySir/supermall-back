<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动已经是全局组件 -->
      <CategorySelect :show="!isShowTable" @getCategoryId="getCategoryId">
      </CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部这里是由三部分切换的 -->
      <div v-show="scene == 0">
        <!-- 展示spu列表的结构 -->
        <el-button @click='addSpu' :disabled="!category3Id" type="primary" icon="el-icon-plus">添加SPU</el-button>

        <el-table :data="records" style="width: 100%; margin-top: 10px" border>
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加spu"
                name="添加"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                name="修改"
                @click='updateSpu(row)'
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                name="详情"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
                name="删除"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- //分页器 -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <spu-form @changeScene='changeScene' v-show="scene == 1" ref='spu'>添加SPU|修改SPU</spu-form>
      <sku-form v-show="scene == 2">添加SKU</sku-form>
    </el-card>
  </div>
</template>

<script>
//引入子组件
import SkuForm from "./SkuForm"
import SpuForm from "./SpuForm"

export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动可操作性
      isShowTable: true,
      page: 1,
      limit: 3,
      records: [], //存储spu列表的数据
      total: 0,
      scene: 0, //0代表展示spu列表数据 1 添加SPU|修改SPU 2 添加SKU
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
    async getSpuList() {
      const { limit, page, category3Id } = this;
      //携带三个参数 page limit category3Id
      let results = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (results.code == 200) {
        this.records = results.data.records;
        this.total = results.data.total;
      }
    },
    //点击分页器的页数：当页数发生改变时
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    //当分页器的pageSize发生改变时的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //添加spu按钮的回调
    addSpu(){
      this.scene=1;
    },
    //修改某一个spu按钮的回调
    updateSpu(row){
      this.scene=1
      //获取子组件spuForm  父访问子  去访问子的方法
      this.$refs.spu.initSpudata(row)
      
    },
    //自定义事件的回调：SpuForm
    changeScene(scene){
      this.scene=scene
    }
  },
  components:{
    SpuForm,
    SkuForm
  }
};
</script>

<style></style>
