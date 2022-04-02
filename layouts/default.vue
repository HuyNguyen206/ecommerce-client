<template>
<div>
  <Navigation></Navigation>
  <div class="container">
    <TheAlert></TheAlert>
  </div>
  <nuxt></nuxt>
</div>
</template>

<script>
import Navigation from "./paritals/navigation";
import TheAlert from "../components/globals/TheAlert";
export default {
  name: "default.vue",
  components: {TheAlert, Navigation}

}
</script>

<style scoped>

</style>
