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
      <PaymentMethodCreator @addedCard="addPaymentMethod" @cancel="creating=false"></PaymentMethodCreator>

      </template>
      <template v-else>
        <template v-if="localPaymentMethods.length">
          <p>
            {{ selectedPaymentMethod.card_type }} ending {{ selectedPaymentMethod.last_four }}
          </p>
          <br>
        </template>
        <template v-else>
          You don't have any payment cards yet
        </template>
        <div class="field is-grouped">
          <p class="control" v-if="localPaymentMethods.length">
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
import PaymentMethodCreator from "./PaymentMethodCreator";
export default {
  name: "PaymentMethods",
  components: {PaymentMethodCreator, PaymentMethodSelector},
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
      this.selecting = false
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
