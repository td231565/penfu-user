<template>
  <div v-loading.fullscreen.lock="isLoading">
    <div class="w-100">
      <i class="el-icon-arrow-left fw-bold fs-3 p-3" @click="gotoList"></i>
    </div>
    <el-carousel trigger="click" height="200px">
      <el-carousel-item v-for="item in detailData.contentImage" :key="item.uuid">
        <img :src="item.link" alt="" width="100%">
      </el-carousel-item>
    </el-carousel>
    <div class="px-3">
      <p class="fs-5 fw-bold mt-3 mb-1">{{ detailData.title }}</p>
      <div class="d-flex justify-content-between align-items-end">
        <span class="text-blue fs-7">{{ detailData.subtitle }}</span>
        <p class="my-0 text-blue w-45 text-end">
          <span class="fs-7 me-1">{{isTicketPage ? '單人票價' : '售價'}}</span>
          <span class="fs-7 fw-bold">$ </span>
          <span class="fs-5 fw-bold">{{ unitPrice }}</span>
        </p>
      </div>
      <div v-html="detailData.contentArticle" class="lh-base"></div>
      <button class="btn rounded-3 w-100 fw-bold" @click="dialogVisible = true">
        <i class="el-icon-goods fs-1 me-2"></i>
        <span class="ls-1 fs-6">立即訂購</span>
      </button>
    </div>
    <!-- 購買 -->
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
        <span class="fw-bold">$ {{ unitPrice * purchaseData.number }}</span>
      </div>
      <div class="my-2 p-1 d-flex justify-content-center align-items-center">
        <i class="el-icon-remove-outline fs-1 text-blue cursor-pointer" @click="purchaseData.number > 1 && purchaseData.number--"></i>
        <span class="w-45 text-center fs-5">{{ purchaseData.number }}</span>
        <i class="el-icon-circle-plus-outline fs-1 text-blue cursor-pointer" @click="purchaseData.number++"></i>
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
import axios from 'axios'
import { mapState } from 'vuex'

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
        productID: '',
        ticketCategory: 'normal',
        date: '',
        time: '',
        // payway: 'cash',
        number: 1,
        status: 2
      },
      datePickerOptions: {
        disabledDate: this.pickerDisabledDate
      }
    }
  },
  computed: {
    ...mapState(['lineUid']),
    timePickerOptions() {
      if (!this.detailData.ticketStock) {
        return []
      } else {
        const selectedDate = this.purchaseData.date
        return this.detailData.ticketStock
          .filter(item => item.date === selectedDate)
          .map(item => item.time)
      }
    },
    unitPrice() {
      if (this.pageType === 'ticket') {
        const selectedTicket = this.detailData.ticketStock
          .find(item => item.date === this.purchaseData.date && item.time === this.purchaseData.time)
        return selectedTicket ? selectedTicket.price : 0
      } else {
        return this.detailData.price
      }
    }
  },
  created() {
    const { id, type } = this.$route.params
    this.pageType = type
    this.isTicketPage = this.pageType === 'ticket'
    this.purchaseData.productID = id
    this.getProductDetail(id)
  },
  methods: {
    getProductDetail(id) {
      this.isLoading = true
      const url = `https://pengfu-app.herokuapp.com/api/product/${id}`
      axios.get(url).then(res => {
        this.detailData = res.data.product
        this.purchaseData.date = this.detailData.ticketStock[0].date
        this.$nextTick(() => { this.resizeImage() })
        this.isLoading = false
      }).catch(() => {
        this.$message.error('取得資料錯誤')
        this.isLoading = false
      })
    },
    purchaseOrder() {
      this.isLoading = true
      const { date, time } = this.purchaseData
      this.purchaseData.memberLineID = this.lineUid
      this.purchaseData.validTime = `${date} ${time}:00`
      const url = `https://pengfu-app.herokuapp.com/api/order/`
      axios.post(url, this.purchaseData).then(res => {
        this.isLoading = false
        this.$router.push({ name: 'PaySuccess' })
      }).catch(() => {
        this.$message.error('取得資料錯誤')
        this.isLoading = false
      })
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
    },
    gotoList() {
      this.$router.push({ name: 'ProductList' })
    }
  }
}
</script>

<style>

</style>
