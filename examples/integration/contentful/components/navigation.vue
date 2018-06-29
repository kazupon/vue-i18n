<template>
  <nav role="navigation" class="top-nav">
    <ul class="menu">
      <li v-if="!/\/.*?\/.*/.test(route.path)"
          v-for="route in this.$router.options.routes">
        <nuxt-link :to="{ name: route.name }">
          {{ $t(`components.navigation.menu.${route.name}`) }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style>
.person-name:link,
.person-name:visited {
  display: inline-block;
  font-size: 2em;
  text-decoration: none;
  color: #373F49;
}

.top-nav {
  width: 100%;
  display: inline-block;
  text-align: right;
}

.menu {
  display: inline-block;
}

.menu li {
  display: inline-block;
  margin-left: 1em;
}

.menu a:link,
.menu a:visited {
  color: #373F49;
  text-decoration: none;
}
</style>
