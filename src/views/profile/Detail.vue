<template>
  <div class="profile-detail h-min-100vh p-3" v-loading.fullscreen.lock="isLoading">
    <header class="d-flex justify-content-between align-items-center text-white fw-bold">
      <i class="el-icon-arrow-left fw-bold w-1-3 text-start" @click="$router.push({name: 'Profile'})"></i>
      <span class="w-1-3 text-center">個人資料</span>
      <span class="w-1-3 text-end">儲存</span>
    </header>
    <img :src="linePhotoUrl" alt="" class="d-block w-25 rounded-circle mx-auto my-4">
    <div class="p-3 rounded-3 bg-white">
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">您的姓名</span>
        <el-input v-model="detailData.name" class="w-50" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">行動電話</span>
        <el-input v-model="detailData.phone" :maxlength="10" class="w-50" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">電子信箱</span>
        <el-input v-model="detailData.email" class="w-50" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">使用者帳號</span>
        <span class="w-50 fw-bold">{{ detailData.uid }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">性別</span>
        <el-select v-model="detailData.sex" placeholder="請選擇" class="w-50">
          <el-option label="男" value="male" />
          <el-option label="女" value="female" />
        </el-select>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">生日</span>
        <el-date-picker
          v-model="detailData.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="請選擇"
          class="w-50" />
      </div>
    </div>
    <button class="btn rounded-3 bg-white text-blue w-25 mt-4 mx-auto">儲存</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileDetail',
  data() {
    return {
      isLoading: false,
      detailData: {
        name: '羅密歐',
        phone: '0987654321',
        email: 'romeo@gmail.com',
        uid: 'line-uid',
        sex: 'male',
        birthday: '1995-03-31'
      }
    }
  },
  computed: {
    ...mapState(['lineUserName', 'linePhotoUrl'])
  }
}
</script>

<style lang="scss" scoped>
.profile-detail {
  background-image: url(../../assets/image/bg_profile.png);
}
.h-min-100vh {
  min-height: 100vh;
}
</style>
