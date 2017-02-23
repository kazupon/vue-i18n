<template>
  <div id="app">
    <div class="locale">
      <select v-model="locale" @change="$i18n.locale = locale">
        <option value="en-US">english</option>
        <option value="ja-JP">日本語</option>
      </select>
    </div>
    <div class="messages">
      <p id="normal">{{ $t('message.hello') }}</p>
      <p id="plural">{{ $t('message.plural', { n: 4 }) }}</p>
      <p id="select">{{ $t('message.select', { gender: 'male' }) }}</p>
      <p id="number">{{ $t('message.number', { current: 0.5 }) }}</p>
      <p id="time">{{ $t('message.time', { current: new Date() }) }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return { locale: 'en-US' }
    }
  }
</script>
