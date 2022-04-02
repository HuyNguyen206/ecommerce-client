<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title is-4">Your orders</h1>

          <article class="message" v-if="this.orders.length">
            <div class="message-body">
              <table class="table is-hoverable is-fullwidth">
                <tbody>
                  <order v-for="order in this.orders" :key="order.id" :order="order"></order>
                </tbody>
              </table>
            </div>
          </article>
          <p v-else>
            You have no orders
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Order from "../../components/order/order";
export default {
  middleware: 'auth',
  data(){
    return {
      orders: []
    }
  },
  name: "index",
  components: {Order},

  async asyncData({app}) {
    let res = await app.$axios.$get('orders')
    return {
      orders: res.data
    }
  }
}
</script>

<style scoped>

</style>
