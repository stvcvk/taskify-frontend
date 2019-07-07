<template>
	<div class="card" style="margin: 24px 0;">
		<div class="card-title">Profile Info</div>
		<div class="card-body">
			<transition name="dropdown-fade">
				<strong class="success filled" v-if="success">{{ success }}</strong>
			</transition>

			<form @submit.prevent="submit">
				<div class="form-group">
					<label class="form-label">Full Name</label>
					<input class="form-input" type="text" v-model="user.name" @change="disabled = false">	
					<span class="danger" ></span>
				</div>

				<div class="form-group">
					<label class="form-label">Email Address</label>
					<input class="form-input" type="text" v-model="user.email" @change="disabled = false">
					<span class="danger" ></span>
				</div>

				<button class="loading rounded">
					<span class="spinner" v-if="loading"></span>
					Save Changes
				</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'change-user-details',
	data() {
	  return {
	  	loading: false,
	  	user: [],
	  	errors: [],
	  	success: null,
	  }
	},
	created() {
		if (!localStorage.getItem('current_logged_in_user') && localStorage.getItem('token')) {
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.$get('/me').then(response => { this.user = response.data; });
		}

		this.user = JSON.parse(localStorage.getItem('current_logged_in_user'));
	},
	methods: {
		submit() {
			this.loading = true;
			this.$store.dispatch('auth/update', this.user)
				.then(response => {	
					this.success = response.message; this.loading = false; 
					setTimeout(() => { 
						this.success = null;
					}, 8000);
				})
				.catch(error => { this.errors = error.response.data; this.loading = false; });
		}
	},
}
</script>