<template>
  <div style="padding: 10px 20px">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in list" :key="index" class="icons">
        <div >
          <img :src="item.src" alt="">
          <span>{{item.name}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "icons",
    props: {
      list: Array
    }
  }
</script>

<style scoped>
  .icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }

  .icons div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid;
    overflow: hidden;
    box-shadow: 0 6px 10px 0 #dddddd;
  }

  .icons img {
    width: 155px;
    height: 60px;
    margin-bottom: 5px;
  }

  .icons span {
    font-size: 14px;
    padding: 8px 0;
  }
</style>
