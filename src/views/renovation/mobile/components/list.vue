<template>
  <div>
    <div style="height: 5px;background-color: #eeeeee"></div>
    <el-card shadow="never">
      <div slot="header" class="list-card-header">
        <span>{{title}}</span>
        <el-button v-if="showMore" type="text" class="list-card-more">查看全部
        </el-button>
      </div>

      <div class="component-no-data" v-if="!list.length">
        【列表模块】请点击关联数据
      </div>
      <el-row v-else :gutter="20">
        <el-col v-for="(item,index) in list" :key="index"
                :span="listType === 'one' ? 24 : 12"
                :style="listType === 'one'? 'display: flex;':''"
                style="margin-bottom: 10px">
          <img :src="item.cover" alt="" style="width: 130px;margin-right: 10px">
          <div>
            <div class="list-title">{{item.title}}</div>
            <div class="list-desc">{{item.try}}</div>
            <div>
              <span>￥{{item.price}}</span>
              <span>￥{{item.t_price}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "list",
    props: {
      title: {
        type: String,
        default: ''
      },
      showMore: {
        type: Boolean,
        default: true
      },
      list: Array,
      listType: {
        type: String,
        default: 'one'
      }
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

  .list-card-header {
    border-bottom: 0;
  }

  .list-card-more {
    float: right;
    padding: 0;
    color: #999999;
  }

  .list-title {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 5px 0;
  }

  .list-desc {
    font-size: 12px;
    color: #999999;
    margin: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-price {
    display: flex;
    align-items: flex-end;
  }

  .list-price span:first-child {
    color: red;
  }

  .list-price span:last-child {
    color: #888888;
    margin-left: 5px;
    font-size: 10px;
  }
</style>
