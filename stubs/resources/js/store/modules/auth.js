import router from '@/router'
import {httpClient as axios} from '@/services/HttpService'

export const namespaced = true

export const state = {
  user: null,
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  setUser({ commit }, data) {
    return commit('SET_USER', data)
  }
}

export const getters = {
  user: (state) => {
    return state.user
  },
  check: (state) => {
    return !!state.user
  },
}
