<template>
  <div id="app" v-loading.fullscreen.lock="isLoading">
    <router-view/>
  </div>
</template>

<script>
import liff from '@line/liff'
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      isLoading: false
    }
  },
  created() {
    if (location.search.includes('richmenu')) {
      localStorage.setItem('path', location.pathname)
    }
    liff.init({
      liffId: '1657060057-zx3LN0rZ',
      withLoginOnExternalBrowser: true
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.setLineProfile(profile)
          // 新加入的使用者導頁去填寫個人資料
          this.userLogin(profile.userId)
        })
      } else {
        // 取得使用者要去的 route 讓他再回去
        console.log(location)
        // liff.login({
        //   redirectUri: 'https://stellular-kheer-3800d2.netlify.app/'
        // })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    ...mapMutations(['setLineProfile', 'setUserInfo']),
    userLogin(lineID) {
      this.isLoading = true
      axios.post('https://pengfu-app.herokuapp.com/api/user/getUser', {
        lineID
      }).then(res => {
        const { new: isNew, result } = res.data
        this.setUserInfo(result)
        if (isNew) {
          this.$router.push({ name: 'ProfileDetail' })
        } else {
          const path = localStorage.getItem('path')
          if (path !== location.pathname) {
            this.$router.push(path)
          }
        }
        this.isLoading = false
      }).catch(() => {
        this.$message.error('取得資料錯誤')
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  letter-spacing: 0.5px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
