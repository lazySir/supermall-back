<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动已经是全局组件 -->
      <CategorySelect @getCategoryId="getCategoryId"> </CategorySelect>
    </el-card>
    <el-card> </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  methods: {
    //三级联动的自定义事件，可以把子组件的id传递给父组件
    getCategoryId(value) {
      //categoryid:获取几级ID ，level判断是几级id
    },
  },
};
</script>

<style></style>
