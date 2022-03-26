<template>
  <div v-loading.fullscreen.lock="isLoading">
    <el-carousel trigger="click" height="200px">
      <el-carousel-item v-for="item in detailData.contentImage" :key="item.uuid">
        <img :src="item.link" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="px-3">
      <p class="fs-5 fw-bold mt-3 mb-1">{{ detailData.title }}</p>
      <div class="d-flex justify-content-between align-items-end">
        <span class="text-blue fs-7">{{ detailData.subtitle }}</span>
        <p class="my-0 text-blue w-45 text-end">
          <span class="fs-7 me-1">單人票價</span>
          <span class="fs-7 fw-bold">$ </span>
          <span class="fs-5 fw-bold">{{ detailData.price }}</span>
        </p>
      </div>
      <div v-html="detailData.contentArticle" class="lh-base"></div>
      <button class="btn rounded-3 w-100 fw-bold">
        <i class="el-icon-goods fs-1 me-2"></i>
        <span class="ls-1 fs-6">立即訂購</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      isLoading: false,
      detailData: {}
    }
  },
  created() {
    this.getProductDetail()
  },
  methods: {
    getProductDetail() {
      this.isLoading = true
      setTimeout(() => {
        this.detailData = {
          id: 0,
          category: '',
          title: '餐宴船',
          subtitle: '購買饗宴遊程免費升級套餐(沙拉、前菜、湯品、飲料)',
          listImage: [
            {
              category: 'List',
              name: 'cat',
              link: `http://placekitten.com/500/300`
            }
          ],
          contentImage: [
            {
              category: 'Content',
              name: 'cat',
              link: `http://placekitten.com/500/300`,
              uuid: 123
            },
            {
              category: 'Content',
              name: 'cat',
              link: `http://placekitten.com/500/300`,
              uuid: 456
            },
            {
              category: 'Content',
              name: 'cat',
              link: `http://placekitten.com/500/300`,
              uuid: 789
            }
          ],
          contentArticle: '<p>先由熱情的導覽人員帶您進行觀光遊湖，途中轉換到餐宴船上享用新鮮海味、簡餐或是下午茶，70人座豪華精緻遊艇，雙船體設計， 平穩安全行駛於水中，雙層甲板設計，空間寬敞視野更完整，全視野欣賞大鵬灣的雅緻美景，是您賞美景品佳餚的最佳選擇。</p>',
          price: 2345,
          ticketStock: [
            {
              date: '2022-01-01',
              time: '16:30',
              stockNumber: 40
            }
          ]
        }
        this.isLoading = false
      }, 1500)
    }
  }
}
</script>

<style>

</style>
