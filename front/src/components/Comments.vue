<template>
  <div>
    <h4>Komentari</h4>

    <div v-if="token">
      <b-form-input
        v-model="comment"
        placeholder="Napišite komentar"
        @keydown.enter="onSubmit"
      ></b-form-input>

      <b-card v-for="comment in image.comments" :title="comment.user.name" :key="comment.id">
        <b-card-text>
          {{ comment.body }}
        </b-card-text>
      </b-card>
    </div>
    <p v-else>Morate biti ulogovani da bi ostavili komentar</p>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Comments',

    props: {
      image: Object
    },

    data() {
      return {
        comment: ''
      }
    },

    computed: {
      ...mapState([
        'token'
      ])
    },

    methods: {
      ...mapActions([
        'postComment'
      ]),

      onSubmit() {
        this.$socket.emit('comment', { body: this.comment, artId: this.image.objectID, token: this.token });
        this.comment = '';
      }
    }
  }

</script>

<style scoped>
  .card {
    margin-top: 10px;
    text-align: left;
  }

  .card-title {
    margin-bottom: 0px;
  }

  .card-body {
    padding-bottom: 5px;
  }
</style>