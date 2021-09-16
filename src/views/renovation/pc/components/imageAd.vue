<template>
  <div>
    <div class="component-no-data" v-if="!list.length">
      【图片广告模块】请点击关联数据
    </div>
    <div v-else v-for="(item,index) in list" :key="index">
      <img :src="item.src" alt="" style="width: 100%;height: 100px">
    </div>
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
