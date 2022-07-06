<template>
  <div v-loading.fullscreen.lock="isLoading" class="plans-page">
    <header class="bg-blue d-flex align-items-center p-3">
      <div class="w-1-3">
        <router-link to="/bike/scan">
          <i class="el-icon-arrow-left text-white fs-5"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white fs-5">租借方案</p>
    </header>
    <!-- 方案資訊 -->
    <ul v-if="currentStepId === 1" class="mt-4">
      <!-- <p class="fs-2 mb-1 text-center text-blue">請選擇租借方案</p>
      <p class="mt-1 text-center text-blue">Select Your Plan</p> -->
      <li
        v-for="plan in plans"
        :key="plan.id"
        class="w-90 mx-auto overflow-hidden mb-4 p-0"
        :class="{'disabled': rentData.planID !== plan.id}"
      >
        <div class="border border-2 rounded-top-4" :style="`border-color: ${plan.color} !important; background-color: ${plan.color};`">
          <h2 class="text-center text-white py-2 w-100 my-0">{{ plan.title }}</h2>
        </div>
        <div class="border border-2 rounded-bottom-4 px-3" :style="`border-color: ${plan.color} !important;`">
          <p class="text-center">{{ plan.description }}</p>
        </div>
        <div v-if="rentData.planID === plan.id" class="w-75 mx-auto mt-3">
          <!-- <p class="fs-2 text-blue text-center">方案費用</p> -->
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">姓名：</span>
            <el-input v-model="rentData.name" class="w-50 no-padding-right" placeholder="請輸入" />
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">手機號碼：</span>
            <el-input type="tel" v-model="rentData.phoneNumber" class="w-50 no-padding-right" placeholder="請輸入" />
          </div>
          <div v-if="rentData.planID === 3" class="p-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">租借時間(小時)：</span>
            <el-input-number type="tel" v-model="rentDuring" size="small" :min="1" class="w-50" placeholder="請輸入" />
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">租借費用(多退少補)：</span>
            <span class="">${{ paymentActualCost }}</span>
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">押金方式：</span>
            <el-select v-model="rentData.depositWay" placeholder="請選擇" class="no-padding-right">
              <el-option
                v-for="opt in depositWayOptions"
                :key="`dw-${opt.id}`"
                :label="opt.title"
                :value="opt.id" />
            </el-select>
          </div>
          <div v-if="rentData.depositWay === 5" class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">租借押金：</span>
            <span class="">${{ selectedPlan.paymentDeposit }}</span>
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="text-blue">總計：</span>
            <span class="text-blue">${{ paymentTotal }}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 條款簽名 -->
    <section v-else-if="currentStepId === 2 || currentStepId === 3" ref="contract" class="mt-4">
      <div v-if="currentStepId === 3" class="w-90 mx-auto mb-3">
        <el-card>
          <p class="fs-5 text-center mt-0">方案明細</p>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">方案</span>
            <span>{{ selectedPlan.title }}</span>
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="w-45">說明</span>
            <span class="">{{ selectedPlan.description }}</span>
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">租借費用(多退少補)</span>
            <span class="">${{ paymentActualCost }}</span>
          </div>
          <div v-if="rentData.depositWay === 5" class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">租借押金</span>
            <span class="">${{ selectedPlan.paymentDeposit }}</span>
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="text-blue">總計：</span>
            <span class="text-blue">${{ paymentTotal }}</span>
          </div>
        </el-card>
        <el-card class="mt-3">
          <p class="fs-5 text-center mt-0">使用者資訊</p>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">姓名</span>
            <span>{{ rentData.name }}</span>
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">電話</span>
            <span>{{ rentData.phoneNumber }}</span>
          </div>
          <div class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">租借抵押</span>
            <span>{{ depositWayList.find(({id}) => id === rentData.depositWay).title }}</span>
          </div>
          <div v-if="rentData.planID === 3" class="py-2 px-1 border-bottom border-blue d-flex align-items-center justify-content-between">
            <span class="">騎乘時間</span>
            <span>{{ rentDuring }} 小時</span>
          </div>
        </el-card>
      </div>
      <el-card class="w-90 p-2 mx-auto">
        <p class="fs-5 mt-0 text-center">神秘鳥地方-鳥仔咖  設備租賃合約</p>
        <p>立契約書人：</p>
        <p class="ms-4">出租人 神秘鳥地方-鳥仔咖 （以下簡稱甲方）</p>
        <p class="ms-4">承租人 <span class="border-bottom border-dark">{{ rentData.name }}</span> （以下簡稱乙方）</p>
        <p>玆為出租車事宜，雙方同意訂立本契約書，其約定條款如下：</p>
        <p>一、	本契約租賃：<span class="border-bottom border-dark">{{ selectedPlan.title }}</span>，數量 1。</p>
        <p>二、	租賃日期：自<span class="border-bottom border-dark">{{ twToday }}</span>。</p>
        <p v-if="rentData.planID === 1">(一)租金：每日（A.M.9:00-17:30）新台幣 200 元整，共計新台幣 <span class="border-bottom border-dark">200</span> 元整。</p>
        <p v-else-if="rentData.planID === 2">(一)租金：每日（A.M.9:00-17:30）新台幣 300 元整，共計新台幣 <span class="border-bottom border-dark">300</span> 元整。</p>
        <p v-else-if="rentData.planID === 3">(一)租金：每 1 時新台幣 200 元整(第一小時400元)，共 <span class="border-bottom border-dark">{{ rentDuring }}</span> 時，計新台幣 <span class="border-bottom border-dark">{{ paymentActualCost }}</span> 元。</p>
        <p v-if="rentData.depositWay === 5">(二)押金：新台幣<span class="border-bottom border-dark">{{ selectedPlan.paymentDeposit }}</span>元整。 （付款方式：現金）</p>
        <p>三、	乙方因本租賃同意交付甲方 <span class="border-bottom border-dark">{{ rentData.depositWay === 5 ? '   ' : depositWayList.find(({id}) => id === rentData.depositWay).title }}</span>。</p>
        <p>四、	乙方應依約定時間交還車輛，歸還日期超過一天，則需按天加收2000元租金／單組。但因車輛本身機件故障或不可歸責於乙方之事由，致乙方不能依約定時間交還車輛者，不在此限。乙方有前項但書情形得為通知者，乙方應即通知甲方。</p>
        <p>五、	甲方於乙方還車時，經檢查確無損壞或遺失配件後，應即無息返還押金。惟倘若乙方歸還車輛、設備等因遺失、毀損達無法修復程度者，甲方得沒收押金，乙方應照當時市價賠償；如毀損但可修復者，甲方得沒收押金，修理期間在三日以內者，並應償付該期間百分之七十之租金；在四日以上十日以內者，並應償付該期間百分之六十之租金；在十一日以上者，並應償付該期間百分之五十之租金。但期間之計算，最長以十五日為限。</p>
        <p>六、	本車輛限單人騎乘，不得超載、雙載、嚴禁擅交小孩騎乘。乙方違反，甲方得終止本租賃契約，並得請求乙方給付使用機車期間之租金，如另有損害，並得向乙方請求賠償。如發生事故致第三人受損，由乙方自行承擔，與甲方無涉。</p>
        <p>七、	乙方應盡善良管理人注意義務保管及維護本車輛。如發生擦撞、毀損、遺失或被盜者，除有不能向警察機關報案之情形外，乙方應立即報案並通知甲方後送合格修理廠修理，如因可歸責於乙方之事由所生之費用、及修理期間租金依第七條辦理，應由乙方負擔。</p>
        <p>八、	甲方應確保租賃期間本車輛合於約定使用狀態。非因不當操作所致之機件故障者， 乙方應立即通知甲方處理，並得要求換車。</p>
        <p>九、	還車地點（出租/歸還同地點）：原租車地點。</p>
        <p>十、	乙方欲延長本機車之租賃期限者者，應事先聯繫並取得甲方之同意，始為有效。</p>
        <p>十一、	本契約如有未訂事宜，依相關法令、習慣及誠信原則公平解決辦理。</p>
        <p>十二、	因本契約發生訴訟時，甲乙雙方同意以屏東地方法院為第一審管轄法院。</p>
        <p>十三、	甲方對乙方留存之個人資料負有保密義務，非經乙方書面同意，甲方不得對外揭露或為契約目的範圍外之利用，並應依電腦處理個人資料保護法之規定保護個人資料。租賃關係消滅後，甲方所保有乙方之資料，甲方應返還或銷毀。</p>
        <p class="mb-0">十四、	本契約條款已於<span class="border-bottom border-dark">{{ twToday }}</span>經承租人審閱完成。出租人（甲方）並應於簽約前，將契約內容逐條向承租人（乙方）說明。</p>
      </el-card>
      <div v-if="currentStepId === 2" class="w-90 mx-auto mt-3">
        <el-checkbox :value="rentData.termsChecked === 'Y'" @change="(status) => { rentData.termsChecked = status ? 'Y' : 'N' }">我同意此設備租賃合約</el-checkbox>
        <div ref="signWrap" class="border-bottom bg-light p-2 mt-3 d-flex justify-content-center align-items-center" style="min-height: 150px;" @click="dialogVisible = true">
          <p v-if="!rentData.signImage" class="my-0 text-secondary">點擊此處簽名</p>
          <img v-else ref="signImg" :src="rentData.signImage" alt="" class="w-100">
        </div>
      </div>
      <div v-if="currentStepId === 3" class="w-90 mx-auto mt-3">
        <img :src="rentData.signImage" alt="" class="w-100">
      </div>
    </section>
    <div class="mt-5 pb-4 d-flex justify-content-center">
      <router-link v-if="currentStepId === 1" to="/bike/scan" class="text-decoration-none">
        <button class="btn rounded bg-white text-blue fs-6">取消</button>
      </router-link>
      <button v-else class="btn rounded ms-4 fs-6" @click="currentStepId--">上一步</button>
      <button class="btn rounded ms-4 fs-6" @click="nextStep">{{ currentStepId === 3 ? '確定' : '下一步'}}</button>
    </div>
    <!-- 簽名視窗 -->
    <el-dialog
      ref="dialog"
      :visible.sync="dialogVisible"
      :fullscreen="true"
      :show-close="false"
      custom-class="product-purchase-dialog rounded-3"
    >
      <vueSignature ref="canvas" :defaultUrl="rentData.signImage" :sigOption="sigOption" w="100%" h="100vh" />
      <div class="position-absolute end-0" style="transform: rotate(-90deg); top: 50%;">
        <el-button type="text" class="p-0" @click="clear">清除</el-button>
        <el-button type="text" class="p-0" @click="updateCanvasUrl">確定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from '@/api'
