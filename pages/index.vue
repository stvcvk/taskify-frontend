<template>
  <div>
    <h1>Hello World</h1>
    {{ $store.state.auth.user || 'Not Logged In' }}
    <Login />
  </div>
</template>

<script>
import Login from '~/components/auth/Login.vue'
export default {
  components: {
    Login,
  }
}
</script>

<style>
</style>
