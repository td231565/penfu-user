<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header>
      <img :src="paymentInfo.imageLink" alt="" class="w-100">
    </header>
    <div class="text-center">
      <p class="fs-2 my-1">已完成訂購申請</p>
      <p class="fs-5 my-2">等待服務人員核准中，您可至會員中心裡的（我的訂單），查詢票卷核發進度。</p>
      <i class="el-icon-circle-check text-blue fw-bold" style="font-size: 88px;"></i>
    </div>
    <div class="mt-3 px-4">
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>交易序號</span>
        <span class="fw-bold">{{ paymentInfo.uuid }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>商品名稱</span>
        <span class="fw-bold">{{ paymentInfo.title }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>單價</span>
        <span class="fw-bold">$ {{ paymentInfo.price }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>數量</span>
        <span class="fw-bold">{{ paymentInfo.number }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center text-blue">
        <span>總金額</span>
        <span class="fw-bold">$ {{ paymentInfo.totalPrice }}</span>
      </div>
    </div>
    <div class="mt-5 px-4 pt-3 pb-3 d-flex justify-content-center">
      <!-- <button class="btn me-4 w-35 rounded-3">列印</button> -->
      <button class="btn w-45 rounded-3 py-3 fs-6" @click="gotoProfileFolder">確認</button>
    </div>
  </div>
</template>

<script>
import liff from '@line/liff'
import { mapState } from 'vuex'

export default {
  name: 'Success',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState(['paymentInfo'])
  },
  methods: {
    closeWindow() {
      liff.closeWindow()
    },
    gotoProfileFolder() {
      this.$router.push({ name: 'ProfileFolder' })
    }
  }
}
</script>

<style>

</style>
