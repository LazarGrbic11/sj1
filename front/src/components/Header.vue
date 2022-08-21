<template>
  <div class="naslov">
    <h1>Goal</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
  </div>
</template>

<script>

  export default {
    name: 'Header',
    
    props: {
      subtitle: String
    }
  }

</script>

<style scoped>
  .naslov {
    padding-top: 15px;
    margin-bottom: 25px;
  }
</style>