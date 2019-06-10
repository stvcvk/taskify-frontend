<template>
	<div class="header">
		<div class="container">
			<h2>Just Demo</h2>

			<div style="flex-grow: 1;"/>

			<div v-if="$store.state.auth.user">
				<span>{{ $store.state.auth.user.name }}</span>
				<a @click="logout">Logout</a>
			</div>
			<div class="login-navigation" v-else>
				<nuxt-link to="/login">Sign In</nuxt-link>
				<nuxt-link class="filled" to="/register">Sign Up</nuxt-link>
			</div>
		</div>	
	</div>
</template>

<script>
export default {
	methods: {
		logout() {
      this.$store.dispatch('auth/logout').then(response => { this.$router.push('/') })
    },
	}
}
</script>

<style>
	@import '~/assets/components/header.scss';
</style>