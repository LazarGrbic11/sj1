<template>
  <div>
    <Header :subtitle="subtitle"/>
    <SingleArt v-if="image" :image="image" />
    <Comments v-if="image" :image="image" />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import Comments from '@/components/Comments.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Single',

    components: {
      Header,
      SingleArt,
      Comments
    },

    data() {
      return {
        image: null,
        subtitle: ''
      }
    },
    
    methods: {
      ...mapActions([
        'getItem'
      ])
    },

    mounted() {
      this.getItem(this.$route.params.id).then( res => {
        this.image = res;
        this.subtitle = this.image.title;
      });
    }
  }

</script>