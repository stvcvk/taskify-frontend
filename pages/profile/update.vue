<template>
	<div>
		<Header />

		<div class="container">
			<div class="card">
				<div class="card-title">Profile Info</div>
				<div class="card-body">
					<div class="message success" v-if="messages.user.success">{{ messages.user.success }}</div>

					<form @submit.prevent="submit">
						<div class="form-group">
							<label>Full Name</label>
							<input type="text" v-model="user.name" @change="disabled = false">	
							<span v-if="messages.user.errors.name">{{ messages.user.errors.name[0] }}</span>
						</div>

						<div class="form-group">
							<label>Email Address</label>
							<input type="text" v-model="user.email" @change="disabled = false">
							<span v-if="messages.user.errors.email">{{ messages.user.errors.email[0] }}</span>
						</div>

						<button class="filled" :class="{ 'disabled': disabled }">Save Changes</button>						
					</form>
				</div>
			</div>

			<div class="card">
					<div class="card-title">Update Password</div>
					<div class="card-body">
						<div class="message error" v-if="messages.password.errors.inline_error">{{ messages.password.errors.inline_error }}</div>
						<div class="message success" v-if="messages.password.success">{{ messages.password.success }}</div>

						<form @submit.prevent="changePassword">
							<div class="form-group">
								<label>Current Password</label>
								<input type="password" v-model="password.current_password">	
								<span v-if="messages.password.errors.current_password">{{ messages.password.errors.current_password[0] }}</span>
							</div>

							<div class="form-group">
								<label>New Password</label>
								<input type="password" v-model="password.password">
								<span v-if="messages.password.errors.password">{{ messages.password.errors.password[0] }}</span>
							</div>

							<div class="form-group">
								<label>Confirm New Password</label>
								<input type="password" v-model="password.password_confirmation">
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
	  	disabled: true,
	  	user: {
	  		name: '',
	  		email: '',
	  	},
	  	password: {
	  		current_password: null,
	  		password: null,
	  		password_confirmation: null,
	  	},

	  	messages: {
	  		user: {
	  			success: null,
	  			errors: [],
	  		},
	  		password: {
	  			success: null,
	  			errors: {
	  				inline_error: null,
	  				errors: [],
	  			},
	  		}
	  	},
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
					this.user.name = response.data.name;
					this.user.email = response.data.email;
				});
			}

			let userData = JSON.parse(localStorage.getItem('current_logged_in_user'));
			this.user.name = userData.name;
			this.user.email = userData.email;
			console.log(this.user['name'], '[ ' + this.user['email'] + ' ]');
		},
		// Update User
		submit() {
			this.$store.dispatch('auth/update', this.user)
				.then(response => {	this.messages.user.success = response.message; })
				.catch(error => { this.messages.user.errors = error.response.data; });
		},
		// Change User Password
		changePassword() {
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.$post('/me/change-password', this.password).then(response => {
				this.messages.password.success = response.data;
			}).catch(error => {
				this.messages.password.errors = [];
				this.messages.password.errors.inline_error = "";
				if (error.response.data.message) this.messages.password.errors.inline_error = error.response.data.message;
				// need small bug fix
				if (error.response.data.password) this.messages.password.errors = error.response.data;
			});
		}
	}
}
</script>

<style>
@import '~/assets/components/login.scss';
@import '~/assets/pages/update.scss';
</style>
