<template>
	<div>
		<Header />

		<div class="centered m-t-1">
			<div class="outline-card">
				<form @submit.prevent="submit">
					<strong class="danger" v-if="error">{{ error }}</strong>

					<div class="form-group">
						<label class="form-label">Email Address</label>
						<input class="form-input" v-model="fields.username" type="text">
					</div>

					<div class="form-group">
						<label class="form-label">Password</label>
						<input class="form-input" v-model="fields.password" type="password">
					</div>

					<div class="form-group">
						<button class="loading">
							<span class="spinner" v-if="spinner"></span>
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>

	</div>
</template>

<script>
import Header from '~/components/Header.vue';	
export default {
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