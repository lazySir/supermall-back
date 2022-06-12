<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId"> </CategorySelect>
    </el-card>

    <el-card>
      <!-- 查看属性 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          @click="addAttr"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column prop="id" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>

          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin: 0px 20px"
                type="success"
                v-for="(value, index) in row.attrValueList"
                :key="value.id"
                >{{ value.valueName }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column prop="prop" align="center" label="操作" width="200">
            <template slot-scope="{ row, $index }">
              <el-button type="warning" icon="el-icon-edit" size="mini"
                >修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性 -->
      <div v-show="!isShowTable">
        <el-form ref="form" :model="attrInfo" :inline="true" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click='addAttrValue' :disabled="!attrInfo.attrName" icon="el-icon-plus">添加属性</el-button>
        <el-button @click="isShowTable = !isShowTable">取消</el-button>

        <el-table
          border
          style="width: 100%; margin: 20px 0px"
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>

          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                size="mini"
                placeholder="请输入属性值名称"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = !isShowTable">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      //分类ID
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接受平台属性的数据
      attrList: [],
      //控制table的显示与隐藏的
      isShowTable: false,
      //收集新增属性|修改属性 使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [], //属性值    因为属性值可以多个 因此用数组 每一个属性值都是一个对象 要attrId,valueName
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //服务器也要区分是几级ID
      },
    };
  },
  methods: {
    //自定义事件的回调获取分类id
    getCategoryId(categoryId) {
      //获取三级id
      this.category1Id = categoryId.category1Id;
      this.category2Id = categoryId.category2Id;
      this.category3Id = categoryId.category3Id;
      //发请求获取attr商品管理
      this.getAttrist();
    },
    //获取平台属性信息
    async getAttrist() {
      //接口分类的id
      const { category1Id, category2Id, category3Id } = this;
      //发送API请求
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    addAttr() {
      this.isShowTable = !this.isShowTable;
    },
    //添加属性值的回调
    addAttrValue(){
      this.attrInfo.attrValueList.push({
        //attrId:是你响应的属性的id，目前而言我们是添加属性的操作 还没有相应属性的id，将由服务器返回
        attrId:undefined,
        //相应的属性值的问题
        valueName:""
        
      })
    }
  },
};
</script>

<style></style>
