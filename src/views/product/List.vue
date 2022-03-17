<template>
  <div>
    <header>
      <div class="d-flex">
        <div>
          <p class="fs-1 my-0">景點介紹</p>
          <p class="my-0">Sightseeing Introduction</p>
        </div>
        <div class="d-flex">
          <div
            v-for="tag in tagList"
            :key="tag.key"
            class="rounded-pill"
            :class="{'active': tag.key === currentTagKey}"
            @click="currentTagKey = tag.key">{{ tag.title }}</div>
        </div>
      </div>
    </header>
    <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item" :column-width="200">
      <div v-masonry-tile class="item" v-for="item in list" :key="item.id">
        <!-- block item markup -->
        <img :src="item.image" alt="">
        <p>{{ item.title }}</p>
        <p>{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      currentTagKey: '',
      tagList: [
        { key: 'latest', title: '最新' },
        { key: 'hot', title: '熱門' }
      ],
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page, param) {
      console.log(page, param)
      setTimeout(() => {
        this.list = new Array(10).fill(0).map(() => ({
          id: new Date().valueOf(),
          title: '東港鎮瀾宮',
          desc: '今日東港鎮海東港公園一帶本有今日東港鎮海東港公園一帶本有今日東港鎮海東港公園一帶本有今日東港鎮海東港公園一帶本有',
          image: 'http://placekitten.com/200/300'
        }))
      }, 1000)
    }
  }
}
</script>

<style>

</style>
