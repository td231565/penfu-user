<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import liff from '@line/liff'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  created() {
    liff.init({
      liffId: '1657060057-zx3LN0rZ',
      withLoginOnExternalBrowser: true
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.setLineProfile(profile)
        })
      } else {
        liff.login({
          redirectUri: 'https://e3e1-123-194-157-185.jp.ngrok.io/'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    ...mapMutations(['setLineProfile'])
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
