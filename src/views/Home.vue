<template>
  <div class="home" style="">
    <!-- <el-button class="btn" @click="$router.push({name: 'AttractionList'})">
      <p>景點推薦</p>
      <p>Sightseeing</p>
    </el-button>
    <el-button class="btn" @click="$router.push({name: 'ProductList'})">
      <p>熱門商品</p>
      <p>Product</p>
    </el-button>
    <el-button class="btn" @click="logout">log out</el-button> -->
  </div>
</template>

<script>
import liff from '@line/liff'

export default {
  name: 'Home',
  methods: {
    logout() {
      liff.logout()
    }
  }
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
