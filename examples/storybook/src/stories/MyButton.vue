<template>
  <button class="button-styles" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'my-button',
  
    methods: {
      onClick () {
      }
    }
  }
</script>

<style>
  .button-styles {
    border: 1px solid #eee;
    border-radiuas: 3px;
    background-color: #FFFFFF;
    cursor: pointer;
    font-size: 15pt;
    padding: 3px 10px;
    margin: 10px;
  }
</style>
