<template>
  <v-app>

    <v-toolbar dark class="black">

      <v-toolbar-items class="hidden-xs-only">

        <v-btn flat :to="homeBtn.url" exact>
          <v-icon>{{ homeBtn.icon }}</v-icon>
          <v-toolbar-title>{{ homeBtn.title }}</v-toolbar-title>
        </v-btn>

        <!--<v-btn flat :to="discographyBtn.url">-->
          <!--<v-icon left>{{ discographyBtn.icon }}</v-icon>-->
          <!--<span>{{ discographyBtn.title }}</span>-->
        <!--</v-btn>-->

        <!--<v-btn flat :to="tracksBtn.url">-->
          <!--<v-icon left>{{ tracksBtn.icon }}</v-icon>-->
          <!--<span>{{ tracksBtn.title }}</span>-->
        <!--</v-btn>-->

      </v-toolbar-items>

      <v-spacer/>

      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>

      <v-toolbar-items class="hidden-xs-only">

        <v-btn flat v-if="userIsAdmin" :to="adminBtn.url">
          <v-icon left>{{ adminBtn.icon }}</v-icon>
          <span>{{ adminBtn.title }}</span>
        </v-btn>

        <v-btn flat v-if="userIsAuthenticated" :to="profileBtn.url">
          <v-icon left>{{ profileBtn.icon }}</v-icon>
          <span>{{ profileBtn.title }}</span>
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" :to="loginBtn.url">
          <v-icon left>{{ loginBtn.icon }}</v-icon>
          <span>{{ loginBtn.title }}</span>
        </v-btn>

        <v-btn flat v-if="!userIsAuthenticated" :to="registerBtn.url">
          <v-icon left>{{ registerBtn.icon }}</v-icon>
          <span>{{ registerBtn.title }}</span>
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-navigation-drawer
      fixed
      temporary
      right
      v-model="sideNav"
    >
      <v-list dense class="pt-0">

        <v-list-tile :to="homeBtn.url">
          <v-list-tile-action>
            <v-icon>{{ homeBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ homeBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!--<v-list-tile :to="discographyBtn.url">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>{{ discographyBtn.icon }}</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title>{{ discographyBtn.title }}</v-list-tile-title>-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->

        <!--<v-list-tile :to="tracksBtn.url">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>{{ tracksBtn.icon }}</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title>{{ tracksBtn.title }}</v-list-tile-title>-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->

        <v-list-tile v-if="userIsAdmin" :to="adminBtn.url">
          <v-list-tile-action>
            <v-icon>{{ adminBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ adminBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" :to="profileBtn.url">
          <v-list-tile-action>
            <v-icon>{{ profileBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ profileBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="loginBtn.url">
          <v-list-tile-action>
            <v-icon>{{ loginBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ loginBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!userIsAuthenticated" :to="registerBtn.url">
          <v-list-tile-action>
            <v-icon>{{ registerBtn.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ registerBtn.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-card flat tile dark class="grey darken-4">
      <v-card-text>
        <v-container>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <div>Irukanji &copy; {{ new Date().getFullYear() }} All Rights Reserved</div>
              <Network/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

  </v-app>
</template>

<script>
  import Network from './components/Shared/Network.vue'

  export default {
    components: {
      Network
    },
    data () {
      return {
        sideNav: null,
        homeBtn: {title: 'Irukanji', icon: 'mdi-cannabis', url: '/'},
        discographyBtn: {title: 'Discography', icon: 'mdi-music', url: '/discography'},
        tracksBtn: {title: 'Tracks', icon: 'mdi-music-note', url: '/tracks'},
        profileBtn: {title: 'Profile', icon: 'mdi-account', url: '/user/profile'},
        adminBtn: {title: 'Admin', icon: 'mdi-security', url: '/admin'},
        loginBtn: {title: 'Sign In', icon: 'mdi-key', url: '/user/login'},
        registerBtn: {title: 'Registration', icon: 'mdi-account-plus', url: '/user/register'}
      }
    },
    computed: {
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
