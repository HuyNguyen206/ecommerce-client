<template>
  <div class="field">
    <label class="label">
      {{type}}
    </label>
    <div class="control">
      <div class="select is-fullwidth">
        <select :value="selectedVariationId" @change="changed($event,type)">
          <option value="" >--Please choose--</option>
          <option  v-for="child in childs" :key="child.id" :value="child.id" :disabled="!child.in_stock">
            {{child.name}}
            <template v-if="child.price_varies">
              ({{child.price}})
            </template>
            <template v-if="!child.in_stock">
            (out of stock)
            </template>
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    type:{
      required: true
    },
    childs:{
      required:true
    },
    value: {
      required: false,
      default: ''
    }
  },
  name: "ProductVariation",
  methods:{
    changed(event, type){
      this.$emit('input', this.findVariation(event.target.value))
    },
    findVariation(id){
      let selectedChildObject = this.childs.find(c => c.id == id )
      if(typeof selectedChildObject === 'undefined') {
        return null
      }
      return  selectedChildObject
    },
  },
  computed:{
    selectedVariationId(){
      var variation = null
      if (this.value) {
         variation = this.findVariation(this.value.id)
      }
      // console.log(variation)
      return variation ? variation.id : ''
    }
  }
}
</script>

<style scoped>

</style>
