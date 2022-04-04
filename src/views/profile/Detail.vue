<template>
  <div class="h-min-100vh p-3" style="background-color: #1caeec;">
    <header class="d-flex justify-content-between align-items-center text-white fw-bold">
      <i class="el-icon-arrow-left fw-bold"></i>
      <span>個人資料</span>
      <span>儲存</span>
    </header>
    <img src="http://placekitten.com/200/200" alt="" class="d-block w-25 rounded-circle mx-auto my-4">
    <div class="p-3 rounded-3 bg-white">
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">您的姓名</span>
        <span class="w-50 fw-bold">{{ detailData.name }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">行動號碼</span>
        <span class="w-50 fw-bold">{{ detailData.phone }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">電子信箱</span>
        <span class="w-50 fw-bold">{{ detailData.email }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">使用者帳號</span>
        <span class="w-50 fw-bold">{{ detailData.uid }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">性別</span>
        <span class="w-50 fw-bold">{{ detailData.sex === 'male' ? '男' : '女' }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex align-items-center" style="height: 34px;">
        <span class="w-35 text-end me-5">生日</span>
        <span class="w-50 fw-bold">{{ detailData.birthday }}</span>
      </div>
    </div>
    <button class="btn rounded-3 bg-white text-blue w-25 mt-4 mx-auto">儲存</button>
  </div>
</template>

<script>
export default {
  name: 'ProfileDetail',
  data() {
    return {
      detailData: {
        name: '羅密歐',
        phone: '0987654321',
        email: 'romeo@gmail.com',
        uid: 'line-uid',
        sex: 'male',
        birthday: '1995-03-31'
      }
    }
  }
}
</script>

<style>
.h-min-100vh {
  min-height: 100vh;
}
</style>
