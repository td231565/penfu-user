<template>
  <div v-loading.fullscreen.lock="isLoading">
    <div class="w-100 text-start">
      <i class="el-icon-arrow-left fw-bold fs-3 p-3" @click="gotoList"></i>
    </div>
    <el-carousel trigger="click" height="250px">
      <el-carousel-item v-for="item in detailData.contentImage" :key="item.id">
        <!-- <h3 class="small">{{ item }}</h3> -->
        <img :src="item.imageLink" alt="" class="w-100">
      </el-carousel-item>
    </el-carousel>
    <div class="px-4">
      <h2 class="text-start">{{ detailData.title }}</h2>
      <h2 class="d-flex justify-content-start align-items-center">
        <span class="material-icons me-1">directions_car_filled</span>
        交通資訊
      </h2>
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
    </div>
  </div>
</template>

<script>
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
      console.log(this.$route.params.id)
      setTimeout(() => {
        this.detailData = {
          title: '超可愛貓咪',
          subTitle: '好好好多小貓咪',
          contentTitle: '好好好多小貓咪',
          contentImage: new Array(3).fill(0).map((_, idx) => ({
            id: new Date().valueOf() + idx,
            imageLink: 'http://placekitten.com/500/300'
          })),
          contentArticle: '<p>contentArticle good aaaaaaaaa</p><p><img src="https://i.imgur.com/6F9Oo9F.jpg" alt="" width="1200" height="675" /></p>',
          map: { lat: 22.49, lng: 120.473509 }
        }
        this.isLoading = false
      }, 1500)
    },
    gotoList() {
      this.$router.push({ name: 'AttractionList' })
    }
  }
}
</script>

<style>

</style>
