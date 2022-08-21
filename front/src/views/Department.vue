<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <ImageList />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import ImageList from '@/components/ImageList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Department',
    
    components: {
      Header,
      ImageList
    },

    data() {
        return {
            subtitle: '',
            depID: null
        }
    },

    watch: {
      $route() {
        this.subtitle = this.$route.params.name;
        this.depID = this.$route.params.id;

        this.fetchIDsByDepartment(this.depID);
      }
    },

    mounted() {
        this.subtitle = this.$route.params.name;
        this.depID = this.$route.params.id;

        this.fetchIDsByDepartment(this.depID);
    },

    methods: {
      ...mapActions([
        'fetchIDsByDepartment'
      ])
    }
  }
</script>

<style scoped>

</style>
