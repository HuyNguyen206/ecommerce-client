<template>
<table class="table is-hoverable is-fullwidth">
  <tbody>
  <tr v-for="address in addresses" :key="address.id">
    <td>
      <p :class="{'has-text-weight-bold': address.id == selectedAddressId}">
        {{address.name}} <br>
        {{address.address_1}}<br>
        {{address.city}}<br>
        {{address.country.name}}<br>
        {{address.postal_code}}
      </p>
    </td>
    <td>
      <a class="button is-info" @click.prevent="changeAddress(address)">Ship here</a>
    </td>
  </tr>
  </tbody>
</table>
</template>

<script>
export default {
  name: "ShippingAddressSelector",
  props:['addresses', 'selectedAddressId'],
  methods:{
    changeAddress(address) {
      this.$emit('changeAddress', address)
    }
  }
}
</script>

<style scoped>

</style>
