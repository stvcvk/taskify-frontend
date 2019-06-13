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
				
				<div class="card">
					<div class="card-title">Update Password</div>
					<div class="card-body">
					<div class="message success" v-if="success_message">{{ success_message }}</div>

					<form @submit.prevent="submit">
						<div class="form-group">
							<label>Current Password</label>
							<input type="text" v-model="fields.name">	
							<span v-if="errors.name">{{ errors.name[0] }}</span>
						</div>

						<div class="form-group">
							<label>New Password</label>
							<input type="text" v-model="fields.email">
							<span v-if="errors.email">{{ errors.email[0] }}</span>
						</div>

						<div class="form-group">
							<label>Confirm New Password</label>
							<input type="text" v-model="fields.email">
							<span v-if="errors.email">{{ errors.email[0] }}</span>
						</div>

						<button class="filled">Update Password</button>						
					</form>
				</div>
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
	  		new_password: null,
	  		password_confirmation: null,
	  	},
	  	errors: [],
	  	success_message: null,
	  }
	},
	mounted() {
		this.onLoad();
	},
	methods: {
		onLoad() {
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.$get('/me').then(response => {
				this.fields.name = response.data.name;
				this.fields.email = response.data.email;
			});
		},
		submit() {
			this.$store.dispatch('auth/update', this.fields)
				.then(response => {	this.success_message = response.message; })
				.catch(error => { this.errors = error.response.data; });
		}
	}
}
</script>

<style>
@import '~/assets/components/login.scss';
@import '~/assets/pages/update.scss';
</style>
