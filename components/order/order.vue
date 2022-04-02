<template>
  <tr>
    <td>
      #{{ order.id }}
    </td>
    <td>
      {{ order.created_at }}
    </td>
    <td>
      <div v-for="variation in order.products.slice(0,2)" :key='variation.id'>
        <nuxt-link :to="{name: 'products-slug', params:{slug: variation.product.slug}}">{{ variation.product.name }} ({{variation.name}}) - {{variation.type}}</nuxt-link>&nbsp;
      </div>
      <template v-if="order.products.length > 2">
        and {{ order.products.length - 2 }} more
      </template>
    </td>
    <td>{{ order.subtotal }}</td>
    <td>
      <component :is="order.state"></component>
<!--      <OrderStatusPaymentFail></OrderStatusPaymentFail>-->
<!--      <span class="tag" :class="state">-->
<!--        {{ order.state }}-->
<!--      </span>-->
    </td>
  </tr>
</template>

<script>
import OrderStatusPaymentFail from "./states/OrderStatus-payment_fail";
import OrderStatusPaymentPending from "./states/OrderStatus-pending";
import OrderStatusProcesssing from "./states/OrderStatusProcesssing";
import OrderStatusPaymentCompleted from "./states/OrderStatusPaymentCompleted";
export default {
  components:{
    'payment_fail': OrderStatusPaymentFail,
    'pending': OrderStatusPaymentPending,
    'processing': OrderStatusProcesssing,
    'completed': OrderStatusPaymentCompleted
  },
  name: "order",
  props: ['order'],
  // computed: {
  //   state() {
  //     let state
  //     switch (this.order.state) {
  //       case 'pending':
  //         state = 'is-primary'
  //         break
  //       case 'processing':
  //         state = 'is-info'
  //         break
  //       case 'payment_fail':
  //         state = 'is-danger'
  //         break
  //       case 'completed':
  //         state = 'is-success'
  //         break
  //     }
  //     return state
  //   }
  // }
}
</script>

<style scoped>

</style>
