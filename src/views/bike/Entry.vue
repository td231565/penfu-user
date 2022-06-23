<template>
  <div v-loading.fullscreen.lock="isLoading" class="plans-page">
    <header class="bg-blue d-flex align-items-center p-3">
      <div class="w-1-3">
        <router-link to="/bike/scan">
          <i class="el-icon-arrow-left text-white fs-5"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white fs-5">租借方案</p>
    </header>
    <!-- 方案資訊 -->
    <ul class="mt-4">
      <li
        v-for="plan in plans"
        :key="plan.id"
        class="w-90 mx-auto overflow-hidden mb-4 p-0"
      >
        <div class="border border-2 rounded-top-4" :style="`border-color: ${plan.color} !important; background-color: ${plan.color};`">
          <h2 class="text-center text-white py-2 w-100 my-0">{{ plan.title }}</h2>
        </div>
        <div class="border border-2 rounded-bottom-4 px-3" :style="`border-color: ${plan.color} !important;`">
          <p class="text-center">{{ plan.description }}</p>
        </div>
      </li>
    </ul>
    <div class="mt-5 pb-4 d-flex justify-content-center">
      <router-link to="/bike/scan" class="text-decoration-none">
        <button class="btn rounded fs-6">掃描腳踏車 QR Code</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from '@/api'

export default {
  name: 'BikePlans',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState(['plans'])
  },
  created() {
    this.getAllPlans()
  },
  methods: {
    ...mapMutations(['setPlans']),
    getAllPlans() {
      if (this.plans.length) { return }
      this.isLoading = true
      const colors = ['#ee6a5a', '#AB7ECF', '#00C49B']
      axios.get('plan/').then(res => {
        const plans = res.data.plan.map((item, idx) => {
          item.color = colors[idx]
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
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  filter: grayscale(1);
}
</style>
