<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/bike/scan">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">方案選擇</p>
    </header>
    <p class="fs-2 mb-1 text-center text-blue">請選擇租借方案</p>
    <p class="mt-1 text-center text-blue">Select Your Plan</p>
    <div
      v-for="plan in plans"
      :key="plan.id"
      class="w-90 mx-auto overflow-hidden mb-3 p-0"
      @click="selectedId = plan.id"
    >
      <div class="border border-2 rounded-top-4" :style="`border-color: ${plan.color} !important; background-color: ${plan.color};`">
        <h2 class="text-center text-white py-2 w-100 my-0">{{ plan.title }}</h2>
      </div>
      <div class="border border-2 rounded-bottom-4" :style="`border-color: ${plan.color} !important;`">
        <p class="text-center">{{ plan.description }}</p>
      </div>
    </div>
    <div v-if="selectedId" class="w-75 mx-auto">
      <p class="fs-2 text-blue text-center">方案費用</p>
      <div class="p-1 border-bottom border-blue d-flex align-items-center justify-content-between">
        <span class="">租借費用(多退少補)：</span>
        <span class="">${{ selectedPlan.paymentCost }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center justify-content-between">
        <span class="">租借押金：</span>
        <span class="">${{ selectedPlan.paymentDeposit }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center justify-content-between">
        <span class="text-blue">總計：</span>
        <span class="text-blue">${{ selectedPlan.paymentCost + selectedPlan.paymentDeposit }}</span>
      </div>
    </div>
    <div class="mt-5 d-flex justify-content-center">
      <router-link to="/bike/scan" class="text-decoration-none">
        <button class="btn rounded bg-white text-blue">取消</button>
      </router-link>
      <button class="btn rounded ms-4" @click="submit">確定</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'BikePlans',
  data() {
    return {
      isLoading: false,
      plans: [],
      selectedId: 0
    }
  },
  computed: {
    selectedPlan() {
      return this.plans.find(item => item.id === this.selectedId)
    }
  },
  created() {
    this.getAllPlans()
  },
  methods: {
    ...mapMutations(['setBikeInfo']),
    getAllPlans() {
      this.isLoading = true
      const colors = ['#ee6a5a', '#AB7ECF', '#00C49B']
      const url = 'https://pengfu-app.herokuapp.com/api/plan/'
      axios.get(url).then(res => {
        this.plans = res.data.plan.map((item, idx) => {
          item.color = colors[idx]
          return item
        })
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料失敗')
      })
    },
    submit() {
      if (!this.selectedId) {
        this.$message.error('請先選擇方案')
        return
      }
      const plan = JSON.parse(JSON.stringify(this.selectedPlan))
      this.setBikeInfo(plan)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
