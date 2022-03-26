<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="d-flex justify-content-between w-90 rounded-pill border border-2 border-blue my-3 mx-auto">
      <div
        v-for="tag in tagList"
        :key="tag.key"
        class="rounded-pill py-1 px-3 w-50 text-center"
        :class="{
          'text-blue': tag.key !== currentTagKey,
          'bg-blue text-white fw-bold': tag.key === currentTagKey
        }"
        @click="currentTagKey = tag.key">{{ tag.title }}</div>
    </header>
    <div v-if="currentTagKey === 'souvenir'" class="d-flex flex-wrap justify-content-center">
      <div v-for="(item, idx) in list" :key="item.id" class="w-45 py-2 px-1" :class="{'me-2': idx % 2 === 0}">
        <img :src="item.image" alt="" class="w-100 rounded">
        <p class="ellipsis-1 mt-1 mb-2 fw-bold">{{ item.title }}</p>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <p class="my-0 text-blue fw-bold">
              <span class="fs-7">$ </span>
              <span >{{ item.price }}</span>
            </p>
            <p class="my-0 fs-7 ls-0">已售出 {{ item.sold }}</p>
          </div>
          <div class="rounded-pill bg-blue text-white py-2 px-3">
            <i class="el-icon-search me-1"></i>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentTagKey === 'ticket'" class="d-flex flex-wrap justify-content-center">
      <div v-for="item in list" :key="item.id" class="w-90 mb-4">
        <img :src="item.image" alt="" class="w-100 rounded">
        <p class="ellipsis-1 my-1 fw-bold fs-5">{{ item.title }}</p>
        <p class="ellipsis-2 my-0">{{ item.desc }}</p>
        <div class="d-flex justify-content-between align-items-end mt-2">
          <div>
            <p class="my-0 text-blue fw-bold">
              <span class="fs-7">$ </span>
              <span class="fs-5">{{ item.price }}</span>
            </p>
          </div>
          <div class="rounded-pill bg-blue text-white py-2 px-3" @click="gotoDetailPage(item.id)">
            <i class="el-icon-date me-1"></i>
            <span>Booking</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  // created() {
  //   this.getList()
  // },
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
        this.list = new Array(10).fill(0).map((_, idx) => ({
          id: `attraction-${new Date().valueOf() + idx}`,
          title: '紀念手環',
          desc: '票券說明票券說明票券說明票券說明票券說明票券說明票券說明票券說明票券說明票券說明票券說明票券說明票券說明票券說明',
          price: '1234',
          sold: 123,
          image: `http://placekitten.com/${idx % 3 + 1}00/${idx % 3 + 1}00`
        }))
        this.isLoading = false
      }, 1000)
    },
    gotoDetailPage(id) {
      this.$router.push(`/product/detail/${this.currentTagKey}/${id}`)
    }
  }
}
</script>

<style>

</style>
