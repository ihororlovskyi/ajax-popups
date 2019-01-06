<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <v-card>
          <v-card-text>

            <h1>Add Track</h1>

            <form @submit.prevent="onCreateItem">

              <!--<div>-->
                <!--<v-text-field-->
                  <!--name="slug"-->
                  <!--label="Slug"-->
                  <!--id="slug"-->
                  <!--v-model="slug"-->
                <!--/>-->
              <!--</div>-->

              <div>
                <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  v-model="title"
                  required
                />
              </div>

              <div>
                <v-text-field
                  name="artist"
                  label="Artist"
                  id="artist"
                  v-model="artist"
                />
              </div>

              <div>
                <v-text-field
                  name="imageUrl"
                  label="Image Url"
                  id="imageUrl"
                  v-model="imageUrl"
                />
              </div>

              <!--<div>-->
                <!--<v-btn-->
                  <!--@click="onPickFile"-->
                  <!--class="ml-0"-->
                <!--&gt;-->
                  <!--<v-icon left>mdi-image</v-icon>-->
                  <!--Выбрать-->
                <!--</v-btn>-->
                <!--<input-->
                  <!--type="file"-->
                  <!--style="display: none"-->
                  <!--ref="fileInput"-->
                  <!--accept="image/*"-->
                  <!--@change="onFilePicked">-->
              <!--</div>-->

              <div v-if="imageUrl">
                <img
                  :src="imageUrl"
                  class="d-block"
                  width="150">
              </div>

              <div>
                <v-btn
                  class="ml-0"
                  color="success"
                  large
                  :disabled="!formIsValid"
                  type="submit"
                >
                  <v-icon left>mdi-plus-box</v-icon>
                  <span>Add Track</span>
                </v-btn>
              </div>

            </form>

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
        slug: '',
        title: '',
        artist: '',
        imageUrl: ''
      }
    },
    computed: {
      formIsValid () {
        return this.title !== ''
      }
    },
    methods: {
      onCreateItem () {
        if (!this.formIsValid) {
          return
        }
        const itemData = {
          slug: this.slug,
          title: this.title,
          artist: this.artist,
          imageUrl: this.imageUrl,
          date: new Date()
        }
        this.$store.dispatch('createItem', itemData)
        this.$router.push('/')
      }
    }
  }
</script>

<style>
</style>
