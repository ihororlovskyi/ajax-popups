<template>
  <v-flex xs12 sm6 md3>
    <v-card tile>
      <v-card-media
        height="200"
        style="cursor: pointer"
        @click="onLoadItem(i.id)"
        v-ripple
        :src="i.imageUrl"
      >
        <!--<img class="list-item__img" :src="i.imageUrl">-->

        <div class="list-item__winners">

        </div>

        <v-spacer v-if="userIsAdmin"/>

        <div class="list-item__status" v-if="userIsAdmin">

        </div>

      </v-card-media>
      <v-card-text class="pa-2" style="font-size: 12px">
        <b><span v-if="i.artist">{{ i.artist }} - </span>{{ i.title }}</b>
        <br>
        <i>{{ i.date | date }}</i>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    props: ['i'],
    data () {
      return {
        id: this.i.id
      }
    },
    computed: {
      items () {
        return this.$store.getters.loadedSortedByDateItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      currentUserId () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id
      },
      userIsAdmin () {
        if (this.currentUserId === 'Gmq5awFPniRGMbUoRqmdtCDcmnH3') {
          return true
        }
      }
    },
    methods: {
      onLoadItem (id) {
        this.$router.push('/track/' + id)
      }
    }
  }
</script>

<style>
  .card__media {
    background-color: gainsboro;
  }
  .card__media__background {
  background-position: top center !important;
  }
  /*.list-item__winners {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
  /*}*/
  /*.list-item__status {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
  /*}*/
  /*.list-item__img {*/
    /*width: 120%;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
  /*}*/
</style>
