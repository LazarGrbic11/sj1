<template>
  <div id="app">
    <Header subtitle="Home"/>
    <img
      src="https://secure.static.goal.com/280900/280936_gallery.jpg"
      width="200"
      alt="Logo"
    />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: 'Home',
    
    components: {
      Header
    }
  }
</script>
