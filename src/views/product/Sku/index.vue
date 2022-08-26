<template>
  <div>
    <el-table style="width: 100%" :data="records" border>
      <el-table-column
        type="index"
        align="center"
        width="80"
        prop="prop"
        label="序号"
      >
      </el-table-column>
      <el-table-column width="width" prop="skuName" label="名称">
      </el-table-column>
      <el-table-column width="width" prop="skuDesc" label="描述">
      </el-table-column>
      <el-table-column width="110" prop="prop" label="默认图片">
        <template slot-scope="{ row, $index }">
          <img
            style="width: 80px; height: 80px"
            :src="row.skuDefaultImg"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column width="80" prop="weight" label="重量(kg)">
      </el-table-column>
      <el-table-column width="80" prop="price" label="价格(元)">
      </el-table-column>
      <el-table-column width="width" prop="prop" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            @click="sale(row)"
            type="success"
            title="上架"
            icon="el-icon-top"
            size="mini"
            v-if="row.isSale == 0"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-bottom"
            size="mini"
            title="下架"
            @click="cancel(row)"
            v-else
          ></el-button>

          <el-button
            type="primary"
            @click="edit(row)"
            icon="el-icon-edit"
            size="mini"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            @click="getSkuInfo(row)"
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer size="50%" :show-close="false" :visible.sync="drawer">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            style="margin-right: 10px"
            v-for="(attr, index) in skuInfo.skuAttrValueList"
            :key="attr.id"
            type="success"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16"
          ><el-carousel height="500px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img style='width:100%' :src="item.imgUrl" alt="">
            </el-carousel-item>
          </el-carousel></el-col
        >
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 10, //代表展示多少条数据
      records: [], //存放sku列表数据
      total: 0, //存储分页器一共有多少条
      skuInfo: {}, //存储sku详情数据
      drawer: false, //控制抽屉的显示与隐藏
    };
  },
  methods: {
    //获取sku列表的方法
    async getSkuList() {
      //解构出参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    //切换页数
    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList();
    },
    //切换显示条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    //上架
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功！" });
      }
    },
    //下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功！" });
      }
    },
    //edit
    edit(row) {
      this.$message({ type: "info", message: "正在开发中！" });
    },
    //获取SKU详情的方法
    async getSkuInfo(sku) {
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
        //将抽屉打开
        this.drawer = true;
      }
    },
  },
  //组件挂载完毕
  mounted() {
    //获取sku列表
    this.getSkuList();
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  font-weight: bold;
}
.el-col {
  margin: 10px 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 深度选择器 */
>>>.el-carousel__button{
  width:10px;
  height:10px;
  background:red;
  border-radius:50%;
}
</style>
