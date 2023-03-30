<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-3">
      <div class="w-1-3">
        <!-- <i class="el-icon-close text-white fs-5" @click="closeWindow"></i> -->
      </div>
      <p class="w-1-3 my-0 text-center text-white fs-5">租借列表</p>
    </header>
    <img src="@/assets/image/rent_banner.jpg" alt="" width="100%">
    <ul v-if="orderList.length" class="mt-3 px-4">
      <li
        v-for="(item, idx) in orderList"
        :key="item.id"
        class="border rounded-3 p-3 cursor-pointer"
        :class="{'mt-3': idx !== 0}"
        @click="$router.push(`/bike/status/${item.id}`)">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-bold">{{ plans.find(p => p.id === item.planID).title }}</span>
          <span>序號 {{ item.id }}</span>
        </div>
        <div class="d-flex justify-content-end align-items-center mt-3">
          <span class="me-2">租借時間</span>
          <span>{{ dayjs(item.rentTime).format('YYYY-MM-DD HH:mm') }}</span>
        </div>
      </li>
    </ul>
    <p v-else class="fs-3 text-center" style="margin: 3rem 0;">無租借資訊</p>
  </div>
</template>

<script>
import liff from '@line/liff'
import axios from '@/api'
import dayjs from 'dayjs'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'BikeOrderList',
  data() {
    return {
      isLoading: false,
      orderList: [],
      dayjs: dayjs
    }
  },
  computed: {
    ...mapState(['lineUid', 'plans'])
  },
  created() {
    this.getAllPlans()
    if (!this.lineUid) {
      this.liffInit().then(() => {
        this.getRentOrderList()
      })
    } else {
      this.getRentOrderList()
    }
  },
  methods: {
    ...mapMutations(['setPlans']),
    ...mapActions(['liffInit']),
    getRentOrderList() {
      this.isLoading = true
      const url = `/car_order/return/check/${this.lineUid}`
      axios.get(url).then(res => {
        const { carOrder, status } = res.data
        if (Number(status) === 2) {
          this.isLoading = false
          return
        }
        this.orderList = carOrder
      }).catch(err => {
        console.log(err)
        this.$message.error('讀取資料失敗')
        this.isLoading = false
      })
    },
    getAllPlans() {
      if (this.plans.length) { return }
      this.isLoading = true
      axios.get('plan/').then(res => {
        const plans = res.data.plan.map((item, idx) => {
          if (item.id === 3) { item.paymentStepCost = 200 }
          return item
        })
        this.setPlans(plans)
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
    }
  }
}
</script>
