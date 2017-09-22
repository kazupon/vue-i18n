<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title" v-t="'title.main'"></h1>
      <h2 class="subtitle" v-t="'title.sub'"></h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green" v-t="'links.docs'"></a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey" v-t="'links.github'"></a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
