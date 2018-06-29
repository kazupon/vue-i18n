<template>
  <section class="language">
    <p>{{ $t('components.language.current', { language: $i18n.locale }) }}</p>
  </section>
</template>

<style>
.language {
  background: #fff;
  border: 1px solid #489CF1;
  margin: 2em 0;
}
</style>
