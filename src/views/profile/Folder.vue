<template>
  <div class="profile-folder p-3" v-loading.fullscreen.lock="isLoading">
    <header class="d-flex justify-content-between w-100 rounded-pill border border-2 border-white bg-white mb-4 mx-auto">
      <div
        v-for="tag in tagList"
        :key="tag.key"
        class="rounded-pill py-1 px-3 w-50 text-center cursor-pointer"
        :class="{
          'text-blue': tag.key !== currentTagKey,
          'bg-blue text-white fw-bold': tag.key === currentTagKey
        }"
        @click="currentTagKey = tag.key">{{ tag.title }}</div>
    </header>
    <ul>
      <li v-for="item in list" :key="item.id" class="w-100 mb-3 rounded-3 bg-white d-flex folder__item" @click="getOrderDetail(item.id)">
        <img :src="item.image" alt="" class="rounded folder__item__image">
        <div class="ps-3">
          <p class="ellipsis-1 mt-0 mb-1 fw-bold">{{ item.title }}</p>
          <p class="mt-0 mb-1 fs-7">使用日期 {{ item.validTime }}</p>
          <p class="ellipsis-1 mt-0 mb-1 fs-7">{{ item.subtitle }}</p>
          <p class="mt-0 mb-1 fs-7">{{ item.number }} 張</p>
          <p class="my-0 text-blue fw-bold">
            <span class="fs-7">$ </span>
            <span>{{ item.price * item.number }}</span>
          </p>
        </div>
        <div
          class="btn position-absolute folder__item__label"
          :class="isBeforeNow(item.validTime) ? 'folder__item__label--invalid' : 'folder__item__label--valid'"
        >{{ isBeforeNow(item.validTime) ? '已過期' : '可使用' }}</div>
      </li>
    </ul>
    <!-- Modal -->
    <div v-if="isShowModal" class="modal" @click.self="isShowModal = false">
      <div class="modal__body">
        <div class="py-3 px-4">
          <h3 class="mt-0 mb-2 text-center">鵬福旅遊 PENGFU</h3>
          <p class="my-0">遊客</p>
          <p class="mt-0 mb-2 fw-bold">{{ userInfo.usernameChinese }}</p>
          <p class="my-0">訂單狀態</p>
          <p class="mt-0 mb-2 fw-bold">{{ getOrderStatusText(selectedOrder.status) }}</p>
          <p class="my-0">日期</p>
          <p class="mt-0 mb-2 fw-bold">{{ selectedOrder.validTime }}</p>
          <p class="my-0">名稱</p>
          <p class="my-0 fw-bold text-blue">{{ selectedOrder.title }}</p>
        </div>
        <hr class="divider divider-dashed my-0">
        <div class="py-3 px-4 text-center">
          <VueQrcode :value="qrcodeUrl" :options="qrOptions" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'ProfileFolder',
  components: { VueQrcode },
  data() {
    return {
      isLoading: false,
      currentTagKey: 'ticket',
      tagList: [
        { key: 'ticket', title: '我的票券' },
        { key: 'souvenir', title: '我的伴手禮' }
      ],
      list: [],
      selectedOrder: {},
      isShowModal: false,
      qrOptions: { width: 150, margin: 0, scale: 6 }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    qrcodeUrl() {
      return `redeemApi/${this.lineUid}/${this.selectedOrder.id}`
    }
  },
  watch: {
    currentTagKey: {
      immediate: true,
      handler(val) {
        this.getList(1, val)
      }
    }
  },
  methods: {
    getList() {
      this.isLoading = true
      axios.get(`https://pengfu-app.herokuapp.com/api/order/${this.lineUid}`).then(res => {
        this.list = res.data.order
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料錯誤')
      })
    },
    getOrderDetail(id) {
      if (id !== this.selectedOrder.id) {
        const orderObj = this.list.find(item => item.id === id)
        this.selectedOrder = JSON.parse(JSON.stringify(orderObj))
        // qrcode 用核銷 API + orderId + category 組成
      }
      this.isShowModal = true
    },
    getOrderStatusText(status) {
      const list = {
        1: '付款成功',
        2: '現金付款',
        3: '核銷成功',
        4: '取消訂單',
        99: '錯誤'
      }
      return list[status]
    },
    isBeforeNow(date) {
      const now = dayjs(new Date())
      return dayjs(date).isBefore(now)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-folder {
  background-image: url(../../assets/image/bg_profile.png);
}
.folder {
  &__item {
    padding: 10px;
    position: relative;
    &__image {
      width: 114px;
      max-height: 114px;
    }
    &__label {
      position: absolute;
      bottom: 10px;
      right: 10px;
      &--valid {
        background-color: #1caeec;
      }
      &--invalid {
        background-color: #cdcdcd;
        border-color: #cdcdcd;
      }
    }
  }
}
.modal {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(#000, 0.6);
  &__body {
    width: 70%;
    height: 70%;
    margin-top: 15%;
    position: relative;
    background-color: #fff;
    &::before, &::after {
      content: '';
      display: block;
      width: 10px;
      height: 100%;
      position: absolute;
      top: 0;
      left: -10px;
      background-color: #fff;
      background: radial-gradient(circle at 0 52.5%, transparent 0, transparent 9px, #fff 10px, #fff);
      border-radius: 10px 0 0 10px;
    }
    &::after {
      left: 100%;
      background: radial-gradient(circle at 100% 52.5%, transparent 0, transparent 9px, #fff 10px, #fff);
      border-radius: 0 10px 10px 0;
    }
  }
}
</style>
