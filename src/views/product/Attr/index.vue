<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId"> </CategorySelect>
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" style='margin-bottom:20px'>添加属性</el-button>
      <el-table :data="attrList" border style="width: 100%">
        <el-table-column prop="id" align="center" label="序号" width="80">

        </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150">
        </el-table-column>

        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{ row, $index }">
            <el-tag style="margin:0px 20px" type="success" v-for="(value,index) in row.attrValueList" :key="value.id">{{value.valueName}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="prop" align='center' label="操作" width="200">
          <template slot-scope="{row,$index}">
            <el-button type="warning" icon="el-icon-edit" size='mini'>修改</el-button>
            <el-button type='danger' icon='el-icon-delete' size='mini'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    };
  },
  methods: {
    //自定义事件的回调
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
  },
};
</script>

<style></style>
