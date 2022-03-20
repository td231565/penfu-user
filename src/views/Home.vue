<template>
  <div class="home" style="">
    <el-button class="btn">
      <p>景點推薦</p>
      <p>Sightseeing</p>
    </el-button>
    <el-button class="btn">
      <p>熱門商品</p>
      <p>Product</p>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/image/home_bg.jpg');
  background-size: cover;
}
</style>
