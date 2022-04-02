<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-three-quarters">
          <ShippingAddresses v-model="form.address_id" v-if="addresses.length" :addresses="addresses"></ShippingAddresses>
          <PaymentMethods v-model="form.payment_method_id" v-if="addresses.length" :paymentMethods="paymentMethods"></PaymentMethods>

          <article class="message">
            <div class="message-body">
              <h1 class="title is-5">Payment</h1>
            </div>
          </article>

          <article class="message" v-if="shippingMethodId">
            <div class="message-body">
              <h1 class="title is-5">
                Shipping
              </h1>
              <div class="select is-fullwidth">
                <select v-model="shippingMethodId">
                  <option value="">Please select</option>
                  <option :value="shippingMethod.id" v-for="shippingMethod in shippingMethods" :key="shippingMethod.id">
                    {{shippingMethod.name}} ({{shippingMethod.price}})
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
                <template slot="rows" v-if="shippingMethodId">
                  <tr>
                    <td></td>
                    <td></td>
                    <td class="has-text-weight-bold">
                      Shipping
                    </td>
                    <td>
                     {{shipping.price}}
                    </td>

                  <tr>
                    <td></td>
                    <td></td>
                    <td class="has-text-weight-bold">
                      Total
                    </td>
                    <td>
                      {{ total }}
                    </td>
                  </tr>
                </template>
              </cart-overview>
            </div>
          </article>

          <article class="message">
            <div class="message-body">
              <button @click.prevent="order" :disabled='empty || submitting' class="button is-info is-fullwidth is-medium">
                Place order
              </button>
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message">
            <div class="message-body">
              <button @click.prevent="order" :disabled='empty || submitting' class="button is-info is-fullwidth is-medium">
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
import {mapGetters, mapActions} from "vuex";
import CartOverview from "../../components/cart/CartOverview";
import ShippingAddresses from "../../components/checkout/addresses/ShippingAddresses";
import PaymentMethods from "../../components/checkout/paymentMethods/PaymentMethods";
export default {
  middleware: 'auth',
  name: "index",
  data() {
    return {
      submitting:false,
      addresses: [],
      paymentMethods: [],
      form: {
        address_id: null,
        payment_method_id:null
      },
      shippingMethods: []
    }
  },
  async asyncData({app}) {
    let addresses = await app.$axios.$get('addresses')
    let paymentMethods = await app.$axios.$get('payment-methods')
    return {
      addresses: addresses.data,
      paymentMethods: paymentMethods.data
    }

  },
  components: {
    CartOverview,
    ShippingAddresses,
    PaymentMethods
  },
  computed: {
    ...mapGetters({
      total: 'cart/total',
      products: 'cart/products',
      empty: 'cart/isEmpty',
      shipping: 'cart/shipping'
    }),
    shippingMethodId:{
      get(){
        return this.shipping ? this.shipping.id : ''
      },
      set(shippingMethodId){
      this.setShipping(
        this.shippingMethods.find(s => s.id === shippingMethodId)
      )
      }
    }
  },
  watch:{
    'form.address_id'(addressId){
      this.fetchShippingByAddressId(addressId).then(res => {
        this.setShipping(this.shippingMethods[0])
      })
    },
    shippingMethodId(){
      this.getCart()
    }
  },
  methods:{
    ...mapActions({
      setShipping: 'cart/setShipping',
      getCart: 'cart/getCart',
      flash: 'alert/flash'
    }),
    async fetchShippingByAddressId(addressId) {
     const res = await this.$axios.$get(`addresses/${addressId}/shippings`)
      this.shippingMethods = res
      return res
    },
    async order(){
      try {
        console.log({
          ...this.form,
          shipping_method_id: this.shippingMethodId
        })
        const res = await this.$axios.$post('orders', {
          ...this.form,
          shipping_method_id: this.shippingMethodId
        })
       await this.getCart()
        this.submitting = true
        this.$router.replace({
          name: 'orders'
        })
      }catch (e) {
        this.flash(e.response.data.message)
        this.getCart()
        console.log(e.response)
        this.submitting = false
      }

    }
  }
}
</script>

<style scoped>

</style>
