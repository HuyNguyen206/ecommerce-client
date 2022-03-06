<template>
  <div class="field">
    <label class="label">
      {{type}}
    </label>
    <div class="control">
      <div class="select is-fullwidth">
        <select>
          <option value="" disabled>--Please choose--</option>
          <option v-for="child in childs" :key="child.id" :value="child.id">
            {{child.name}}
            <template v-if="child.price_varies">
              ({{child.price}})
            </template>
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['type', 'childs'],
  name: "ProductVariation"
}
</script>

<style scoped>

</style>
