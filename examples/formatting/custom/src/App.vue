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
    <i18n path="terms" tag="p">
      <!-- Using v-t="" -->
      I accept the <a href="https://google.com" v-t="'tos'" />
    </i18n>

    <i18n path="terms" tag="p">
      <!-- Using $t() -->
      I accept the <a href="https://google.com">{{ $t('tos') }}</a>
    </i18n>

    <i18n path="fly.departure" tag="p">
      <!-- You can {action} until {limit} minutes from departure -->
      <template v-slot:action>
        {{ $t('fly.board') }}
      </template>
      <template v-slot:limit>
        <strong>25</strong>
      </template>
    </i18n>
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
