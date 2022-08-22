<template>
  <a :title="title" style="margin: 10px">
    <el-button v-bind="$attrs" v-on="$listeners">{{name}}</el-button>
  </a>
</template>

<script>
export default {
  name: "HintButton",
  props: ["title",'name'],
};
</script>

<style scoped></style>
