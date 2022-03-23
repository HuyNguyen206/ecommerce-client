<template>
  <article class="message">
    <div class="message-body">
      <h1 class="title is-5">Ship to</h1>
      <template v-if="selecting">
        <ShippingAddressSelector :selectedAddressId="selectedAddress.id" @changeAddress="switchAddress"
                                 :addresses="localAddresses"></ShippingAddressSelector>
      </template>
      <template v-else-if="creating">
           <ShippingAddressCreator @createdAddress="addAddress" @cancel="creating = false"></ShippingAddressCreator>

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
        <div class="field is-grouped">
          <p class="control">
            <a href="" class="button is-info" @click.prevent="selecting = true">
              Change shipping address
            </a>
          </p>
          <p class="control">
            <a href="" class="button is-info" @click.prevent="creating = true">
              Add an address
            </a>
          </p>
        </div>
      </template>
    </div>
  </article>
</template>

<script>
import ShippingAddressCreator from "./ShippingAddressCreator";
import ShippingAddressSelector from "./ShippingAddressSelector";

export default {
  name: "ShippingAddresses",
  components: {ShippingAddressSelector, ShippingAddressCreator},
  data() {
    return {
      selecting: false,
      localAddresses: this.addresses,
      selectedAddress: null,
      creating: false
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

    },
    addAddress(address){
      this.localAddresses.push(address)
      this.creating = false
      this.switchAddress(address)
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
