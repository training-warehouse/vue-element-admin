<template>
  <div style="padding: 20px">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="18" class="nav-bar-left">
        <span class="logo">LOGO</span>
        <span class="nav-bar-item"
              v-for="(item,index) in list" :key="index">{{item.title}}</span>
      </el-col>
      <el-col :span="6" class="nav-bar-right">
        <i class="el-icon-search"></i>
        <i class="el-icon-tickets"></i>
        <i class="el-icon-shopping-bag-2"></i>
        <img
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          alt="">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "nav-bar",
    data() {
      return {
        list: [{
          title: '首页'
        }, {
          title: '分类1'
        }, {
          title: '分类2'
        }]
      }
    }
  }
</script>

<style scoped>
  .nav-bar-left {
    display: flex;
    align-items: center;
  }

  .nav-bar-left .logo {
    background-color: #ebeef5;
    padding: 10px 30px;
    border-radius: 2px;
  }

  .nav-bar-left .nav-bar-item {
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    color: #666666;
  }

  .nav-bar-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .nav-bar-right i {
    padding: 10px;
    font-size: 20px;
    color: #666666;
    cursor: pointer;
  }

  .nav-bar-right img {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
</style>
