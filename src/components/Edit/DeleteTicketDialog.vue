<template>
  <v-dialog v-model="deleteTicketDialog" max-width="330">

    <v-tooltip
      top
      slot="activator"
      color="error"
      open-delay="0"
    >
      <v-btn
        fab
        color="error"
        slot="activator"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <span>Удалить</span>
    </v-tooltip>

    <v-card>
      <v-container pa-1>

        <v-card-text pa-1>
          Билет будет удален безвозвратно.<br>
          Вы уверены, что хотите удалить этот билет?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.stop="deleteTicketDialog=false">Отмена</v-btn>
          <v-btn color="error" @click="onRemove">Удалить</v-btn>
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
        deleteTicketDialog: false
      }
    },
    methods: {
      onSaveChanges () {
        this.deleteTicketDialog = false
      },
      onRemove () {
        this.$store.dispatch('removeTicketData', {
          id: this.item.id
        })
        this.$router.push('/')
      }
    }
  }
</script>

<style>
</style>
