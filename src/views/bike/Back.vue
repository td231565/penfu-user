<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-3">
      <div class="w-1-3">
        <router-link :to="`/bike/status/${orderId}`">
          <i class="el-icon-arrow-left text-white fs-5"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white fs-5">歸還</p>
    </header>
    <div class="mt-5 d-flex justify-content-center px-5">
      <div>
        <VueQrcode :value="orderId" :options="qrOptions" />
        <p class="text-center mt-2 mb-0">{{ orderId }}</p>
      </div>
    </div>
    <div class="mt-4 px-5">
      <p class="my-0">請向工作人員展示此頁面，工作人員會協助您完成歸還事宜，待工作人員確認後，即可歸還。</p>
    </div>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  name: 'Back',
  components: { VueQrcode },
  data() {
    return {
      isLoading: false,
      orderId: '',
      qrOptions: { width: 180, margin: 0, scale: 4 }
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
  },
  methods: {
  }
}
</script>

<style>

</style>
