<template>
  <el-form ref="form" label-width="80px" :model="spu">
    <el-form-item label="SPU名称">
      <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="spu.tmId" placeholder="请选择品牌">
        <el-option
          v-for="(tm, index) in tradeMarkList"
          :key="tm.id"
          :label="tm.tmName"
          :value="tm.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        v-model="spu.description"
        rows="4"
        type="textarea"
        placeholder="SPU描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- 上传图片 
      action是图片上传的地址 
      list-type：文件列表的类型 
      on-preview：图片预览的时候会触发， 图片的预览功能
      on-remove：当删除图片的时候会触发
      file-list 照片墙需要展示的数据【数组：需要有name和url】
      -->
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
        :on-success="handlerSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select
        v-model="attrIdAndAttrName"
        :placeholder="`还有${unSelectSaleAttr.length}个未选择`"
      >
        <el-option
          v-for="(unselect, index) in unSelectSaleAttr"
          :key="unselect.id"
          :label="unselect.name"
          :value="`${unselect.id}:${unselect.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        style="margin-left: 5px"
        icon="el-icon-plus"
        :disabled="!attrIdAndAttrName"
        @click="addSaleAttr"
        >添加销售属性</el-button
      >
      <!-- 展示的是当前spu属于自己的销售属性 -->
      <el-table :data="spu.spuSaleAttrList" style="width: 100%" border>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="80px"
        ></el-table-column>
        <el-table-column
          prop="saleAttrName"
          label="属性名"
          width="width"
        ></el-table-column>
        <el-table-column prop="prop" label="属性值名称列表" width="width">
          <template slot-scope="{ row, $index }">
            <el-tag
              :key="tag.id"
              v-for="(tag,index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(row,index)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <!-- 底下的结构可以当作span和input切换 -->
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm(row)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="addSaleAttrValue(row)"
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button type="danger" icon="el-icon-delete" size="mini"
              @click='spu.spuSaleAttrList.splice($index,1)'
              >删除</el-button
            >
          </template>
        </el-table-column>
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
        tmId: 0,

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
          //     baseSaleattrIdAndAttrName: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleattrIdAndAttrName: 0,
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
      attrIdAndAttrName: "", //收集未选择的销售属性的id
    };
  },
  methods: {
    //照片墙删除的回调
    handleRemove(file, fileList) {
      //file参数代表的是删除的那个照片
      //fileList删除完成后照片墙剩余的其他图片 需要收集起来
      //收集照片墙图片的数据
      //对于已有的图片【照片墙中显示的图片】 有name和url字段
      //而对于服务器而言 是不需要name和url字段的，将来对于已有的图片数据在提交给服务器的时候需要处理
      this.spuImageList = fileList;
    },
    //照片墙图片预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //照片墙添加照片成功的回调
    handlerSuccess(response, file, fileList) {
      //file :上传的那张图片
      //fileList：照片墙的照片
      //response：服务器返回的信息
      this.spuImageList = fileList;
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
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        //把整理好的数据复制给
        this.spuImageList = listArr;
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //添加新的销售属性
    addSaleAttr() {
      //已经收集需要添加的销售属性
      //把收集到的销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //向SPU对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //清空销售属性
      this.attrIdAndAttrName = "";
    },
    //添加销售属性值的回调
    addSaleAttrValue(row) {
      //点击销售属性值当中添加销售属性的时候，需要有button变为input，通过当前销售属性的inputVisible控制
      //挂载在销售属性身上的响应式数据inputVisible控制着button和input的切换
      this.$set(row, "inputVisible", true);
      //响应式数据inputValue收集新增的销售属性值
      this.$set(row, "inputValue", "");
    },
    //当el-tag里的input失去焦点事件触发
    handleInputConfirm(row) {
      //修改inputVisible为false 就是显示input了
      row.inputVisible = false;
      //将新增的销售属性值扔进spuSaleAttrValueList     需要有baseSaleAttrId（销售属性的id） saleAttrName(inputValue)
      //1.解构出想要的数据
      const { baseSaleAttrId, inputValue } = row;
      //1.1新增的销售属性值不能为空
      if (inputValue.trim() == "") {
        this.$message({ type: "warning", message: "新增的销售属性值不能为空" });
        return;
      }
      //1.2新增的属性值不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      //重复了返回false 没重复返回true
      if (!result) {
        this.$message({ type: "warning", message: "新增的属性值不能重复" });
        return;
      }
      //2.将其转化为需要的格式
      let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      //3.新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
    },
    //当tag标签里的button点击叉号的时候的回调
    handleClose(row,index){
      row.spuSaleAttrValueList.splice(index,1)
    }
  },
  computed: {
    //计算出未选择的销售属性
    unSelectSaleAttr() {
      //整个平台的销售属性一共三个 ---saleAttrList  比如 尺寸 颜色 版本
      //当前Spu拥有属于自己的销售属性 spu.spuSaleAttrList   比如颜色
      let result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
