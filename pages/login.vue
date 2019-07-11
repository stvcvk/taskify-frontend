<template>
	<div>
		<div class="centered m-t-1">
			<div class="login outline-card">
				<!--<img id="logo" src="~/assets/Frame.jpg"/>-->

				<form @submit.prevent="submit">
					<div class="form-group">
						<strong class="danger filled" v-if="error">{{ error }}</strong>
					</div>
					<div class="form-group">
						<label class="form-label">Email Address / Username</label>
						<input class="form-input" v-model="fields.username" type="text">
					</div>

					<div class="form-group">
						<label class="form-label">Password</label>
						<input class="form-input" v-model="fields.password" type="password">
					</div>

					<div class="form-group">
						<button class="loading form-button" style="width: 100%;">
							<span class="spinner" v-if="spinner"></span>
							Sign In
						</button>

						<n-link to="/register" class="form-link-text">Register Now</n-link>
					</div>
				</form>
			</div>
		</div>

	</div>
</template>

<script>
import Header from '~/components/Header.vue';	
export default {
	middleware: 'guest',
	components: { Header, },
	data() {
	  return {
	  	spinner: false,
	  	error: null,
	  	fields: {
	  		username: null,
	  		password: null,
	  	},
	  }
	},
	methods: {
		submit() {
			this.spinner = true;
			this.$store.dispatch('auth/login', this.fields)
				.then(res => { 
					console.log(res)
					this.$router.push('/home');
				 })
				.catch(err => { 
					this.error = err.response.data;
					this.spinner = false;
				})
		}
	},
}
</script>