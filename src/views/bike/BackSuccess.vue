<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-3">
      <div class="w-1-3">
        <i class="el-icon-close text-white fs-5" @click="closeWindow"></i>
      </div>
      <p class="w-1-3 my-0 text-center text-white fs-5">歸還成功</p>
    </header>
    <div class="text-center">
      <p class="fs-2 my-2">歸還成功</p>
      <i class="el-icon-circle-check text-blue fw-bold" style="font-size: 88px;"></i>
    </div>
    <div class="mt-3 px-4">
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>租借方案</span>
        <span class="fw-bold">{{ bikeInfo.title }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>交易序號</span>
        <span class="fw-bold">{{ bikeInfo.title }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>使用時間</span>
        <span class="fw-bold">$ {{ bikeInfo.price }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>費用</span>
        <span class="fw-bold">{{ bikeInfo.price }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center text-blue">
        <span>已付費用(含押金)</span>
        <span class="fw-bold">$ 1500</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center text-blue">
        <span>退還費用(含押金)</span>
        <span class="fw-bold">$ {{ bikeInfo.price + 1500 }}</span>
      </div>
    </div>
    <div class="mt-4 px-4 pb-3 d-flex justify-content-center">
      <!-- <button class="btn me-4 w-35 rounded-3">列印</button> -->
      <button class="btn w-35 rounded-3 fs-6" @click="closeWindow">確認</button>
    </div>
  </div>
</template>

<script>
import liff from '@line/liff'
import { mapState } from 'vuex'

export default {
  name: 'BackSuccess',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState(['bikeInfo'])
  },
  methods: {
    closeWindow() {
      liff.init({
        liffId: '1657060057-zx3LN0rZ',
        withLoginOnExternalBrowser: true
      }).then(() => {
        liff.closeWindow()
        window.close()
      })
    }
  }
}
</script>

<style>

</style>
