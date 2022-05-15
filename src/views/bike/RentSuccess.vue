<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <i class="el-icon-close text-white" @click="closeWindow"></i>
      </div>
      <p class="w-1-3 my-0 text-center text-white">租借成功</p>
    </header>
    <div class="text-center">
      <p class="fs-2 my-2">租借成功</p>
      <i class="el-icon-circle-check text-blue fw-bold" style="font-size: 88px;"></i>
    </div>
    <div class="mt-3 px-4">
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>租借方案</span>
        <span class="fw-bold">{{ planInfo.title }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>交易序號</span>
        <span class="fw-bold">{{ rentInfo.id }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>租借時間</span>
        <span class="fw-bold">{{ dayjs(rentInfo.rentTime).format('YYYY-MM-DD HH:mm') }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>租借費用</span>
        <span class="fw-bold">$ {{ rentInfo.paymentCost }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center text-blue" style="height: 34px;">
        <span>租借押金</span>
        <span class="fw-bold">$ {{ rentInfo.paymentDeposit }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center text-blue" style="height: 34px;">
        <span class="text-blue">總價</span>
        <span class="fw-bold text-blue">$ {{ rentInfo.paymentCost + rentInfo.paymentDeposit }}</span>
      </div>
    </div>
    <div class="mt-4 px-4 pb-3 d-flex justify-content-center">
      <!-- <button class="btn me-4 w-35 rounded-3">列印</button> -->
      <button class="btn w-35 rounded-3" @click="closeWindow">確認</button>
    </div>
  </div>
</template>

<script>
import liff from '@line/liff'
import { mapState } from 'vuex'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'RentSuccess',
  data() {
    return {
      isLoading: false,
      rentInfo: {},
      planInfo: {},
      dayjs: dayjs
    }
  },
  computed: {
    ...mapState(['plans', 'lineUid'])
  },
  created() {
    this.getRentDetail()
  },
  methods: {
    getRentDetail() {
      this.isLoading = true
      const url = `https://pengfu-app.herokuapp.com/api/car_order/return/check/${this.lineUid}`
      axios.get(url).then(res => {
        this.rentInfo = res.data.carOrder
        if (this.plans.length > 0) {
          this.planInfo = this.plans.find(({ id }) => id === this.rentInfo.planID)
          this.isLoading = false
        } else {
          this.getPlanDetail(this.rentInfo.planID)
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料失敗')
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
    closeWindow() {
      liff.closeWindow()
    }
  }
}
</script>

<style>

</style>
