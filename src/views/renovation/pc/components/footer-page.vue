<template>
    <div class="page-footer">
      <div>
        <a href="">企业服务</a>
        <a href="">企业服务</a>
        <a href="">企业服务</a>
        <a href="">企业服务</a>
        <a href="">企业服务</a>
      </div>
      <div>
        @ 2021 liaokong
      </div>
    </div>
</template>

<script>
    export default {
        name: "footer-page.vue"
    }
</script>

<style scoped>
.page-footer{
  padding: 36px 0;
  background: #1c1f21;
}
  .page-footer div{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cccccc;
    font-size: 13px;
  }

  .page-footer a{
    padding: 4px 5px;
  }
</style>
