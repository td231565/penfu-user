<template>
  <div class="profile-detail h-min-100vh p-3" v-loading.fullscreen.lock="isLoading">
    <header class="d-flex justify-content-between align-items-center text-white fw-bold">
      <i class="el-icon-arrow-left fw-bold w-1-3 text-start" @click="gotoPrev"></i>
      <span class="w-1-3 text-center">個人資料</span>
      <span class="w-1-3 text-end" @click="updateUerDetail">儲存</span>
    </header>
    <img :src="linePhotoUrl" alt="" class="d-block w-25 rounded-circle mx-auto my-4">
    <div class="p-3 rounded-3 bg-white">
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">您的姓名</span>
        <el-input v-model="detailData.usernameChinese" class="w-50" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">行動電話</span>
        <el-input v-model="detailData.userPhone" :maxlength="10" class="w-50" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">電子信箱</span>
        <el-input v-model="detailData.userEmail" class="w-50" />
      </div>
      <!-- <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">使用者帳號</span>
        <span class="w-50 fw-bold">{{ detailData.uid }}</span>
      </div> -->
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">性別</span>
        <el-select v-model="detailData.userSex" placeholder="請選擇" class="w-50">
          <el-option label="男" value="male" />
          <el-option label="女" value="female" />
        </el-select>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">生日</span>
        <el-date-picker
          v-model="detailData.userBirthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="請選擇"
          class="w-50" />
      </div>
    </div>
    <button class="btn rounded-3 bg-white text-blue w-25 mt-4 mx-auto" @click="updateUerDetail">儲存</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'ProfileDetail',
  data() {
    return {
      isLoading: false,
      detailData: {
        userPhone: '',
        username: '',
        userBirthday: '',
        userEmail: '',
        usernameChinese: '',
        userSex: ''
      },
      prevPath: ''
    }
  },
  computed: {
    ...mapState(['lineUserName', 'linePhotoUrl', 'lineUid', 'userInfo'])
  },
  created() {
    this.prevPath = localStorage.getItem('path')
    this.getUserDetail()
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    getUserDetail() {
      this.detailData = JSON.parse(JSON.stringify(this.userInfo))
      if (!this.detailData.username) {
        this.detailData.username = this.lineUserName
      }
    },
    updateUerDetail() {
      axios.patch('https://pengfu-app.herokuapp.com/api/user/', {
        lineID: this.lineUid,
        ...this.detailData
      }).then(res => {
        this.setUserInfo(res.data.result)
        this.gotoPrev()
      }).catch(err => {
        console.log(err)
        this.$message.error('更新資料錯誤')
      })
    },
    gotoPrev() {
      this.$router.push(this.prevPath)
    }
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
