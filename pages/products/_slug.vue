<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-half">
          <img src="http://via.placeholder.com/620x620" alt="Product name">
        </div>
        <div class="column is-half">
          <section class="section">
            <h1 class="title is-4">
              {{ product.name }}
            </h1>
            <p>
              {{ product.description }}
            </p>

            <hr>
            <span class="tag is-rounded is-medium is-dark" v-if="!product.in_stock">
             Out of stock
          </span>
            <span class="tag is-rounded is-medium">
              {{ product.price }}
          </span>
          </section>
          <section class="section">
            <form @submit.prevent="addToCart">
              <ProductVariation v-for="(variationTypeChild, variationTypeName) in product.variation"
                                :key="variationTypeName"
                                :type="variationTypeName"
                                :childs="variationTypeChild"
                                v-model="form.variation"
              >

              </ProductVariation>
              <div class="field has-addons" v-if="form.variation">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="form.quantity" id="">
                      <option :value="quantity" v-for="quantity in form.variation.stock_count" :key="quantity">
                        {{ quantity }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button class="button is-info" >Add to cart</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductVariation from "../../components/products/ProductVariation";
import {mapActions} from "vuex";
export default {
  name: "slug",
  components: {ProductVariation},
  data() {
    return {
      product: null,
      form: {
        variation: null,
        quantity: 1
      }
    }
  },
  watch: {
    'form.variation'() {
      this.form.quantity = 1
    }
  },
  methods:{
    ...mapActions({
    storeCartProduct: 'cart/store'
    }),
    addToCart(){
      this.storeCartProduct([
        {
          id: this.form.variation.id,
          quantity: this.form.quantity
        }
      ])
      this.form = {
        quantity: 1,
        variation: null
      }
    }
  },
  async asyncData({params, app}) {
    let response = await app.$axios.$get(`products/${params.slug}`)
    return {
      product: response.data
    }
  }
}
</script>

<style scoped>

</style>
