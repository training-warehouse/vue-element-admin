<template>
  <div class="conpon">
    <div v-for="(item,index) in list" :key="index">
      <div class="conpon-desc">
        <span>￥{{item.price}}</span>
        <span>{{item.condition}}</span>
      </div>
      <div class="conpon-action">领取</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "coupon",
    props: {
      list: Array
    }
  }
</script>

<style scoped>
  .conpon {
    width: 100%;
    overflow-x: auto;
    padding: 10px;
    display: flex;
  }

  .conpon > div {
    display: flex;
    color: #ffffff;
    min-width: 150px;
  }

  .conpon-desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #d39e00;
    padding: 10px;
  }

  .conpon-desc span:last-child {
    font-size: 12px;
    margin-top: 5px;
  }

  .conpon-action {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffc107;
    padding: 0 10px;
    font-size: 14px;
  }
</style>
