<template>
	<div class="header">
		<div class="container">
			<h2>Taskify</h2>

			<div style="flex-grow: 1;"/>

			<div class="logged-in-details" v-if="$store.state.auth.user">
				<div class="auth">
					<span>{{ $store.state.auth.user.name }}</span>
					<img src="~/assets/icons/down-arrow.svg" alt="arrow down" id="icon" @click="active = !active">
					<div class="dropdown" :class="{ 'active': active }">
						<nuxt-link to="/profile/update">Account</nuxt-link>
						<nuxt-link to="/logout">Logout</nuxt-link>
					</div>
				</div>
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
	data() {
	  return {
	  	active: false,
	  }
	},
	methods: {
		logout() {
      this.$store.dispatch('auth/logout').then(response => { this.$router.push('/') })
						.catch(error => { console.log(error) })
    },
	}
}
</script>
