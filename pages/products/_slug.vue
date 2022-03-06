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
             {{product.name}}
            </h1>
            <p>
             {{product.description}}
            </p>

            <hr>

            <span class="tag is-rounded is-medium">
              {{product.price}}
          </span>
          </section>
            <section class="section">
              <form action="">
                <ProductVariation v-for="(variationTypeChild, variationTypeName) in product.variation"
                                  :key="variationTypeName"
                                  :type="variationTypeName"
                                  :childs="variationTypeChild"
                >

                </ProductVariation>
              </form>
            </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductVariation from "../../components/products/ProductVariation";
export default {
  name: "_slug",
  components:{ProductVariation},
  data(){
    return {
      product: null
    }
  },
  async asyncData({params, app}) {
    let response = await  app.$axios.$get(`products/${params.slug}`)
    return {
      product: response.data
    }
  }
}
</script>

<style scoped>

</style>
