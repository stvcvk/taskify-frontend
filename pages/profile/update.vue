<template>
	<div>
		<Header />

		<div class="container">
			<div class="card">
				<div class="card-title">Profile Info</div>
				<div class="card-body">
					<div class="message success" v-if="success_message">{{ success_message }}</div>

					<form @submit.prevent="submit">
						<div class="form-group">
							<label>Full Name</label>
							<input type="text" v-model="fields.name">	
							<span v-if="errors.name">{{ errors.name[0] }}</span>
						</div>

						<div class="form-group">
							<label>Email Address</label>
							<input type="text" v-model="fields.email">
							<span v-if="errors.email">{{ errors.email[0] }}</span>
						</div>

						<button class="filled">Save Changes</button>						
					</form>
				</div>
			</div>

			<div class="card">
					<div class="card-title">Update Password</div>
					<div class="card-body">
						<div class="message success" v-if="success_message">{{ success_message }}</div>

						<form @submit.prevent="changePassword">
							<div v-if="password_success_message">{{ password_success_message }}</div>
							<div class="form-group">
								<label>Current Password</label>
								<input type="password" v-model="fields_password.current_password">	
							</div>

							<div class="form-group">
								<label>New Password</label>
								<input type="password" v-model="fields_password.password">
							</div>

							<div class="form-group">
								<label>Confirm New Password</label>
								<input type="password" v-model="fields_password.password_confirmation">
							</div>

							<button class="filled">Update Password</button>						
						</form>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
	middleware: 'authenticated',
	components: { Header, },
	data() {
	  return {
	  	fields: {
	  		name: '',
	  		email: ''
	  	},
	  	fields_password: {
	  		current_password: null,
	  		password: null,
	  		password_confirmation: null,
	  	},
	  	errors: [],
	  	success_message: null,
	  	password_success_message: null,
	  }
	},
	mounted() {
		this.onLoad();
	},
	methods: {
		onLoad() {
			if (!localStorage.getItem('current_logged_in_user') && localStorage.getItem('token')) {
				this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
				this.$axios.$get('/me').then(response => {
					this.fields.name = response.data.name;
					this.fields.email = response.data.email;
				});
			}

			let userData = JSON.parse(localStorage.getItem('current_logged_in_user'));
			this.fields.name = userData.name;
			this.fields.email = userData.email;
		},
		// Update User
		submit() {
			this.$store.dispatch('auth/update', this.fields)
				.then(response => {	this.success_message = response.message; })
				.catch(error => { this.errors = error.response.data; });
		},
		// Change User Password
		changePassword() {
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.$post('/me/change-password', this.fields_password).then(response => {
				this.password_success_message = response.message;
			}).catch(error => { console.log(error); });
		}
	}
}
</script>

<style>
@import '~/assets/components/login.scss';
@import '~/assets/pages/update.scss';
</style>
