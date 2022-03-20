<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-three-quarters">
          <ShippingAddresses :addresses="addresses"></ShippingAddresses>
          <article class="message">
            <div class="message-body">
              <h1 class="title is-5">Payment</h1>
            </div>
          </article>

          <article class="message">
            <div class="message-body">
              <h1 class="title is-5">
                Shipping
              </h1>
              <div class="select is-fullwidth">
                <select>
                  <option>
                    Royal Mail 1st Class
                  </option>
                </select>
              </div>
            </div>
          </article>

          <article class="message" v-if="products.length">
            <div class="message-body">
              <h1 class="title is-5">
                Cart summary
              </h1>
             <cart-overview>
               <template slot="rows">
                 <tr>
                   <td></td>
                   <td></td>
                   <td class="has-text-weight-bold">
                     Shipping
                   </td>
                   <td>
                     0.00
                   </td>

                 <tr>
                   <td></td>
                   <td></td>
                   <td class="has-text-weight-bold">
                     Total
                   </td>
                   <td>
                     {{total}}
                   </td>
                 </tr>
               </template>
             </cart-overview>
            </div>
          </article>

          <article class="message">
            <div class="message-body">
              <button :disabled='empty' class="button is-info is-fullwidth is-medium">
                Place order
              </button>
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message">
            <div class="message-body">
              <button :disabled='empty' class="button is-info is-fullwidth is-medium">
                Place order
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import CartOverview from "../../components/cart/CartOverview";
import ShippingAddresses from "../../components/checkout/addresses/ShippingAddresses";
export default {
  name: "index",
  data(){
    return {
    addresses: []
    }
  },
  components:{
    CartOverview,
    ShippingAddresses
  },
  computed:{
    ...mapGetters({
      total: 'cart/total',
      products: 'cart/products',
      empty:'cart/isEmpty'
    })
  },
 async asyncData({app}) {
    let data = await app.$axios.$get('addresses')
   return {addresses: data.data}
 }
}
</script>

<style scoped>

</style>
