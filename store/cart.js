import queryString from 'query-string'
export const state = () => ({
  products: [],
  isEmpty: true,
  subtotal:null,
  total:null,
  changed: false,
  shipping: null
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_IS_EMPTY(state, isEmpty) {
    state.isEmpty = isEmpty
  },
  SET_SUBTOTAL(state, subtotal) {
    state.subtotal = subtotal
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_CHANGED(state, changed) {
    state.changed = changed
  },
  SET_SHIPPING(state, shipping) {
    state.shipping = shipping
  }
}

export const getters = {
  products(state){
    return state.products
  },
  isEmpty(state){
    return state.isEmpty
  },
  cartCount(state) {
    return state.products.length
  },
  subtotal(state) {
    return state.subtotal
  },
  total(state) {
    return state.total
  },
  changed(state) {
    return state.changed
  },
  shipping(state) {
    return state.shipping
  }
}

export const actions = {
  async getCart({commit, state}) {
    let queryStringParam = {
      shipping_method_id: state.shipping ? state.shipping.id : null
    }
    let response = await this.$axios.$get(`carts?${queryString.stringify(queryStringParam)}`)
        commit('SET_PRODUCTS', response.data.products)
        commit('SET_IS_EMPTY', response.meta.is_empty)
        commit('SET_SUBTOTAL', response.meta.subtotal)
    commit('SET_TOTAL', response.meta.total)
    commit('SET_CHANGED', response.meta.changed)
  },
  async destroy({dispatch}, productId) {
    let response = await this.$axios.$delete(`carts/${productId}`)
        await dispatch('getCart')
  }  ,
  async update({dispatch}, {productId, quantity}) {
    console.log('test '. quantity)
    let response = await this.$axios.$patch(`carts/${productId}`, {quantity})
        await dispatch('getCart')
  },
  async store({dispatch}, products) {
    console.log('test '. quantity)
    let response = await this.$axios.$post(`carts`, {products})
        await dispatch('getCart')
  },
  async setShipping({commit, dispatch}, shipping) {
    commit('SET_SHIPPING', shipping)
    await dispatch('getCart')
  }
}
