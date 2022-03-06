export const state = () => ({
  categories: []
})

export const mutations = {
  set_categories(state, categories){
    state.categories = categories
  }
}

export const getters= {
  categories(state){
    return state.categories
  }
}

export const actions = {
  async nuxtServerInit({commit}) {
    let response = await this.$axios.$get('categories')
    commit('set_categories', response.data)
  }
}
