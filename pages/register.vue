<template>
	<div>
		<!--
		<div class="box">
			<form @submit.prevent="submit">
				<input type="text" v-model="fields.name" placeholder="Enter Name">
				<span class="error" v-if="errors.name">{{ errors.name[0] }}</span>
				<input type="text" v-model="fields.email" placeholder="Enter Email address">
				<span class="error" v-if="errors.email">{{ errors.email[0] }}</span>
				<input type="password" v-model="fields.password" placeholder="Enter password">
				<span class="error" v-if="errors.password">{{ errors.password[0] }}</span>
				<input type="password" v-model="fields.password_confirmation" placeholder="Retype Password">
				<button type="submit">Sign Up</button>
			</form>
		</div>
		-->

		<div class="centered m-t-1">
			<div class="login outline-card">
			
				<form @submit.prevent="submit">
					<div class="form-group">
						<label class="form-label">Full Name</label>
						<input class="form-input" v-model="fields.name" type="text">
						<strong class="danger" v-if="errors.name">{{ errors.name[0] }}</strong>
					</div>

					<div class="form-group">
						<label class="form-label">Email Address</label>
						<input class="form-input" v-model="fields.email" type="text">
						<strong class="danger" v-if="errors.email">{{ errors.email[0] }}</strong>
					</div> 

					<div class="form-group">
						<label class="form-label">Password</label>
						<input class="form-input" v-model="fields.password" type="password">
						<strong class="danger" v-if="errors.password">{{ errors.password[0] }}</strong>
					</div>

					<div class="form-group">
						<label class="form-label">Confirm Password</label>
						<input class="form-input" v-model="fields.password_confirmation" type="password">
					</div>

					<div class="form-group">
						<button class="loading form-button" style="width: 100%;">
							<span class="spinner" v-if="spinner"></span>
							Sign Up
						</button>
					</div>
				</form>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'guest',
	data() {
		return {
			fields: {
				name: '',
				email: '',
				password: '',
				password_confirmation: '',
			},
			errors: [],
		};
	},
	methods: {
		submit() {
			this.$store.dispatch('auth/register', this.fields).then(response => {
				this.$store.dispatch('auth/login', { username: this.fields.email, password: this.fields.password })
									 .then(response => { this.$router.push('/home') });
			}).catch(error => { this.errors = error.response.data.errors; })
		},
	},
}
</script>
