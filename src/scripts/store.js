import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      account: {
        token: null,
        role: null,
      } 
    }
  },
  mutations: {
    setToken(state, payload) {
      state.account.token = payload;
    },
    setAdmin(state, payload) {
      state.account.role = payload;
    }
  }
})

export default store;