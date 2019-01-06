<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>

        <v-progress-circular
          v-if="loading"
          indeterminate
          :size="150"
          color="amber"
        />

        <v-card v-else>

          <v-card-title>
            <h1><span v-if="item.artist">{{ item.artist }} - </span>{{ item.title }}</h1>
            <v-spacer/>
            <edit-ticket-dialog
              v-if="userIsAdmin"
              :item="item"
            />

            <delete-ticket-dialog
              v-if="userIsAdmin"
              :item="item"
            />
          </v-card-title>

          <v-card-media
            height="500"
            :src="item.imageUrl"
          />

          <v-card-text>

            <!--<div class="ticket__winners">-->
            <!--</div>-->

            <!--<div class="ticket__edit text-xs-right" v-if="userIsAdmin">-->
            <!--</div>-->

            <!--<div class="ticket__thumd text-xs-center">-->
              <!--<img-->
                <!--v-if="item.imageUrl"-->
                <!--class="ticket__img-yes"-->
                <!--:src="item.imageUrl"-->
              <!--/>-->
              <!--<div v-else class="ticket__img-no">-->
                <!--Похоже, у билета нет картинки<br>-->
                <!--Создайте новый билет, а этот удалите-->
              <!--</div>-->
            <!--</div>-->

            <p><i>{{ item.date | date }}</i></p>
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      item () {
        return this.$store.getters.loadedItem(this.id)
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
    }
  }
</script>

<style>
  /*.ticket__winners {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
  /*}*/
  .ticket__edit {
    position: absolute;
    top: 0;
    right: 0;
  }
  .ticket__thumd {
    background-color: gainsboro;
  }
  .ticket__img-yes {
    max-width: 100%;
    margin: 0 auto 8px;
    display: block;
  }
  .ticket__img-no {
    width: 100%;
    height: 400px;
    margin: 0 auto 8px;
    padding: 16px;
  }
</style>
