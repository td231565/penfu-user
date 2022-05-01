<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="d-flex justify-content-between w-90 rounded-pill border border-2 border-blue my-3 mx-auto">
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
    <!-- <div v-if="currentTagKey === 'souvenir'" class="d-flex flex-wrap justify-content-center">
      <div v-for="(item, idx) in currentList" :key="item.id" class="w-45 py-2 px-1" :class="{'me-2': idx % 2 === 0}">
        <img :src="item.listImage[0].link" alt="" class="w-100 rounded">
        <p class="ellipsis-1 mt-1 mb-2 fw-bold">{{ item.title }}</p>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <p class="my-0 text-blue fw-bold">
              <span class="fs-7">$ </span>
              <span >{{ item.price }}</span>
            </p>
            <p class="my-0 fs-7 ls-0">已售出 {{ item.saleNum }}</p>
          </div>
          <button class="btn" @click="gotoDetailPage(item.id)">
            <i class="el-icon-search me-1"></i>
            <span>More</span>
          </button>
        </div>
      </div>
    </div> -->
    <div
      v-if="currentTagKey === 'souvenir'"
      class="mx-auto"
      v-masonry
      transition-duration="0.3s"
      item-selector=".grid-item"
      column-width=".grid-size"
      :percent-position="true"
      :fit-width="true"
      gutter="0">
      <div
        v-for="(item, idx) in currentList"
        :key="item.id"
        v-masonry-tile
        class="grid-item p-1 cursor-pointer"
        :class="{
          'grid-size': idx === 0,
          'pe-2': idx % 2 === 0
        }"
        :style="`width: ${colWidth}px`">
        <!-- block item markup -->
        <img :src="item.listImage[0].link" alt="" class="w-100 rounded">
        <p class="ellipsis-1 mt-1 mb-2 fw-bold">{{ item.title }}</p>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <p class="my-0 text-blue fw-bold">
              <span class="fs-7">$ </span>
              <span >{{ item.price }}</span>
            </p>
            <p class="my-0 fs-7 ls-0">已售出 {{ item.saleNum }}</p>
          </div>
          <button class="btn" @click="gotoDetailPage(item.id)">
            <i class="el-icon-search me-1"></i>
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="currentTagKey === 'ticket'" class="d-flex flex-wrap justify-content-center">
      <div v-for="item in currentList" :key="item.id" class="w-90 mb-4">
        <img :src="item.listImage[0].link" alt="" class="w-100 rounded">
        <p class="ellipsis-1 my-1 fw-bold fs-5">{{ item.title }}</p>
        <p class="ellipsis-2 my-0">{{ item.subTitle }}</p>
        <div class="d-flex justify-content-between align-items-end mt-2">
          <div>
            <p class="my-0 text-blue fw-bold">
              <span class="fs-7">$ </span>
              <span class="fs-5">{{ item.price }}</span>
            </p>
          </div>
          <button class="btn" @click="gotoDetailPage(item.id)">
            <i class="el-icon-date me-1"></i>
            <span>Booking</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductList',
  data() {
    return {
      isLoading: false,
      currentTagKey: 'ticket',
      tagList: [
        { key: 'ticket', title: '票券' },
        { key: 'souvenir', title: '伴手禮' }
      ],
      list: []
    }
  },
  computed: {
    colWidth() {
      return (document.body.clientWidth - 36) / 2
    },
    currentList() {
      const tagName = this.tagList.find(({ key }) => key === this.currentTagKey).title
      return this.list.filter(({ category }) => category === tagName)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.isLoading = true
      const url = `https://pengfu-app.herokuapp.com/api/product/`
      axios.get(url).then(res => {
        this.list = res.data.product
        this.isLoading = false
      }).catch(() => {
        this.$message.error('取得資料錯誤')
        this.isLoading = false
      })
    },
    gotoDetailPage(id) {
      this.$router.push(`/product/detail/${this.currentTagKey}/${id}`)
    }
  }
}
</script>

<style>

</style>
