export const state = () => ({
  message: null
})

export const getters = {
 message(state) {
   return state.message
 }
}

export const mutations = {
  SET_ALERT(state, message){
    state.message = message
  }
}
export const actions = {
  flash({commit}, message){
    commit('SET_ALERT', message)
  },
  clear({commit}){
    commit('SET_ALERT', null)
  }
}
