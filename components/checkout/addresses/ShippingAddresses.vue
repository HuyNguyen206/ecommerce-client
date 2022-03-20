<template>
  <article class="message">
    <div class="message-body">
      <h1 class="title is-5">Ship to</h1>
      <template v-if="selecting">
        <ShippingAddressSelector :selectedAddressId="selectedAddress.id" @changeAddress="switchAddress"
                                 :addresses="localAddresses"></ShippingAddressSelector>
      </template>
      <template v-else>
        <template>
          <p>
            {{ selectedAddress.name }} <br>
            {{ selectedAddress.address_1 }} <br>
            {{ selectedAddress.city }} <br>
            {{ selectedAddress.postal_code }} <br>
            {{ selectedAddress.country.name }} <br>
          </p>
          <br>
        </template>
        <div class="vield is-grouped">
          <p class="control">
            <a href="" class="button is-info" @click.prevent="selecting = true">
              Change shipping address
            </a>
          </p>
        </div>
      </template>
    </div>
  </article>
</template>

<script>
import ShippingAddressSelector from "./ShippingAddressSelector";

export default {
  name: "ShippingAddresses",
  components: {ShippingAddressSelector},
  data() {
    return {
      selecting: false,
      localAddresses: this.addresses,
      selectedAddress: null
    }
  },
  props: ['addresses'],
  computed: {
    defaultAddress() {
      return this.localAddresses.find(function (address) {
        return address.is_default
      })
    }
  },
  methods: {
    switchAddress(address) {
      this.selectedAddress = address

    }
  },
  created() {
    if (this.addresses.length) {
      this.switchAddress(this.defaultAddress)
    }
  },
  watch: {
    selectedAddress() {
      this.selecting = false
    }
  }
}
</script>

<style scoped>

</style>
