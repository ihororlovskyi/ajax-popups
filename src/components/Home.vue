<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <h1>Irukanji</h1>
                </v-flex>

                <v-flex xs12>
                  <h3>Tracks</h3>
                </v-flex>

                <v-flex xs12 v-if="userIsAdmin">
                  <btn-add-track/>
                </v-flex>

                <v-flex xs12 v-if="loading">

                  <v-progress-circular
                    indeterminate
                    :size="150"
                    color="amber"
                  />

                </v-flex>

                <v-layout wrap v-else>
                  <list-item
                    v-for="i in items"
                    :i="i"
                    :key="i.id"
                  />
                </v-layout>

              </v-layout>
            </v-container>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      loading () {
        return this.$store.getters.loading
      },
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
    }
  }
</script>

<style>
</style>
