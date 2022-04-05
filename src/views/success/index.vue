<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header>
      <img src="http://placekitten.com/500/300" alt="" class="w-100">
    </header>
    <div class="text-center">
      <p class="fs-2 my-2">付款成功</p>
      <i class="el-icon-circle-check text-blue fw-bold" style="font-size: 88px;"></i>
    </div>
    <div class="mt-3 px-4">
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>交易序號</span>
        <span class="fw-bold">{{ paymentData.sid }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>商品名稱</span>
        <span class="fw-bold">{{ paymentData.title }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>單價</span>
        <span class="fw-bold">$ {{ paymentData.price }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>數量</span>
        <span class="fw-bold">{{ paymentData.amount }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center text-blue" style="height: 34px;">
        <span>總金額</span>
        <span class="fw-bold">$ {{ paymentData.price * paymentData.amount }}</span>
      </div>
    </div>
    <div class="mt-4 px-4 d-flex justify-content-center">
      <button class="btn me-4 w-35 rounded-3">列印</button>
      <button class="btn w-35 rounded-3">確認</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  data() {
    return {
      isLoading: false,
      paymentData: {
        title: '商品名稱',
        price: 399,
        amount: 2,
        sid: 'S20221000376'
      }
    }
  }
}
</script>

<style>

</style>
