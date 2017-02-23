<template>
  <div class="user-view">
    <spinner :show="!user"></spinner>
    <template v-if="user">
      <h1>{{ $t('user.id') }} : {{ user.id }}</h1>
      <ul class="meta">
        <li><span class="label">{{ $t('user.created') }}:</span> {{ user.created | timeAgo($tc) }} {{ $t('time.ago') }}</li>
        <li><span class="label">{{ $t('user.karma') }}:</span> {{user.karma}}</li>
        <li v-if="user.about" v-html="user.about" class="about"></li>
      </ul>
      <p class="links">
      <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">{{ $t('user.submissions') }}</a> |
      <a :href="'https://news.ycombinator.com/threads?id=' + user.id">{{ $t('user.comments') }}</a>
      </p>
    </template>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'

function fetchUser (store) {
  return store.dispatch('FETCH_USER', {
    id: store.state.route.params.id
  })
}

export default {
  name: 'user-view',
  components: { Spinner },
  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    }
  },
  preFetch: fetchUser,
  beforeMount () {
    fetchUser(this.$store)
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
