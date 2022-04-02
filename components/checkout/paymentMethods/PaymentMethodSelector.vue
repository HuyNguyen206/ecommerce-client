<template>
  <table class="table is-hoverable is-fullwidth">
    <tbody>
    <tr v-for="paymentMethod in paymentMethods" :key="paymentMethod.id">
      <td>
        <p :class="{'has-text-weight-bold': paymentMethod.id == selectedPaymentMethodId}">
          {{paymentMethod.card_type}} ending {{ paymentMethod.last_four }}<br>
        </p>
      </td>
      <td>
        <a class="button is-info" @click.prevent="changePaymentMethod(paymentMethod)">Pay with this</a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PaymentMethodSelector",
  props:['paymentMethods', 'selectedPaymentMethodId'],
  methods:{
    changePaymentMethod(paymentMethod) {
      this.$emit('changePaymentMethod', paymentMethod)
    }
  }
}
</script>

<style scoped>

</style>
