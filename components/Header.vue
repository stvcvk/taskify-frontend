<template>
	<div>
		<header class="menu">
			<div class="menu-container">
				<div class="logo">
					<img src="~/assets/Frame.jpg" alt="logo" style="cursor: pointer" @click="$router.push('/home')">
				</div>
				<div style="flex-grow: 1;"></div>
				<div class="inline" v-if="!$store.state.auth.user">
					<n-link to="/login" class="button full-size">Sign In</n-link>
					<n-link to="/register" class="button full-size darker">Sign Up</n-link>
				</div>

				<div class="inline" v-if="$store.state.auth.user">
					<div class="dropdown">
						<div class="dropdown-title">
							{{ $store.state.auth.user.name }}
							<img src="~/assets/icons/down-arrow.svg" alt="down arrow" id="icon-size" @click="isDropdownActive = !isDropdownActive">
						</div>
						<transition name="dropdown-fade">
							<ul class="dropdown-links" v-if="isDropdownActive" v-on-clickaway="hide">
								<li>
									<n-link to="/profile/update">Account</n-link>
								</li>
								<li>
									<n-link to="/logout">Logout</n-link>
								</li>
							</ul>
						</transition>
					</div>

				</div>
			</div>
		</header>
	
		<ul class="menu" style="background: #F8F8F8;">
			<div class="menu-container">
				<li :class="{ active: menu == 'dashboard' }" @click="menu = 'dashboard'">Dashboard</li>
				<li :class="{ active: menu == 'menage' }" @click="menu = 'menage'">Menage</li>
				<li :class="{ active: menu == 'settings' }" @click="menu = 'settings'">Settings</li>
				<li>Trackings</li>
				<li>Projects</li>
				<li>Tools</li>
			</div>
		</ul>
	</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
	mixins: [ clickaway ],
	data() {
	  return {
	  	active: false,
	  	menu: 'dashboard',
	  	dropdown: false,
	  	isDropdownActive: false,
	  	
	  }
	},
	methods: {
		logout() {
      		this.$store.dispatch('auth/logout').then(response => { this.$router.push('/') }).catch(error => { console.log(error) })
	  	},

	  	hide() {
	  		if (this.isDropdownActive == true) this.isDropdownActive = false;
	  	}
	}
}
</script>
