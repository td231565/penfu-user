<template>
  <div v-loading.fullscreen.lock="isLoading">
    <div class="w-100">
      <i class="el-icon-arrow-left fw-bold fs-3 p-3" @click="gotoList"></i>
    </div>
    <el-carousel v-if="detailData.contentImage.length > 0" trigger="click" height="200px">
      <el-carousel-item v-for="item in detailData.contentImage" :key="item.uuid">
        <img :src="item.link" alt="" width="100%">
      </el-carousel-item>
    </el-carousel>
    <div class="px-3 pb-3">
      <p class="fs-5 fw-bold mt-3 mb-1">{{ detailData.title }}</p>
      <div class="d-flex justify-content-between align-items-end">
        <span class="text-blue fs-7">{{ detailData.subtitle }}</span>
        <p class="my-0 text-blue w-45 text-end">
          <span v-if="isOutOfStock" class="fw-bold text-secondary me-2">補貨中</span>
          <span class="fs-7 me-1">{{isTicketPage ? '單人票價' : '售價'}}</span>
          <span class="fs-7 fw-bold">$ </span>
          <span class="fs-5 fw-bold">{{ detailData.price }}</span>
          <span v-if="isTicketPage" class="fs-7 fw-bold"> 起</span>
        </p>
      </div>
      <div ref="content" v-html="detailData.contentArticle" class="lh-base"></div>
      <button
        class="btn rounded-3 w-100 fw-bold"
        :class="{'bg-secondary border-secondary cursor-not-allowed': isOutOfStock}"
        @click="() => { if (!isOutOfStock) { dialogVisible = true } }">
        <i v-if="!isOutOfStock" class="el-icon-goods fs-1 me-2"></i>
        <span class="ls-1 fs-6">{{ isOutOfStock ? '售完補貨中' : '立即訂購' }}</span>
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
        <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
          <span>使用日期</span>
          <el-date-picker
            v-model="purchaseData.date"
            :picker-options="datePickerOptions"
            type="date"
            placeholder="請選擇"
            class="no-padding-right"
            value-format="yyyy-MM-dd"
            :clearable="false" />
        </div>
        <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
          <span>使用時間</span>
          <el-select v-model="purchaseData.time" placeholder="請選擇" class="no-padding-right">
            <el-option
              v-for="(time, idx) in timePickerOptions"
              :key="`time-${idx}`"
              :label="`${time.split(':')[0]}:${time.split(':')[1]}`"
              :value="time" />
          </el-select>
        </div>
      </template>
      <div v-else class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span class="fw-bold fs-6">{{ detailData.title }}</span>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>訂購人姓名</span>
        <el-input v-model="purchaseData.name" class="w-50 no-padding-right" placeholder="請輸入" />
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>行動電話</span>
        <el-input v-model="purchaseData.phonenumber" type="tel" class="w-50 no-padding-right" placeholder="請輸入" :maxlength="10" />
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>備註</span>
        <el-input v-model="purchaseData.comment" class="w-50 no-padding-right" placeholder="請輸入" />
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center">
        <span>付款方式</span>
        <el-select v-model="purchaseData.status" placeholder="請選擇" class="no-padding-right">
          <el-option label="現金/票券" :value="2" />
          <!-- <el-option label="信用卡" :value="1" /> -->
        </el-select>
      </div>
      <div class="p-2 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 42px;">
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
      <button
        class="btn ls-1 rounded-3 w-100 fs-6 mt-2"
        @click="purchaseOrder"
      >確認訂單與付款</button>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import axios from '@/api'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ProductDetail',
  data() {
    return {
      pageType: 'ticket',
      isTicketPage: true,
      isLoading: false,
      dialogVisible: false,
      detailData: {
        ticketStock: [],
        contentImage: []
      },
      purchaseData: {
        productID: '',
        ticketCategory: 'normal',
        date: '',
        time: '',
        number: 1,
        status: 2,
        name: '',
        phonenumber: '',
        comment: ''
      },
      datePickerOptions: {
        disabledDate: this.pickerDisabledDate
      },
      dayjs: dayjs
    }
  },
  computed: {
    ...mapState(['lineUid', 'userInfo', 'lineUserName']),
    timePickerOptions() {
      const selectedDate = this.purchaseData.date
      return this.detailData.ticketStock
        .filter(item => dayjs(item.date).isSame(selectedDate, 'date'))
        .map(item => item.time)
    },
    unitPrice() {
      if (this.pageType === 'ticket') {
        const selectedTicket = this.detailData.ticketStock
          .find(item => item.date === this.purchaseData.date && item.time === this.purchaseData.time)
        return selectedTicket ? selectedTicket.price : 0
      } else {
        return this.detailData.price
      }
    },
    isOutOfStock() {
      return !this.isTicketPage && this.detailData.ticketStock[0] && this.detailData.ticketStock[0].stock === 0
    }
  },
  async created() {
    const { id, type } = this.$route.params
    this.pageType = type
    this.isTicketPage = this.pageType === 'ticket'
    this.purchaseData.productID = id
    await this.getProductDetail(id)
    const { userPhone } = this.userInfo
    this.purchaseData.name = this.lineUserName
    this.purchaseData.phonenumber = userPhone
  },
  methods: {
    ...mapMutations(['setPaymentInfo']),
    getProductDetail(id) {
      this.isLoading = true
      axios.get(`product/${id}`).then(res => {
        this.detailData = res.data.product
        this.detailData.contentImage.forEach((item, idx) => {
          item.uuid = new Date().valueOf() + idx
        })
        this.$nextTick(() => { this.resizeImage() })
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('取得資料錯誤')
        this.isLoading = false
      })
    },
    purchaseOrder() {
      const stock = this.detailData.ticketStock[0].stock
      const purchaseNumber = this.purchaseData.number
      if (Number(stock) < Number(purchaseNumber)) {
        this.$message.error('您購買的數量已超過庫存量')
        return
      }
      const { date, time } = this.purchaseData
      this.purchaseData.memberLineID = this.lineUid
      this.purchaseData.validTime = this.isTicketPage ? `${date} ${time}` : '2999-12-31 11:59:59'
      if (!this.isTicketPage) {
        delete this.purchaseData.date
        delete this.purchaseData.time
      }
      for (const key in this.purchaseData) {
        if (!this.purchaseData[key] && key !== 'comment') {
          this.$message.error('請填寫完整資訊')
          return
        }
      }
      if (!this.validateMobile(this.purchaseData.phonenumber)) {
        this.$message.error('手機號碼格式錯誤')
        return
      }
      this.isLoading = true
      axios.post(`order/`, this.purchaseData).then(res => {
        this.setPaymentInfo(res.data.order)
        this.isLoading = false
        this.$router.push({ name: 'PaySuccess' })
      }).catch(err => {
        const { status } = err.response.data
        const msg = Number(status) === 2 ? '此商品的庫存量不足' : '取得資料錯誤'
        this.$message.error(msg)
        this.isLoading = false
      })
    },
    pickerDisabledDate(date) {
      const today = new Date()
      let result = true
      const dateList = this.detailData.ticketStock.filter(item => item.stock > 0)
      for (let i = 0; i < dateList.length; i++) {
        const availableDate = dayjs(dateList[i].date)
        if (dayjs(date).isSame(availableDate, 'date') && (dayjs(date).isSame(today, 'date') || dayjs(date).isAfter(today, 'date'))) {
          result = false
          break
        }
      }
      return result
    },
    resizeImage() {
      const images = ['content']
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
    },
    validateMobile(str) {
      const isValid = /^09[0-9]{8}$/.test(str)
      if (!isValid) {
        this.$message.error('手機號碼格式錯誤')
      }
      return isValid
    }
  }
}
</script>

<style>

</style>
