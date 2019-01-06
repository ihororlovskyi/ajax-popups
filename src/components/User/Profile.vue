<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <h1>Profile</h1>
                </v-flex>

              </v-layout>
            </v-container>

            <v-progress-circular
              v-if="loading"
              indeterminate
              :size="150"
              color="amber"
            />

            <v-container grid-list-md v-else>
              <v-layout wrap>

                <v-flex xs12>
                  <h4>Your ID</h4>
                  <p><i>{{ $store.getters.user.id }}</i></p>
                </v-flex>

                <v-flex xs12 class="text-xs-right">
                  <v-btn flat class="mx-0" @click="onLogout">
                    <v-icon left>{{ logoutBtn.icon }}</v-icon>
                    {{ logoutBtn.title }}
                  </v-btn>
                </v-flex>

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
    data () {
      return {
        logoutBtn: {title: 'Exit', icon: 'mdi-exit-to-app'}
      }
    },
    computed: {
      items () {
        return this.$store.getters.userCreatedItems
      },
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style>
</style>
