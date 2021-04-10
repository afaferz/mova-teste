<template>
  <div id="app">
    <BaseHeader />
    <router-view />
  </div>
</template>

<script>
import BaseHeader from '@/components/Base/BaseHeader';

export default{
  name: 'App',
  components: {
    BaseHeader,
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
