<template>
  <div class="user-view">
    <template v-if="user">
      <h1>{{ $t('user.id') }} : {{ user.id }}</h1>
      <ul class="meta">
        <li><span class="label">{{ $t('user.created') }}:</span> {{ time }}</li>
        <li><span class="label">{{ $t('user.karma') }}:</span> {{user.karma }}</li>
        <li v-if="user.about" v-html="user.about" class="about"></li>
      </ul>
      <p class="links">
      <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">{{ $t('user.submissions') }}</a> |
      <a :href="'https://news.ycombinator.com/threads?id=' + user.id">{{ $t('user.comments') }}</a>
      </p>
    </template>
    <template v-else-if="user === false">
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
import { timeAgo } from '../util'

export default {
  name: 'user-view',

  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    },
    time () {
      const { value, unit } = timeAgo(this.user.created)
      return `${value} ${this.$tc('time.units.' + unit, value)} ${this.$t('time.ago')}`
    }
  },

  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('FETCH_USER', { id })
  },

  title () {
    return this.user
      ? this.user.id
      : 'User not found'
  }
}
</script>

<style lang="stylus">
.user-view
  background-color #fff
  box-sizing border-box
  padding 2em 3em
  h1
    margin 0
    font-size 1.5em
  .meta
    list-style-type none
    padding 0
  .label
    display inline-block
    min-width 4em
  .about
    margin 1em 0
  .links a
    text-decoration underline
</style>
