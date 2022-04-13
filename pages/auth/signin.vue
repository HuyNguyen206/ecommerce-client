<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-6">
          <h1 class="title is-4">Sign in</h1>
          <form action="" @submit.prevent="submit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model="form.email" class="input" type="email" placeholder="e.g. alex@codecourse.com">
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input v-model="form.password" class="input" type="password">
              </div>
            </div>

            <div class="field">
              <p class="control">
                <button class="button is-info is-medium">
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signin",
  middleware:[
    'redirectIfAuthenticated'
  ],
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    async submit() {
      try {
        // const data = await this.$axios.post('/auth/login', this.form)
        await this.$auth.loginWith('laravelJWT', {
          data: this.form
        })
        console.log(data)
      } catch (e) {

      }
      this.$router.replace({
        name: 'index'
      })
    }
  }
}
</script>

<style scoped>

</style>
