<template>
<tr>
  <td width="120">
    <img src="https://via.placeholder.com/150" alt="">
  </td>
  <td>
    {{product.product.name}} / {{product.name}}
  </td>
  <td width="160">
    <div class="field">
      <div class="control">
        <div class="select is-fullwidth">
          <select v-model="quantity">
          <option value="0" v-if="!product.in_stock">0</option>
          <option :key="stock" value="stock" :value="stock" v-for="stock in product.stock_count">
            {{stock}}
          </option>
        </select></div>

      </div>
    </div>
  </td>
  <td>
   {{product.total}}
  </td>
  <td>
    <a @click.prevent="deleteProduct(product.id)">Remove</a>
  </td>
</tr>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      quantity:this.product.quantity
    }
  },
  props:[
    'product'
  ],
  watch:{
    'quantity' (count) {
      this.updateCart({productId:this.product.id, quantity:count})
    }
  },
  name: "CartOverviewProduct",
  components: {},
  methods:{
    ...mapActions({
      deleteProduct: 'cart/destroy',
      updateCart:'cart/update'
    })
  }

}
</script>

<style scoped>

</style>
