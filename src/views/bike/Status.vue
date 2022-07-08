<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-3">
      <div class="w-1-3">
        <i class="el-icon-close text-white fs-5" @click="closeWindow"></i>
      </div>
      <p class="w-1-3 my-0 text-center text-white fs-5">租借狀況</p>
    </header>
    <img src="@/assets/image/rent_banner.jpg" alt="" width="100%">
    <div v-if="rentInfo.id" class="mt-3 px-4">
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>租借方案</span>
        <span class="fw-bold">{{ planInfo.title }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>交易序號</span>
        <span class="fw-bold">{{ rentInfo.id }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>租借時間</span>
        <span class="fw-bold">{{ dayjs(rentInfo.rentTime).format('YYYY-MM-DD HH:mm') }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>已租借時間</span>
        <span class="fw-bold">{{ rentInfo.hour }} 小時 {{ rentInfo.minute }} 分</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center text-blue">
        <span>費用</span>
        <span class="fw-bold">$ {{ rentInfo.totalCost }}</span>
      </div>
    </div>
    <p v-else class="fs-3 text-center" style="margin: 3rem 0;">無租借資訊</p>
    <div class="mt-4 px-4 pb-3 d-flex justify-content-center">
      <!-- <button class="btn me-4 w-35 rounded-3">列印</button> -->
      <button v-if="rentInfo.id" class="btn rounded-3 me-4 fs-6" @click="gotoBack">歸還</button>
      <button class="btn rounded-3 fs-6" @click="closeWindow">確認</button>
    </div>
  </div>
</template>

<script>
import liff from '@line/liff'
import axios from '@/api'
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'BikeStatus',
  data() {
    return {
      isLoading: false,
      rentInfo: {},
      planInfo: {},
      dayjs: dayjs
    }
  },
  computed: {
    ...mapState(['lineUid'])
  },
  created() {
    this.getRentDetail()
  },
  methods: {
    getRentDetail() {
      this.isLoading = true
      const { orderId } = this.$route.params
      const url = `/car_order/return/check/content/${orderId}`
      axios.get(url).then(res => {
        const { carOrder, status } = res.data
        if (Number(status) === 2) {
          this.isLoading = false
          return
        }
        this.rentInfo = carOrder
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
      return axios.get(`/plan/${planId}`).then(res => {
        this.planInfo = res.data.plan
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    gotoBack() {
      this.$router.push(`/bike/back/${this.rentInfo.id}`)
    },
    closeWindow() {
      liff.init({
        liffId: '1657060057-zx3LN0rZ'
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
