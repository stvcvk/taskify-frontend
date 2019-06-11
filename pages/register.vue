<template>
	<div>
		<Header />

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
	</div>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
	components: { Header, },
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

<style>
	@import '~/assets/components/login.scss';
</style>