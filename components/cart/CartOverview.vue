<template>
<table class="table is-hoverable is-fullwidth">
<tbody>
<CartOverviewProduct :product="product" v-for="product in products" :key="product.id"></CartOverviewProduct>
<tr>
  <td></td>
  <td></td>
  <td>
    <p class="has-text-weight-bold">
      Subtotal
    </p>
  </td>
  <td>{{subtotal}}</td>
  <td></td>
</tr>
</tbody>
</table>
</template>

<script>
import CartOverviewProduct from "./CartOverviewProduct";
import {mapGetters} from "vuex";

export default {
  name: "CartOverview",
  computed:{
    ...mapGetters({
     products: 'cart/products',
      subtotal: 'cart/subtotal'

    }),

  },
  components:{CartOverviewProduct}

}
</script>

<style scoped>

</style>
