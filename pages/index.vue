<template>
  <div>
    <h1>Hello World</h1>
    {{ $store.state.auth.user || 'Not Logged In' }} <a @click="logout">Logout</a>
    <Login />
  </div>
</template>

<script>
import Login from '~/components/auth/Login.vue'
export default {
  components: {
    Login,
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(response => { console.log(response) })
        .catch(error => { console.log(error) })
    },
  }
}
</script>

<style>
</style>