import dayjs from 'dayjs'
import vueSignature from 'vue-signature' // https://github.com/WangShayne/vue-signature
import html2canvas from 'html2canvas' // https://github.com/niklasvh/html2canvas

export default {
  name: 'BikePlans',
  components: { vueSignature },
  data() {
    return {
      isLoading: false,
      dialogVisible: false,
      currentStepId: 1,
      stepList: [
        { id: 1, title: '方案資訊' },
        { id: 2, title: '條款簽名' },
        { id: 3, title: '訂單確認' }
      ],
      depositWayList: [
        { id: 1, title: '身分證' },
        { id: 2, title: '健保卡' },
        { id: 3, title: '駕照' },
        { id: 4, title: '其他證件' },
        { id: 5, title: '押金' }
      ],
      rentDuring: 1,
      rentData: {
        carID: 0,
        planID: 0,
        rentLocate: '濕地',
        returnLocate: '濕地',
        status: 1,
        depositWay: 1,
        signImage: '',
        termsChecked: 'N',
        name: '',
        phoneNumber: ''
      },
      sigOption: {
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)'
      }
    }
  },
  computed: {
    ...mapState(['lineUid', 'plans', 'lineUserName', 'userInfo']),
    selectedPlan() {
      return this.plans.find(item => item.id === this.rentData.planID)
    },
    depositWayOptions() {
      return this.rentData.planID === 3 ? this.depositWayList.filter(({ id }) => id !== 5) : this.depositWayList
    },
    paymentActualCost() {
      const { paymentCost, paymentStepCost } = this.selectedPlan
      const extraHour = this.rentDuring - 1
      return this.rentData.planID === 3 ? paymentCost + extraHour * paymentStepCost : paymentCost
    },
    paymentTotal() {
      const { paymentDeposit } = this.selectedPlan
      return this.rentData.depositWay === 5 ? this.paymentActualCost + paymentDeposit : this.paymentActualCost
    },
    twToday() {
      const y = dayjs().year() - 1911
      const m = dayjs().month() + 1
      const d = dayjs().date()
      return `民國 ${y} 年 ${m} 月 ${d} 日`
    }
  },
  async created() {
    const { carId, planId } = this.$route.params
    this.rentData.planID = Number(planId)
    this.rentData.carID = Number(carId)
    await this.getAllPlans()
    this.rentData.name = this.lineUserName
    this.rentData.phoneNumber = this.userInfo.userPhone
  },
  methods: {
    ...mapMutations(['setPlans']),
    getAllPlans() {
      if (this.plans.length) { return }
      this.isLoading = true
      const colors = ['#ee6a5a', '#AB7ECF', '#00C49B']
      axios.get('plan/').then(res => {
        const plans = res.data.plan.map((item, idx) => {
          item.color = colors[idx]
          if (item.id === 3) { item.paymentStepCost = 200 }
          return item
        })
        this.setPlans(plans)
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料失敗')
      })
    },
    submit() {
      this.isLoading = true
      html2canvas(this.$refs.contract).then(canvas => {
        const rentData = {
          ...this.rentData,
          memberLineID: this.lineUid,
          paymentDeposit: this.rentData.depositWay === 5 ? this.selectedPlan.paymentDeposit : 0,
          paymentCost: this.paymentActualCost,
          contractImage: canvas.toDataURL(),
          depositWay: this.rentData.depositWay.toString()
        }
        axios.post('car_order/rent/', rentData).then(res => {
          this.isLoading = false
          const orderId = res.data.result.id
          this.$router.push(`/bike/rentSuccess/${orderId}`)
        }).catch(err => {
          console.log(err)
          this.isLoading = false
          this.$message.error('送出訂單失敗')
        })
      })
    },
    nextStep() {
      switch (this.currentStepId) {
        case 1: {
          const { name, phoneNumber } = this.rentData
          if (!name || !phoneNumber) {
            this.$message.error('請填寫完整資訊')
          } else if (!/^09[0-9]{8}$/.test(phoneNumber)) {
            this.$message.error('手機格式錯誤')
          } else {
            this.currentStepId++
          }
          break
        }
        case 2: {
          const isSign = !this.$refs.canvas.isEmpty()
          if (this.rentData.termsChecked !== 'Y') {
            this.$message.error('請勾選同意此設備租賃合約')
          } else if (!isSign) {
            this.$message.error('請簽名')
          } else {
            this.currentStepId++
          }
          break
        }
        case 3: {
          this.submit()
          break
        }
        default:
          break
      }
    },
    clear() {
      this.$refs.canvas.clear()
    },
    exportSignatureImage() {
      return this.$refs.canvas.save()
    },
    updateCanvasUrl() {
      this.rentData.signImage = this.exportSignatureImage()

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      const { width: cw, height: ch } = this.$refs.canvas.$el.querySelector('canvas')
      img.src = this.rentData.signImage
      img.onload = (ev) => {
        canvas.width = ch
        canvas.height = cw
        ctx.save()
        ctx.translate(ch, cw / ch)
        ctx.rotate(90 * Math.PI / 180)
        ctx.drawImage(img, 0, 0)
        ctx.restore()
        this.rentData.signImage = canvas.toDataURL()
        canvas.remove()
      }

      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  filter: grayscale(1);
}
.sign-image {
  --scale-size: 1;
}
</style>
