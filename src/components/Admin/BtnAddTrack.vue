<template>
  <v-btn large color="success" class="mx-0" :to="createItemBtn.url">
    <v-icon left>{{ createItemBtn.icon }}</v-icon>
    {{ createItemBtn.title }}
  </v-btn>
</template>

<script>
  export default {
    data () {
      return {
        createItemBtn: {title: 'Add New Track', icon: 'mdi-plus-box', url: '/admin/add-track'}
      }
    }
  }
</script>

<style>
</style>
