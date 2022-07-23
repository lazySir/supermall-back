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
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
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
        <el-button
          type="primary"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          icon="el-icon-plus"
          >添加属性值</el-button
        >

        <el-table
          border
          style="width: 100%; margin: 20px 0px"
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>

          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的结构需要span和input来回切换 -->
              <el-input
                v-if="row.flag"
                @blur="tolook(row)"
                @keyup.native.enter="tolook(row)"
                v-model="row.valueName"
                size="mini"
                placeholder="请输入属性值名称"
              ></el-input>

              <span style="display:block" @click="row.flag = true" v-else>{{ row.valueName }}</span>
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
//按需引入lodashh当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
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
      isShowTable: true,
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
    //添加属性的回调
    addAttr() {
      //切换页面显示
      this.isShowTable = !this.isShowTable;
      //清除数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [], //属性值    因为属性值可以多个 因此用数组 每一个属性值都是一个对象 要attrId,valueName
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3, //服务器也要区分是几级ID
      };
    },

    //添加属性值的回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        //attrId:是你响应的属性的id，目前而言我们是添加属性的操作 还没有相应属性的id，将由服务器返回
        attrId: this.attrInfo.id, //对于修改某一个属性的时候，可以在已有的属性基础之上新增新的属性值*新增属性值的时候，需要把已有的id传入
        //相应的属性值的问题
        valueName: "",
        //添加属性值的flag  input和span切换
        flag: true,
      });
    },
    //修改某一个属性
    updateAttr(row) {
      //isShowTable变为false
      this.isShowTable = false;
      //将选中的属性值赋值给attrInfo
      //由于数据结构当中存在对象里面套数组，数组里面有对象，因此需要使用深拷贝解决问题
      this.attrInfo = cloneDeep(row);
      //在修改某一个属性的时候，将相应的属性元素添加上flag这个标记
      this.attrInfo.attrValueList.forEach(item=>{
        //这样书写也可以给属性值添加flag，但是不是响应式的
        // item.flag=false
        //这时候需要用$set添加flag
        //第一个参数 对象 第二个参数 属性值名称 第三个参数 属性值
        this.$set(item,'flag',false)
      })
    },
    //添加属性值的 失去焦点的事件---切换为查看模式 ---展示span
    tolook(row){
      //如果属性值为空那么不能作为新的属性值 需要给用户提示 让他输入一个其他的属性值
      if(row.valueName.trim()==''){
        this.$message({
          message:'请输入一个正常的属性值！',
          type:"warning"
          })
        return
      }
      //新增的属性值不能与已有的属性值重复
     let isRepat= this.attrInfo.attrValueList.some(item=>{
        //需要将row从数组里面将重复的去除
        if(row!=item){
          //row是最新新增的属性值 是数组的最后一个属性值 判断的时候需要把已有的数组当中新增的属性值去重
          return row.valueName==item.valueName
        }
      })
      if(isRepat) return this.$message({message:"输入的属性值重复！",
      type:'error'})
      //row 是用户添加的最新的属性值
      //让编辑模式变为查看模式 让input消失显示span
      row.flag=false
      this.$message({message:'添加属性值成功！',
      type:'success'})

    }
  },
};
</script>

<style></style>
