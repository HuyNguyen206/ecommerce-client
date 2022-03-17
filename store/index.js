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
  async nuxtServerInit({commit, dispatch}) {
    let response = await this.$axios.$get('categories')
    commit('set_categories', response.data)
    if (this.$auth.loggedIn) {
      await dispatch('cart/getCart')
    }

  }
}
