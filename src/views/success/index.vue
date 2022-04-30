<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header>
      <img :src="paymentInfo.imageLink" alt="" class="w-100">
    </header>
    <div class="text-center">
      <p class="fs-2 my-2">付款成功</p>
      <i class="el-icon-circle-check text-blue fw-bold" style="font-size: 88px;"></i>
    </div>
    <div class="mt-3 px-4">
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>交易序號</span>
        <span class="fw-bold">{{ paymentInfo.uuid }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>商品名稱</span>
        <span class="fw-bold">{{ paymentInfo.title }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>單價</span>
        <span class="fw-bold">$ {{ paymentInfo.price }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>數量</span>
        <span class="fw-bold">{{ paymentInfo.number }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center text-blue" style="height: 34px;">
        <span>總金額</span>
        <span class="fw-bold">$ {{ paymentInfo.totalPrice }}</span>
      </div>
    </div>
    <div class="mt-4 px-4 pb-3 d-flex justify-content-center">
      <!-- <button class="btn me-4 w-35 rounded-3">列印</button> -->
      <button class="btn w-35 rounded-3" @click="gotoProfileFolder">確認</button>
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
