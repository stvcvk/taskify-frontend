<template>
	<div>
		<header class="menu">
			<div class="menu-container">
				<div class="logo">
				</div>
				<div style="flex-grow: 1;"></div>
				<div class="inline" v-if="!$store.state.auth.user">
					<n-link to="/login" class="full-size">Sign In</n-link>
					<n-link to="/register" class="full-size darker">Sign Up</n-link>
				</div>

				<div class="inline" v-if="$store.state.auth.user">
					<p>{{ $store.state.auth.user.name }}</p>
					<img src="~/assets/icons/down-arrow.svg" alt="down arrow" id="icon-size">
					<div class="dropdown">
						<li><n-link to="/account">Account</n-link></li>
						<li><n-link to="/logout">Logout</n-link></li>
					</div>
				</div>
			</div>
		</header>
	
		<ul class="menu" style="background: #F8F8F8;">
			<div class="menu-container">
				<li :class="{ active: menu == 'dashboard' }" @click="menu = 'dashboard'">Dashboard</li>
				<li :class="{ active: menu == 'menage' }" @click="menu = 'menage'">Menage</li>
				<li :class="{ active: menu == 'settings' }" @click="menu = 'settings'">Settings</li>
			</div>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
	  return {
	  	active: false,
	  	menu: 'dashboard',
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
