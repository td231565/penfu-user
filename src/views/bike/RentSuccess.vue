<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-3">
      <div class="w-1-3">
        <!-- <i class="el-icon-close text-white fs-5" @click="closeWindow"></i> -->
      </div>
      <!-- <p class="w-1-3 my-0 text-center text-white fs-5">租借成功</p> -->
    </header>
    <div class="text-center">
      <p class="fs-2 my-3">租借成功</p>
      <i class="el-icon-circle-check text-blue fw-bold" style="font-size: 88px;"></i>
    </div>
    <div class="mt-3 px-4">
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
        <span>租借費用</span>
        <span class="fw-bold">$ {{ rentInfo.paymentCost }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>租借押金</span>
        <span class="fw-bold">$ {{ rentInfo.paymentDeposit }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center text-blue">
        <span>總價</span>
        <span class="fw-bold">$ {{ rentInfo.paymentTotal }}</span>
      </div>
    </div>
    <div class="mt-4 px-4 pb-3 d-flex justify-content-center">
      <!-- <button class="btn me-4 w-35 rounded-3">列印</button> -->
      <button class="btn w-35 rounded-3 fs-6" @click="gotoPlansEntry">確認</button>
    </div>
  </div>
</template>

<script>
import liff from '@line/liff'
import { mapState } from 'vuex'
import axios from '@/api'
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
      const { orderId } = this.$route.params
      const url = `car_order/return/check/content/${orderId}`
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
      axios.get(`plan/${planId}`).then(res => {
        this.planInfo = res.data.plan
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料失敗')
      })
    },
    closeWindow() {
      liff.init({
        liffId: '1657060057-zx3LN0rZ'
      }).then(() => {
        liff.closeWindow()
        window.close()
      })
    },
    gotoPlansEntry() {
      this.$router.push({ name: 'BikeEntry' })
    }
  }
}
</script>

<style>

</style>
