<template>
  <div v-loading.fullscreen.lock="isLoading">
    <div class="w-100">
      <i class="el-icon-arrow-left fw-bold fs-3 p-3" @click="gotoList"></i>
    </div>
    <el-carousel trigger="click" height="250px">
      <el-carousel-item v-for="item in detailData.contentImage" :key="item.id">
        <!-- <h3 class="small">{{ item }}</h3> -->
        <img :src="item.link" alt="" class="w-100">
      </el-carousel-item>
    </el-carousel>
    <div class="px-4">
      <h2 class="">{{ detailData.title }}</h2>
      <p class="">{{ detailData.subTitle }}</p>
      <div ref="content" v-html="detailData.contentArticle"></div>
      <h2 class="d-flex justify-content-start align-items-center">
        <span class="material-icons me-1">directions_car_filled</span>
        交通資訊
      </h2>
      <div ref="contact" v-html="detailData.contactArticle"></div>
      <GmapMap
        :center="center"
        :zoom="14"
        map-type-id="terrain"
        style="width: 100%; height: 300px"
      >
        <GmapMarker :position="center" :clickable="false" :draggable="false" />
      </GmapMap>
      <h2 class="d-flex justify-content-start align-items-center">
        <span class="material-icons me-1">info</span>
        相關資訊
      </h2>
      <div ref="related" v-html="detailData.relatedArticle"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AttractionDetail',
  data() {
    return {
      isLoading: false,
      detailData: {
        map: {}
      }
    }
  },
  computed: {
    center() {
      const { lat = 0, lng = 0 } = this.detailData.map
      return { lat: parseFloat(lat), lng: parseFloat(lng) }
    }
  },
  created() {
    this.getDetailData()
  },
  methods: {
    getDetailData() {
      this.isLoading = true
      const { id } = this.$route.params
      const url = `https://pengfu-app.herokuapp.com/api/attraction/${id}`
      axios.get(url).then(res => {
        this.detailData = res.data.attraction
        this.$nextTick(() => { this.resizeImage() })
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    },
    gotoList() {
      this.$router.push({ name: 'AttractionList' })
    },
    resizeImage() {
      const images = ['content', 'contact', 'related']
        .reduce((all, curr) => [...all, ...this.$refs[curr].querySelectorAll('img')], [])
      images.forEach(img => {
        img.width = 0
        img.height = 0
        img.style.width = '100%'
        img.style.height = 'auto'
      })
    }
  }
}
</script>

<style>

</style>
