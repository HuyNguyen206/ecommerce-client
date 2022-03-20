<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <h1 class="title is-4">Your cart</h1>

          <article class="message">
            <CartOverview></CartOverview>
          </article>

          <nuxt-link
            :to="{name: 'checkout'}"
            class="button is-fullwidth is-info is-medium"
            :disabled="isEmpty"
          >
            Checkout
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import CartOverview from "../../components/cart/CartOverview";
import {mapGetters} from 'vuex'
export default {
  name: "index",
  components:{CartOverview},
  computed:{
    ...mapGetters({
      isEmpty: 'cart/isEmpty',
      changed: 'cart/changed'
    })
  }
}
</script>

<style scoped>

</style>
