<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="text-white mt-1 mb-2 position-relative">
      <img src="@/assets/image/attraction_top.jpg" alt="" class="w-100 px-3">
      <div class="position-absolute top-0 start-0 w-100 h-100 pb-3 px-4 d-flex justify-content-between align-items-end">
        <div class="text-start">
          <p class="fs-1 my-0">景點介紹</p>
          <p class="my-0">Sightseeing Introduction</p>
        </div>
        <!-- <div class="d-flex">
          <div
            v-for="(tag, idx) in tagList"
            :key="tag.key"
            class="border rounded-pill py-1 px-3 border-2 border-white cursor-pointer"
            :class="{
              'bg-white text-info fw-bold': tag.key === currentTagKey,
              'me-2': idx !== tagList.length - 1
            }"
            @click="currentTagKey = tag.key">{{ tag.title }}</div>
        </div> -->
      </div>
    </header>
    <div
      class="mx-auto"
      v-masonry
      transition-duration="0.3s"
      item-selector=".grid-item"
      column-width=".grid-size"
      :percent-position="true"
      :fit-width="true"
      gutter="0">
      <div
        v-for="(item, idx) in list"
        :key="item.id"
        v-masonry-tile
        class="grid-item p-1 cursor-pointer"
        :class="{
          'grid-size': idx === 0,
          'pe-2': idx % 2 === 0
        }"
        :style="`width: ${colWidth}px`"
        @click="gotoDetailPage(item.id)">
        <!-- block item markup -->
        <img v-lazy="item.image" class="w-100 rounded-3" alt="">
        <p class="ellipsis-1 my-1">{{ item.title }}</p>
        <p class="ellipsis-2 my-0">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api'

export default {
  name: 'AttractionList',
  data() {
    return {
      isLoading: false,
      currentTagKey: 'latest',
      tagList: [
        { key: 'latest', title: '最新' },
        { key: 'hot', title: '熱門' }
      ],
      list: []
    }
  },
  computed: {
    colWidth() {
      return (document.body.clientWidth - 36) / 2
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.isLoading = true
      axios.get(`attraction/`).then(res => {
        this.list = res.data.attraction.map(item => {
          const imageLink = item.listImage[0].link.split('.')
          const linkPath = imageLink.reduce((all, curr, idx) => {
            if (idx === imageLink.length - 1) { return all }
            return `${all}.${curr}`
          })
          const fileType = imageLink[imageLink.length - 1]
          return {
            id: item.id,
            title: item.title,
            desc: item.subTitle,
            image: `${linkPath}m.${fileType}`
          }
        })
        this.isLoading = false
      }).catch(() => {
        this.$message.error('取得資料錯誤')
        this.isLoading = false
      })
    },
    gotoDetailPage(id) {
      this.$router.push(`/attraction/detail/${id}`)
    }
  }
}
</script>

<style>

</style>
