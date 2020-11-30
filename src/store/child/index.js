import Vue from 'vue'
import Vuex from 'vuex'
import two from './two/two'
Vue.use(Vuex)
const store = {
  namespaced: true,
  state () {
    return {
      gg: '333'
    }
  },
  modules: {
    two
  },
  getters: {
    gg (state) {
      return state.gg
    }
  }
}
export default store
