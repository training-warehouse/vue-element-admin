<template>
  <div>
    <el-carousel height="150px">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <img :src="item.src" alt="" style="width: 100%;height: 150px">
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

</style>
