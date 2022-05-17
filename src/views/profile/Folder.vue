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
    <ul v-if="currentList.length > 0">
      <li v-for="item in currentList" :key="item.id" class="w-100 mb-3 rounded-3 bg-white d-flex folder__item" @click="getOrderDetail(item.id)">
        <img :src="item.imageLink" alt="" class="rounded folder__item__image">
        <div class="ps-3">
          <p class="ellipsis-1 mt-0 mb-1 fw-bold">{{ item.title }}</p>
          <p v-if="currentTagKey === 'ticket'" class="mt-0 mb-1 fs-7">使用日期 {{ item.validTime.replace('T', ' ').slice(0, -3) }}</p>
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
    <p v-else class="text-white text-center mt-5">目前沒有訂單唷</p>
    <!-- Modal -->
    <TicketModal
      v-if="isShowModal"
      :selectedOrder="selectedOrder"
      @on-close="isShowModal = false" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
import { mapState } from 'vuex'
import TicketModal from './components/TicketModal.vue'

export default {
  name: 'ProfileFolder',
  components: { TicketModal },
  data() {
    return {
      isLoading: false,
      currentTagKey: 'ticket',
      tagList: [
        { key: 'ticket', title: '我的票券', category: '票券' },
        { key: 'souvenir', title: '我的伴手禮', category: '伴手禮' }
      ],
      list: [],
      selectedOrder: {},
      isShowModal: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'lineUid']),
    currentList() {
      const tagName = this.tagList.find(({ key }) => key === this.currentTagKey).category
      return this.list.filter(({ productCategory }) => productCategory === tagName)
    }
  },
  created() {
    this.getList()
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
      }
      this.isShowModal = true
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
  min-height: 100vh;
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
</style>
