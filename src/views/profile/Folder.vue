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
          :class="item.sClass"
        >{{ item.sText }}</div>
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
import axios from '@/api'
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
      const now = dayjs(new Date())
      const sList = [
        { key: 101, text: '已過期', isValid: false },
        { key: 1, text: '可使用', isValid: true },
        { key: 2, text: '確認中', isValid: false },
        { key: 3, text: '完成訂單', isValid: false },
        { key: 4, text: '取消訂單', isValid: false },
        { key: 99, text: '無效訂單', isValid: false }
      ]
      axios.get(`order/${this.lineUid}`).then(res => {
        this.list = res.data.order.map(item => {
          const { imageLink, status: s, validTime } = item
          item.imageLink = this.convertImageLink(imageLink)
          const isExpired = dayjs(validTime).isBefore(now)
          item.status = isExpired ? 101 : Number(s)
          const sObj = sList.find(({ key }) => key === item.status)
          item.sText = sObj.text
          item.isValid = sObj.isValid
          item.sClass = sObj.isValid ? 'folder__item__label--valid' : 'folder__item__label--invalid'
          return item
        })
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
      if (!this.selectedOrder.isValid) { return }
      this.isShowModal = true
    },
    // 在 igmur 連結後面加 m 可取得縮圖
    convertImageLink(link) {
      const imgLink = link.split('.')
      const linkPath = imgLink.reduce((all, curr, idx) => {
        if (idx === imgLink.length - 1) { return all }
        return `${all}.${curr}`
      })
      const fileType = imgLink[imgLink.length - 1]
      return `${linkPath}m.${fileType}`
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
