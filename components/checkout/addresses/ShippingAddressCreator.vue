<template>
  <form @submit.prevent="addNewAddress">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" v-model="form.name">
      </div>
    </div>

    <div class="field">
      <label class="label">Address line 1</label>
      <div class="control">
        <input class="input" type="text" v-model="form.address_1">
      </div>
    </div>

    <div class="field">
      <label class="label">City</label>
      <div class="control">
        <input class="input" type="text" v-model="form.city">
      </div>
    </div>

    <div class="columns">
      <div class="column is-6">
        <div class="field">
          <label class="label">Postal code</label>
          <div class="control">
            <input class="input" type="text" v-model="form.postal_code">
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="form.country_id">
                <option value="">Please select</option>
                <option v-for="country in countries" :key="country.id" :value="country.id">{{country.name}} ({{country.code}})</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <p class="control">
        <button class="button is-info">
          Add address
        </button>
        <a class="button is-text" @click.prevent="$emit('cancel')">Cancel</a>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: "ShippingAddressCreator",
  data(){
    return {
      form:{
        name: '',
        address_1:'',
        city: '',
        postal_code: '',
        country_id: ''
      },
      countries:[]
    }
  },
  methods:{
    async addNewAddress(){
       const res = await this.$axios.$post('addresses', this.form)
      this.$emit('createdAddress', res.data)
    }
  },
  async created() {
    const res = await this.$axios.$get('countries')
    this.countries = res
  }
  // async asyncData({app}) {
  //   let data = await app.$axios.$get('addresses')
  //   return {addresses: data.data}
  // }
}
</script>

<style scoped>

</style>
