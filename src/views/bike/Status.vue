<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <i class="el-icon-close text-white" @click="closeWindow"></i>
      </div>
      <p class="w-1-3 my-0 text-center text-white">租借狀況</p>
    </header>
    <img src="@/assets/image/rent_banner.jpg" alt="" width="100%">
    <div class="mt-3 px-4">
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>租借方案</span>
        <span class="fw-bold">{{ planInfo.title }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>交易序號</span>
        <span class="fw-bold">{{ rentInfo.writeOffCode }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>租借時間</span>
        <span class="fw-bold">{{ showDate(rentInfo.rentTime) }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>已租借時間</span>
        <span class="fw-bold">{{ calculateTimeDiff(rentInfo.rentTime) }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center text-blue" style="height: 34px;">
        <span>費用</span>
        <span class="fw-bold">$ {{ Number(rentInfo.paymentDeposit) + Number(rentInfo.paymentCost) }}</span>
      </div>
    </div>
    <div class="mt-4 px-4 pb-3 d-flex justify-content-center">
      <!-- <button class="btn me-4 w-35 rounded-3">列印</button> -->
      <button class="btn rounded-3" @click="gotoBack">歸還</button>
      <button class="btn rounded-3 ms-4" @click="closeWindow">確認</button>
    </div>
  </div>
</template>

<script>
import liff from '@line/liff'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'BikeStatus',
  data() {
    return {
      isLoading: false,
      rentInfo: {},
      planInfo: {},
      orderId: 0
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
    this.getRentDetail()
  },
  methods: {
    getRentDetail() {
      this.isLoading = true
      const url = `https://pengfu-app.herokuapp.com/api/car_order/${this.orderId}`
      axios.get(url).then(res => {
        this.rentInfo = res.data.carOrder
        const planId = this.rentInfo.planID
        this.getPlanDetail(planId)
      }).catch(err => {
        console.log(err)
        this.$message.error('讀取資料失敗')
        this.isLoading = false
      })
    },
    getPlanDetail(planId) {
      this.isLoading = true
      const url = `https://pengfu-app.herokuapp.com/api/plan/${planId}`
      axios.get(url).then(res => {
        this.planInfo = res.data.plan
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料失敗')
      })
    },
    calculateTimeDiff(startTime) {
      const start = dayjs(startTime)
      const now = dayjs(new Date())
      const diff = now.diff(start)
      return dayjs(diff).format('HH:mm:ss')
    },
    showDate(dateStr) {
      return dateStr.replace('T', ' ').slice(0, -3)
    },
    gotoBack() {
      this.$router.push(`/bike/back/${this.orderId}`)
    },
    closeWindow() {
      liff.closeWindow()
    }
  }
}
</script>

<style>

</style>
