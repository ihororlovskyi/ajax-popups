<template>
  <v-dialog v-model="editTicketDialog" max-width="330" @keydown.enter="onSaveChanges">

    <v-tooltip top slot="activator" color="warning" open-delay="0">
      <v-btn
        fab
        color="warning"
        slot="activator"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <span>Редактировать</span>
    </v-tooltip>

    <v-card>
      <v-container pa-1>

      <v-card-text pa-1>

        <!--<v-layout>-->
          <!--<v-flex xs12>-->
            <!--<v-text-field-->
              <!--name="slug"-->
              <!--id="slug"-->
              <!--label="Slug"-->
              <!--v-model="editedSlug"-->
            <!--/>-->
          <!--</v-flex>-->
        <!--</v-layout>-->

        <v-layout>
          <v-flex xs12>
            <v-text-field
              name="title"
              id="title"
              label="Title"
              v-model="editedTitle"
            />
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <v-text-field
              name="artist"
              id="artist"
              label="Artist"
              v-model="editedArtist"
            />
          </v-flex>
        </v-layout>

        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              name="imageUrl"
              id="imageUrl"
              label="Image Url"
              v-model="editedImageUrl"
            />
          </v-flex>
          <v-flex xs12 v-if="editedImageUrl">
            <img
              :src="editedImageUrl"
              class="d-block"
              width="150">
          </v-flex>
        </v-layout>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.stop="editTicketDialog=false">Отмена</v-btn>
        <v-btn color="warning" @click="onSaveChanges">Сохранить</v-btn>
      </v-card-actions>
      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        editTicketDialog: false,
        editedSlug: this.item.slug,
        editedTitle: this.item.title,
        editedArtist: this.item.artist,
        editedImageUrl: this.item.imageUrl
      }
    },
    methods: {
      onSaveChanges () {
        this.editTicketDialog = false
        this.$store.dispatch('updateTicketData', {
          id: this.item.id,
          slug: this.editedSlug,
          title: this.editedTitle,
          artist: this.editedArtist,
          imageUrl: this.editedImageUrl
        })
      }
    }
  }
</script>

<style>
</style>
