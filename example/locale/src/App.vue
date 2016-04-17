<template>
  <form novalidate>
    <h1>dynamic locale</h1>
    <select v-model="selected">
      <option v-for="lang in langs" :value="lang.code">{{ lang.text }}</option>
    </select>
    <span v-if="loading">loading ...</span>
    <p v-if="!loading">{{ $t('message.hello') }}</p>
    <p class="error" v-if="error">{{ error }}</p>
  </form>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      error: null,
      loading: false,
      selected: '',
      langs: [
        { code: 'en', text: 'English' },
        { code: 'ja', text: '日本語' }
      ]
    }
  },
  created () {
    Vue.locale('en', { message: { hello: 'hello world' } })
  },
  ready () {
    this.selected = 'en'
    Vue.config.lang = 'en'
  },
  watch: {
    selected (val, old) {
      var self = this
      if (!Vue.locale(val)) {
        Vue.locale(val, () => {
          self.loading = true
          return fetch('/locale/' + val, {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            return res.json()
          }).then((json) => {
            self.loading = false
            if (Object.keys(json).length === 0) {
              return Promise.reject(new Error('locale empty !!'))
            } else {
              return Promise.resolve(json)
            }
          }).catch((error) => {
            self.error = error.message
            return Promise.reject()
          })
        }, () => {
          Vue.config.lang = val
        })
      } else {
        Vue.config.lang = val
      }
    }
  }
}
</script>

<style>
body { font-family: Helvetica, sans-serif; }
.errors { color: red; }
</style>
