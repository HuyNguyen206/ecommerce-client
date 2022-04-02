<template>
<div class="notification is-info" v-if="alert" @click="clear" >
  {{alert}}
</div>
</template>

<script>
import {mapGetters} from "vuex";
import {mapActions} from "vuex";

export default {
  name: "TheAlert",
 methods:{
    ...mapActions({
      clear:'alert/clear'
    })
 },
  computed:{
    ...mapGetters({
      alert: 'alert/message'
    })
  }
}
</script>

<style scoped>

</style>
