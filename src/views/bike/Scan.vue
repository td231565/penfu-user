<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-3">
      <div class="w-1-3">
        <!-- <router-link to="/">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link> -->
      </div>
      <p class="w-1-3 my-0 text-center text-white fs-5">掃碼輸入</p>
    </header>
    <QrcodeStream @decode="onDecode" @init="handlerQrcodeInit">
      <div class="position-relative w-100 h-100">
        <div class="scan-block">
          <div v-for="num in 4" :key="num" class="scan-block-corner"></div>
        </div>
      </div>
    </QrcodeStream>
    <div class="mt-5 d-flex justify-content-center">
      <button class="btn rounded bg-white text-blue fs-6" @click="closeWindow">取消</button>
    </div>
  </div>
</template>

<script>
import axios from '@/api'
import { QrcodeStream } from 'vue-qrcode-reader'
import { mapState } from 'vuex'

export default {
  name: 'BikeScan',
  components: { QrcodeStream },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState(['lineUid'])
  },
  created() {
    setTimeout(() => {
      this.onDecode(6)
    }, 1500)
  },
  methods: {
    onDecode(str) {
      this.checkReturnStatus(str)
    },
    async handlerQrcodeInit(promise) {
      try {
        const { capabilities } = await promise
      // successfully initialized
      } catch (error) {
        console.log(error)
        if (error.name === 'NotAllowedError') {
        // user denied camera access permisson
        } else if (error.name === 'NotFoundError') {
        // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
        // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
        // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
        // did you requested the front camera although there is none?
        } else if (error.name === 'StreamApiNotSupportedError') {
        // browser seems to be lacking features
        }
      } finally {
        // hide loading indicator
        this.isLoading = false
      }
    },
    checkReturnStatus(carID) {
      this.isLoading = true
      const checkData = {
        memberLineID: this.lineUid,
        carID: Number(carID)
      }
      axios.post('car_order/rent/check/', checkData).then(res => {
        let { status } = res.data
        status = Number(status)
        this.isLoading = false
        switch (Number(status)) {
          case 1:
            this.gotoPlan(carID)
            break
          case 2:
            this.gotoStatus()
            break
          case 3:
            this.$message.error('車輛正被租借中')
            break
          default:
            break
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料失敗')
      })
    },
    gotoPlan(carId) {
      this.$router.push(`/bike/plans/${carId}`)
    },
    gotoStatus() {
      this.$router.push(`/bike/status/`)
    },
    closeWindow() {
      window.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$corner-border: 7px;
$corner-radius: 15px;

.scan-block{
  width: 70%;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &-corner {
    width: calc(100% / 4);
    height: calc(100% / 3.5);
    position: absolute;
    border-style: solid;
    border-color: #000;
    &:nth-of-type(1) {
      top: 0;
      left: 0;
      border-width: $corner-border 0 0 $corner-border;
      border-radius: $corner-radius 0 0 0;
    }
    &:nth-of-type(2) {
      top: 0;
      right: 0;
      border-width: $corner-border $corner-border 0 0;
      border-radius: 0 $corner-radius 0 0;
    }
    &:nth-of-type(3) {
      bottom: 0;
      left: 0;
      border-width: 0 0 $corner-border $corner-border;
      border-radius: 0 0 0 $corner-radius;
    }
    &:nth-of-type(4) {
      bottom: 0;
      right: 0;
      border-width: 0 $corner-border $corner-border 0;
      border-radius: 0 0 $corner-radius 0;
    }
  }
}

#uploadQrcodePic {
  width: 1px;
  height: 1px;
}
</style>
