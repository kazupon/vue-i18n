<template>
  <div class="main-container">
    <ParentLayout>
      <template #page-top>
        <CarbonAds
          v-if="$site.themeConfig.carbonAds"
          :key="'ca:' + $page.path"
          :code="$site.themeConfig.carbonAds.carbon"
          :placement="$site.themeConfig.carbonAds.placement"
        />
      </template>
    </ParentLayout>
  </div>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import CarbonAds from './components/CarbonAds.vue'

export default {
  name: 'Layout',
  components: {
    ParentLayout,
    CarbonAds
  }
}
</script>

<style>
@media screen and (max-width: 1300px) {
  .content__default::before {
    content: "";
    /* background-color: red; */
    position: relative;
    display: block;
    /* top: 87px; */
    /* right: -12px; */
    float: right;
    height: 221px;
    /* width: 0; */
    padding: 0 0 20px 30px;
    margin-top: 20px;
    margin-right: -24px;
  }
}

img {
  max-width: 100%;
}
</style>

<style scoped>
</style>
