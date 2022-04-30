<template>
  <div class="profile-bg h-min-100vh p-3" v-loading.fullscreen.lock="isLoading">
    <header class="d-flex align-items-center">
      <span class="w-1-3"></span>
      <span class="text-white fw-bold w-1-3 text-center">個人中心</span>
      <i class="el-icon-s-tools text-white fs-4 w-1-3 text-end"></i>
    </header>
    <img :src="linePhotoUrl" alt="" class="d-block w-25 rounded-circle mx-auto mt-4 mb-2">
    <p class="mb-4 text-white fw-bold text-center">{{ userInfo.usernameChinese }}</p>
    <div class="p-3 rounded-3 bg-white">
      <!-- Tab -->
      <div class="pb-3 border-bottom border-2 border-blue d-flex justify-content-center align-items-center" style="height: 34px;">
        <div class="d-flex justify-content-center align-items-center w-45 cursor-pointer" @click="gotoFolder">
          <i class="el-icon-discount text-blue me-2"></i>
          <span>我的票券</span>
        </div>
        <div class="d-flex justify-content-center align-items-center w-45 cursor-pointer" @click="gotoInfo">
          <i class="el-icon-user text-blue me-2"></i>
          <span>會員資訊</span>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center my-3">
        <span class="fw-bold">我的訂單</span>
        <div class="d-flex align-items-center cursor-pointer" @click="gotoFolder">
          <span class="text-secondary">查看全部訂單</span>
          <i class="el-icon-arrow-right text-secondary ms-1"></i>
        </div>
      </div>
      <!-- Tickets -->
      <div v-for="(item, idx) in orders" :key="item.id" class="ticket" :class="{'mb-3': idx !== orders.length - 1}">
        <div class="ticket__left">
          <VueQrcode :value="item.uuid" :options="qrOptions" style="margin-top: -3px;" />
        </div>
        <div class="ticket__right">
          <p class="mt-1 mb-2">{{ item.title }}</p>
          <p class="my-0 text-blue fs-7">訂單有效</p>
          <p v-if="item.productCategory === '票券'" class="my-0 text-secondary fs-7">有效日期 {{ item.validTime.replace('T', ' ').slice(0, -3) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'ProfileDetail',
  components: { VueQrcode },
  data() {
    return {
      isLoading: false,
      orders: [],
      qrOptions: { width: 76, margin: 0, scale: 4 }
    }
  },
  computed: {
    ...mapState(['userInfo', 'lineUid', 'linePhotoUrl'])
  },
  created() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      this.isLoading = true
      axios.get(`https://pengfu-app.herokuapp.com/api/order/${this.lineUid}`).then(res => {
        this.orders = res.data.order.slice(0, 4)
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料錯誤')
      })
    },
    gotoFolder() {
      this.$router.push({ name: 'ProfileFolder' })
    },
    gotoInfo() {
      this.$router.push({ name: 'ProfileDetail' })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-bg {
  background-image: url(../../assets/image/bg_profile.png);
}
.h-min-100vh {
  min-height: 100vh;
}
.ticket {
  width: 100%;
  height: 96px;
  display: flex;
  border: 2px solid #ddd;
  border-radius: 10px;
  &__left {
    width: 96px;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before, &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      position: absolute;
      top: -9px;
      right: -8px;
      border-radius: 50%;
      background-color: #fff;
      border-width: 2px;
      border-style: solid;
      border-color: #fff #ddd #ddd #fff;
      transform: rotate(45deg);
    }
    &::after {
      top: calc(100% - 9px);
      border-color: #ddd #fff #fff #ddd;
    }
  }
  &__right {
    width: calc(100% - 96px);
    height: 96px;
    padding: 0.5rem;
    border-left: 2px dashed #ddd;
  }
}
</style>
