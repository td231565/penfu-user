<template>
  <div id="app" v-loading.fullscreen.lock="isLoading">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    this.liffInit()
  },
  methods: {
    ...mapActions(['liffInit'])
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
