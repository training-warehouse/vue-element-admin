<template>
  <div style="padding: 10px 20px">
    <div class="component-no-data" v-if="!list.length">
      【轮播图模块】请点击关联数据
    </div>
    <el-carousel v-else height="340px">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <img :src="item.src" alt="" style="width: 100%;height: 340px">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "swiper",
    props: {
      list: Array
    }
  }
</script>

<style scoped>
  .component-no-data {
    border: 1px solid #cccccc;
    background-color: #eeeeee;
    color: #cccccc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
  }
</style>
