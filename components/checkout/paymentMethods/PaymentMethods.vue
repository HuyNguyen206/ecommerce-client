<template>
  <article class="message">
    <div class="message-body">
      <h1 class="title is-5">Payment methods</h1>
      <template v-if="selecting">
      <PaymentMethodSelector
      :paymentMethods="localPaymentMethods"
      :selectedPaymentMethodId="selectedPaymentMethod.id"
      @changePaymentMethod="switchPaymentMethod"
      ></PaymentMethodSelector>

      </template>
      <template v-else-if="creating">
      Create payment method

      </template>
      <template v-else>
        <template>
          <p>
            {{ selectedPaymentMethod.card_type }} ending {{ selectedPaymentMethod.last_four }}
          </p>
          <br>
        </template>
        <div class="field is-grouped">
          <p class="control">
            <a href="" class="button is-info" @click.prevent="selecting = true">
              Change payment method
            </a>
          </p>
          <p class="control">
            <a href="" class="button is-info" @click.prevent="creating = true">
              Add payment method
            </a>
          </p>
        </div>
      </template>
    </div>
  </article>
</template>

<script>

import PaymentMethodSelector from "./PaymentMethodSelector";
export default {
  name: "PaymentMethods",
  components: {PaymentMethodSelector},
  data() {
    return {
      selecting: false,
      localPaymentMethods: this.paymentMethods,
      selectedPaymentMethod: null,
      creating: false
    }
  },
  props: ['paymentMethods'],
  computed: {
    defaultPaymentSelected() {
      return this.localPaymentMethods.find(function (paymentMethod) {
        return paymentMethod.is_default
      })
    }
  },
  methods: {
    switchPaymentMethod(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod

    },
    addPaymentMethod(paymentMethod){
      this.localPaymentMethods.push(paymentMethod)
      this.creating = false
      this.switchPaymentMethod(paymentMethod)
    }
  },
  created() {
    if (this.paymentMethods.length) {
      this.switchPaymentMethod(this.defaultPaymentSelected)
    }
  },
  watch: {
    selectedPaymentMethod(paymentMethod) {
      this.selecting = false
      this.$emit('input', paymentMethod.id)
    }
  }
}
</script>

<style scoped>

</style>
