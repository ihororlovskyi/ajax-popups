<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>

        <app-alert v-if="error" @dismissed="onDismissed" :text="error.message"></app-alert>

        <v-card>
          <v-card-text>

            <h1>Регистрация</h1>

            <form @submit.prevent="onSignup">
              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required/>

              <v-text-field
                name="password"
                label="Пароль"
                id="password"
                v-model="password"
                type="password"
                autocomplete="password"
                required/>

              <!--<v-text-field-->
                <!--name="confirmPassword"-->
                <!--label="Подтвердите пароль"-->
                <!--id="confirmPassword"-->
                <!--v-model="confirmPassword"-->
                <!--type="password"-->
                <!--autocomplete="confirm-password"-->
                <!--:rules="[comparePasswords]"-->
                <!--required></v-text-field>-->

              <p>За попытку наебать - бан!</p>

              <div>
                <v-btn
                  class="ml-0"
                  color="success"
                  large
                  :loading="loading"
                  :disabled="loading"
                  type="submit"
                >Зарегистрироваться</v-btn>
              </div>
            </form>

            <br>
            <router-link to="/user/login">Уже есть аккаунт?</router-link>

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
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style>
</style>
