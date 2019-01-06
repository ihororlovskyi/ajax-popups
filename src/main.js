import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'
import EditTicketDialog from './components/Edit/EditTicketDialog'
import DeleteTicketDialog from './components/Edit/DeleteTicketDialog'
import ListItem from './components/Contest/ListItem'
import BtnAddTrack from './components/Admin/BtnAddTrack'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('edit-ticket-dialog', EditTicketDialog)
Vue.component('delete-ticket-dialog', DeleteTicketDialog)
Vue.component('list-item', ListItem)
Vue.component('btn-add-track', BtnAddTrack)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAyVD0EMF-h2vVUR_k6uNHpuNu_lruhHmE',
      authDomain: 'irukanji-db.firebaseapp.com',
      databaseURL: 'https://irukanji-db.firebaseio.com',
      projectId: 'irukanji-db',
      storageBucket: 'irukanji-db.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
    this.$store.dispatch('loadItems')
  }
})
