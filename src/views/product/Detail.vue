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
          <span class="fs-7 me-1">{{isTicketPage ? '單人票價' : '售價'}}</span>
          <span class="fs-7 fw-bold">$ </span>
          <span class="fs-5 fw-bold">{{ detailData.price }}</span>
        </p>
      </div>
      <div v-html="detailData.contentArticle" class="lh-base"></div>
      <button class="btn rounded-3 w-100 fw-bold" @click="dialogVisible = true">
        <i class="el-icon-goods fs-1 me-2"></i>
        <span class="ls-1 fs-6">立即訂購</span>
      </button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="90%"
      top="40vh"
      :show-close="false"
      custom-class="product-purchase-dialog rounded-3">
      <template v-if="isTicketPage">
        <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center">
          <span>使用日期</span>
          <el-date-picker
            v-model="purchaseData.date"
            :picker-options="datePickerOptions"
            type="date"
            placeholder="請選擇"
            class="w-35 no-padding-right"
            :clearable="false" />
        </div>
        <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center">
          <span>使用時間</span>
          <!-- <el-time-select
            v-model="purchaseData.time"
            format="HH:mm"
            placeholder="請選擇"
            class="no-padding-right"
            style="width: 23%;"
            :clearable="false" /> -->
          <el-select v-model="purchaseData.time" placeholder="請選擇" style="width: 29%;">
            <el-option
              v-for="(time, idx) in timePickerOptions"
              :key="`time-${idx}`"
              :label="time"
              :value="time" />
          </el-select>
        </div>
      </template>
      <div v-else class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>{{ detailData.title }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>付款方式</span>
        <el-select v-model="purchaseData.payway" placeholder="請選擇" class="w-35 text-end">
          <el-option label="現金/票券" value="cash" />
          <el-option label="信用卡" value="credit" />
        </el-select>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>總金額</span>
        <span class="fw-bold">$ {{ detailData.price * purchaseData.amount }}</span>
      </div>
      <div class="my-2 p-1 d-flex justify-content-center align-items-center">
        <div class="rounded-circle border border-blue p-1" @click="purchaseData.amount > 1 && purchaseData.amount--">
          <i class="el-icon-minus fw-bold"></i>
        </div>
        <span class="w-45 text-center fs-5">{{ purchaseData.amount }}</span>
        <div class="rounded-circle border border-blue p-1" @click="purchaseData.amount++">
          <i class="el-icon-plus fw-bold"></i>
        </div>
      </div>
      <p class="my-0 fs-7">
        <i class="el-icon-circle-check text-blue me-1"></i>
        <span class="ls-0">本人同意以下協議《鵬福觀光遊艇有限公司規範》</span>
      </p>
      <button class="btn ls-1 rounded-3 w-100 fs-6 mt-2">確認訂單與付款</button>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'ProductDetail',
  data() {
    return {
      pageType: 'ticket',
      isTicketPage: true,
      isLoading: false,
      dialogVisible: false,
      detailData: {},
      purchaseData: {
        date: '',
        time: '',
        payway: 'cash',
        amount: 1
      },
      datePickerOptions: {
        disabledDate: this.pickerDisabledDate
      }
    }
  },
  computed: {
    timePickerOptions() {
      if (!this.detailData.ticketStock) {
        return []
      } else {
        const selectedDate = this.purchaseData.date
        return this.detailData.ticketStock
          .filter(item => item.date === selectedDate)
          .map(item => item.time)
      }
    }
  },
  created() {
    this.pageType = this.$route.params.type
    this.isTicketPage = this.pageType === 'ticket'
    this.getProductDetail()
  },
  methods: {
    getProductDetail() {
      this.isLoading = true
      setTimeout(() => {
        this.detailData = {
          id: 0,
          category: '',
          title: this.pageType === 'ticket' ? '餐宴船' : '紀念手環',
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
              date: '2022-03-29',
              time: '16:30',
              stockNumber: 40
            },
            {
              date: '2022-03-29',
              time: '10:30',
              stockNumber: 40
            },
            {
              date: '2022-03-31',
              time: '14:30',
              stockNumber: 40
            }
          ]
        }
        this.purchaseData.date = this.detailData.ticketStock[0].date
        this.isLoading = false
      }, 1500)
    },
    pickerDisabledDate(date) {
      let result = true
      const dateList = this.detailData.ticketStock.filter(item => item.stockNumber > 0)
      for (let i = 0; i < dateList.length; i++) {
        const availableDate = dayjs(dateList[i].date)
        if (dayjs(date).isSame(availableDate, 'date')) {
          result = false
          break
        }
      }
      return result
    }
  }
}
</script>

<style>

</style>
