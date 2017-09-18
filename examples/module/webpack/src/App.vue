<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2 v-t="'headers.links'"></h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" v-t="'items.docs'"></a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" v-t="'items.forum'"></a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank" v-t="'items.chat'"></a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" v-t="'items.twitter'"></a></li>
    </ul>
    <h2 v-t="'headers.ecosystem'"></h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank" v-t="'items.routing'"></a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank" v-t="'items.store'"></a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank" v-t="'items.webpack'"></a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" v-t="'items.curated'"></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
