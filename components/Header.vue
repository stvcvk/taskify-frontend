<template>
	<div>
		<header class="menu">
			<div class="menu-container">
				<div class="logo">
					<img src="~/assets/Frame.jpg" alt="logo" style="cursor: pointer" @click="$router.push('/home')">
				</div>
				<div style="flex-grow: 1;"></div>
				<div class="inline" v-if="!user">
					<n-link to="/login" class="button full-size">Sign In</n-link>
					<n-link to="/register" class="button full-size darker">Sign Up</n-link>
				</div>

				<div class="inline" v-if="user">
					<div class="dropdown">
						<div class="dropdown-title">
							{{ user.name }}
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
				<li :class="{ active: currentPage == 'home' }" @click="$router.push('/home')">Home</li>
				<li :class="{ active: currentPage == 'trackings' }" @click="$router.push('/trackings')">Trackings</li>
				<li :class="{ active: currentPage == 'projects' }" @click="$router.push('/projects')">Projects</li>
				<li :class="{ active: currentPage == 'settings' }">Tools</li>
			</div>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';

export default {
	mixins: [ clickaway ],
	computed: mapState({ user: state => state.auth.user, }),
	data() {
	  return {
	  	active: false,
	  	menu: 'dashboard',
	  	dropdown: false,
	  	isDropdownActive: false,
	  	currentPage: $nuxt.$route.name,
	  	trackings: [],
	  }
	},
	created() {
		this.get();
	},
	methods: {
		logout() {
      		this.$store.dispatch('auth/logout').then(response => { this.$router.push('/') }).catch(error => { console.log(error) })
	  	},

	  	hide() {
	  		if (this.isDropdownActive == true) this.isDropdownActive = false;
	  	},

	  	get() {
			this.$axios.get('/track').then(res => {
				this.trackings = res.data;
				//let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			});


	  	}
	}
}
</script>
