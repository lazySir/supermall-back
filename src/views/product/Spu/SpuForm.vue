<template>
  <el-form ref="form" label-width="80px" :model="spu">
    <el-form-item label="SPU名称">
      <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model='spu.tmId' placeholder="请选择品牌">
        <el-option v-for='(tm,index) in tradeMarkList' :key="tm.id" :label="tm.tmName" :value="tm.id"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  label="SPU描述">
      <el-input v-model='spu.description' rows="4" type="textarea" placeholder="SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- 上传图片 action是图片上传的地址 list-type：文件列表的类型 on-preview：图片预览的时候会触发，on-remove：当删除图片的时候会触发
      file-list
      -->
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select value="" placeholder="还有3未选择">
        <el-option label="label" value="value"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
    </el-form-item>
    <el-form-item>
      <el-table style="width: 100%" border>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="80px"
        ></el-table-column>
        <el-table-column
          prop="prop"
          label="属性名"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="prop"
          label="属性值名称列表"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="prop"
          label="操作"
          width="width"
        ></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="$emit('changeScene', 0)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      //照片墙
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        //三级分类的id
        category3Id: 0,
        //描述
        description: "",
        //spu的名称
        spuName: "",
        //平台的id
        tmId:0,
        //收集spu图片的信息
        spuImageList: [
        //   {
        //     id: 0,
        //     imgName: "string",
        //     imgUrl: "string",
        //     spuId: 0,
        //   },
        ],
        //平台属性与属性值的收集
        spuSaleAttrList: [
        //   {
        //     baseSaleAttrId: 0,
        //     id: 0,
        //     saleAttrName: "string",
        //     spuId: 0,
        //     spuSaleAttrValueList: [
        //       {
        //         baseSaleAttrId: 0,
        //         id: 0,
        //         isChecked: "string",
        //         saleAttrName: "string",
        //         saleAttrValueName: "string",
        //         spuId: 0,
        //       },
        //     ],
        //   },
        ],
      }, //存储SPU信息属性 ,初始化的时候是个空对象 在修改的时候会返回spu信息（对象），在修改的时候可以利用服务器返回的这个对象提交给服务器
      //但是在添加spu的时候，并没有像服务器发送请求，那么数据收集到哪【spu】，收集的时候
      tradeMarkList: [], //存储的是品牌的信息
      spuImageList: [], //存储spuImage的数据
      saleAttrList: [], //销售属性的数据
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //初始化SpuForm数据
    async initSpudata(row) {
      //获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(row.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(row.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        //由于照片墙显示图片的数据需要数组，数组里面的元素须有name和url字段
        listArr.forEach(item => {
          item.name=item.imgName;
          item.url=item.imgUrl
        });
        //把整理好的数据复制给
        this.spuImageList=listArr
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
  },
};
</script>

<style></style>
