<template>
	<div>
		<div class="box">
			<form @submit.prevent="submit">
				<span class="error" v-if="error">{{ error }}</span>
				<input type="email" v-model="fields.username" placeholder="Email address">
				<input type="password" v-model="fields.password" placeholder="Password">
				<button type="submit">Sign In</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			fields: {
				username: '',
				password: '',
			},
			error: null,
		}
	},
	methods: {
		submit() {
			this.$store.dispatch('auth/login', this.fields).then(response => {
				if (this.error) this.error = null;
				for (let key in this.fields) {
					this.fields[key] = '';
				}
				this.$router.push('/home');
			}).catch(error => { this.error = error.response.data; });
		}
	}
}
</script>

<style>
	@import url('~/assets/components/login.scss');
</style>
