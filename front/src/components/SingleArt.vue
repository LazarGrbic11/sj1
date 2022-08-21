<template>
  <div>

    <div class="art">
      <img v-if="image.primaryImageSmall" :src="image.primaryImageSmall" />
      <img v-else src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" />
      
      <ul>
        <li>Author: {{ image.artistDisplayName }}</li>
        <li>Highlight: {{ image.isHighlight }}</li>
      </ul>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'SingleArt',

    props: {
      image: Object
    }
  }

</script>

<style scoped>

  img {
    max-width: 600px;
    max-height: 600px;
  }

  .art {
    border-bottom-style: solid;
    margin-bottom: 10px;
  }

</style>