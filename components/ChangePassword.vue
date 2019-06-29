<template>
	<div class="card">
		<div class="card-title">Change Password</div>
		<div class="card-body">
			<strong class="success filled" v-if="success">{{ success }}</strong>
			<strong class="danger filled" v-if="inline_error">{{ inline_error }}</strong>
			<form @submit.prevent="submit">
				<div class="form-group">
					<label class="form-label">Current Password</label>
					<input class="form-input" type="password" v-model="password.current_password">	
					<strong class="danger" v-if="errors.current_password">{{ errors.current_password[0] }}</strong>
				</div>

				<div class="form-group">
					<label class="form-label">New Password</label>
					<input class="form-input" type="password" v-model="password.password">
					<strong class="danger" v-if="errors.password">{{ errors.password[0] }}</strong>
				</div>

				<div class="form-group">
					<label class="form-label">Confirm New Password</label>
					<input class="form-input" type="password" v-model="password.password_confirmation">
				</div>

				<button class="loading rounded">
					<div class="spinner" v-if="loading"></div>
					Change Password
				</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
	  return {
	  	password: { current_password: null, password: null, password_confirmation: null, },
	  	loading: false,
	  	success: null,
	  	errors: [],
	  	inline_error: null,
	  }
	},
	methods: {
		submit() {
			this.loading = true;
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.$post('/me/change-password', this.password).then(response => {
				console.log(response)
				this.errors = [];
				this.inline_error = null;
				this.success = response.message;
				this.loading = false;
			}).catch(error => {
				this.loading = false;
				this.errors = [];
				this.inline_error = null;
				console.log(error);
				if (error.response.data.message) this.inline_error = error.response.data.message;
				if (error.response.data.password) this.errors = error.response.data;
			});
		},
	}
}
</script>