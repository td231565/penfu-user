<template>
  <div class="profile-bg h-min-100vh p-3">
    <header class="d-flex align-items-center">
      <span class="w-1-3"></span>
      <span class="text-white fw-bold w-1-3 text-center">個人中心</span>
      <i class="el-icon-s-tools text-white fs-4 w-1-3 text-end"></i>
    </header>
    <img src="http://placekitten.com/200/200" alt="" class="d-block w-25 rounded-circle mx-auto mt-4 mb-2">
    <p class="mb-4 text-white fw-bold text-center">{{ detailData.name }}</p>
    <div class="p-3 rounded-3 bg-white">
      <!-- Tab -->
      <div class="pb-3 border-bottom border-2 border-blue d-flex justify-content-center align-items-center" style="height: 34px;">
        <div class="d-flex justify-content-center align-items-center w-45">
          <i class="el-icon-discount text-blue me-2"></i>
          <span>我的票券</span>
        </div>
        <div class="d-flex justify-content-center align-items-center w-45">
          <i class="el-icon-user text-blue me-2"></i>
          <span>會員資訊</span>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center my-3">
        <span class="fw-bold">我的訂單</span>
        <div class="d-flex align-items-center">
          <span class="text-secondary">查看全部訂單</span>
          <i class="el-icon-arrow-right text-secondary ms-1"></i>
        </div>
      </div>
      <!-- Tickets -->
      <div v-for="(item, idx) in detailData.orders" :key="item.id" class="ticket" :class="{'mb-3': idx !== detailData.orders.length - 1}">
        <div class="ticket__left">
          <VueQrcode :value="item.qr" :options="{ width: 76, margin: 0, scale: 2 }" style="margin-top: -3px;" />
        </div>
        <div class="ticket__right">
          <p class="my-2">{{ item.title }}</p>
          <p class="my-0 text-blue fs-7">訂單有效</p>
          <p class="my-0 text-secondary fs-7">有效日期 {{ item.startDate }} 至 {{ item.endDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  name: 'ProfileDetail',
  components: { VueQrcode },
  data() {
    return {
      detailData: {
        name: '羅密歐',
        phone: '0987654321',
        email: 'romeo@gmail.com',
        uid: 'line-uid',
        sex: 'male',
        birthday: '1995-03-31',
        orders: [
          {
            id: 1,
            title: '遊艇導覽',
            startDate: '2022-04-01',
            endDate: '2022-04-01',
            qr: 'https://www.google.com'
          },
          {
            id: 2,
            title: '遊艇導覽',
            startDate: '2022-04-01',
            endDate: '2022-04-01',
            qr: 'https://www.google.com'
          },
          {
            id: 11,
            title: '遊艇導覽',
            startDate: '2022-04-01',
            endDate: '2022-04-01',
            qr: 'https://www.google.com'
          },
          {
            id: 12,
            title: '遊艇導覽',
            startDate: '2022-04-01',
            endDate: '2022-04-01',
            qr: 'https://www.google.com'
          },
          {
            id: 15,
            title: '遊艇導覽',
            startDate: '2022-04-01',
            endDate: '2022-04-01',
            qr: 'https://www.google.com'
          },
          {
            id: 18,
            title: '遊艇導覽',
            startDate: '2022-04-01',
            endDate: '2022-04-01',
            qr: 'https://www.google.com'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-bg {
  background-image: url(../../assets/image/bg_profile.png);
}
.h-min-100vh {
  min-height: 100vh;
}
.w-1-3 {
  width: calc(100% / 3);
}
.ticket {
  width: 100%;
  height: 96px;
  display: flex;
  border: 2px solid #ddd;
  border-radius: 10px;
  &__left {
    width: 96px;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      position: absolute;
      top: -9px;
      right: -8px;
      border-radius: 50%;
      background-color: #fff;
      border-top: 2px solid #fff;
      border-left: 2px solid #fff;
      border-right: 2px solid #ddd;
      border-bottom: 2px solid #ddd;
      transform: rotate(45deg);
    }
    &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      position: absolute;
      bottom: -5px;
      right: -8px;
      border-radius: 50%;
      background-color: #fff;
      border-top: 2px solid #ddd;
      border-left: 2px solid #ddd;
      border-bottom: 2px solid #fff;
      border-right: 2px solid #fff;
      transform: rotate(45deg);
    }
  }
  &__right {
    width: calc(100% - 96px);
    height: 96px;
    padding: 0.5rem;
    border-left: 2px dashed #ddd;
  }
}
</style>
