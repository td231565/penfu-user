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
      <li v-for="item in list" :key="item.id" class="w-100 mb-3 rounded-3 bg-white d-flex folder__item">
        <img :src="item.image" alt="" class="rounded folder__item__image">
        <div class="ps-3">
          <p class="ellipsis-1 mt-0 mb-1 fw-bold">{{ item.title }}</p>
          <p class="mt-0 mb-1 fs-7">使用日期 {{ item.useDate }}</p>
          <p class="ellipsis-1 mt-0 mb-1 fs-7">{{ item.desc }}</p>
          <p class="mt-0 mb-1 fs-7">{{ item.amount }} 張</p>
          <p class="my-0 text-blue fw-bold">
            <span class="fs-7">$ </span>
            <span>{{ item.price * item.amount }}</span>
          </p>
        </div>
        <div
          class="btn position-absolute folder__item__label"
          :class="isBeforeNow(item.useDate) ? 'folder__item__label--invalid' : 'folder__item__label--valid'"
        >{{ isBeforeNow(item.useDate) ? '已過期' : '可使用' }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'ProfileFolder',
  data() {
    return {
      isLoading: false,
      currentTagKey: 'ticket',
      tagList: [
        { key: 'ticket', title: '我的票券' },
        { key: 'souvenir', title: '我的伴手禮' }
      ],
      list: []
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
    getList(page, param) {
      this.isLoading = true
      console.log(page, param)
      setTimeout(() => {
        this.list = new Array(8).fill(0).map((_, idx) => ({
          id: `attraction-${new Date().valueOf() + idx}`,
          title: this.currentTagKey === 'ticket' ? '餐宴船' : '紀念手環',
          desc: '票券說明票券說明',
          price: '1234',
          amount: idx + 1,
          image: `http://placekitten.com/${idx % 3 + 1}00/${idx % 3 + 1}00`,
          useDate: `2022-04-0${1 + idx} 16:30`
        }))
        this.isLoading = false
      }, 1000)
    },
    isBeforeNow(date) {
      const now = dayjs(new Date())
      return dayjs(date).isBefore(now)
    }
  }
}
</script>

<style lang="scss" scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
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
</style>
