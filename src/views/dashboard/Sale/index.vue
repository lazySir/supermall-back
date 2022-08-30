<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <!-- v-model="value1" -->
        <el-date-picker
          class="date"
          size="mini"
          type="monthrange"
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <el-row :gutter="10">
        <!-- 内容左侧 -->
        <el-col :span="18">
          <div class="charts" ref="charts"></div>
        </el-col>
        <!-- 内容右侧 -->
        <el-col :span="6" class="right">
          <h3>门店销售额排名</h3>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span>麦当劳</span>
              <span class="rvalue">426268</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span>肯德基</span>
              <span class="rvalue">325341</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>星巴克</span>
              <span class="rvalue">334234</span>
            </li>
            <li class="lindex">
              <span>4</span>
              <span>汉堡王</span>
              <span class="rvalue">223425</span>
            </li>
            <li class="lindex">
              <span>5</span>
              <span>韩式炸鸡</span>
              <span class="rvalue">212424</span>
            </li>
            <li class="lindex">
              <span >6</span>
              <span>烤盘</span>
              <span class="rvalue">123456</span>
            </li>
            <li class="lindex">
              <span >7</span>
              <span>必胜客</span>
              <span class="rvalue">99123</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Sale",
  data() {
    return {
      activeName: "销售额",
    };
  },
  mounted() {
    let mycharts = echarts.init(this.$refs.charts);
    //配置数据
    mycharts.setOption({
      title: {
        text: "销售额趋势",
      },
      xAxis: {
        type: "category",
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 150, 262, 142, 125, 44],
          type: "bar",
          barWidth: "60%",
          name: "Direct",
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
    });
  },
};
</script>

<style scoped>
/* tab：去掉下划线 */
::v-deep .el-card__header {
  border-bottom: none;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.clearfix {
  position: relative;
}
.date {
  width: 200px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 10px;
}
.charts {
  height: 300px;
  width: 100%;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
.rindex {
  width: 20px;
  height: 20px;
  float: left;
  border-radius: 50%;
  color: white;
  text-align: center;
  background: black;
}
.rvalue {
  float: right;
}
.lindex {
  margin-left: 5px;
}
</style>
