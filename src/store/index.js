import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    user: null,
    loading: false,
    error: null,
    loadedItems: []
  },

  mutations: {
    setLoadedItems (state, payload) {
      state.loadedItems = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    createItem (state, payload) {
      state.loadedItems.push(payload)
    },
    updateTicket (state, payload) {
      const item = state.loadedItems.find(item => {
        return item.id === payload.id
      })
      item.slug = payload.slug
      item.title = payload.title
      item.artist = payload.artist
      item.imageUrl = payload.imageUrl
    },
    removeTicket (state, payload) {
      const index = state.loadedItems.findIndex(item => {
        return item.id === payload
      })
      if (index !== -1) {
        state.loadedItems.splice(index, 1)
      }
    }
  },

  actions: {
    loadItems ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('items').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              slug: obj[key].slug,
              title: obj[key].title,
              artist: obj[key].artist,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedItems', items)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createItem ({commit}, payload) {
      const item = {
        slug: payload.slug,
        title: payload.title,
        artist: payload.artist,
        imageUrl: payload.imageUrl,
        date: payload.date.toISOString()
      }
      firebase.database().ref('items').push(item)
        .then((data) => {
          commit('createItem', item)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    updateTicketData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      updateObj.slug = payload.slug
      updateObj.title = payload.title
      updateObj.artist = payload.artist
      updateObj.imageUrl = payload.imageUrl
      firebase.database().ref('items').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateTicket', payload)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    removeTicketData ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('items').child(payload.id).remove()
        .then(() => {
          commit('removeTicket', payload.id)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredItems: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredItems: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoLogin ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredItems: []
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },

  getters: {
    loadedItems (state) {
      return state.loadedItems
    },
    loadedSortedByDateItems (state, getters) {
      return getters.loadedItems.sort((itemA, itemB) => {
        return new Date(itemA.date) - new Date(itemB.date)
      }).reverse()
    },
    userCreatedItems (state, getters) {
      return getters.loadedSortedByDateItems
    },
    loadedItem (state) {
      return (itemId) => {
        return state.loadedItems.find((item) => {
          return item.id === itemId
        })
      }
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }

})
