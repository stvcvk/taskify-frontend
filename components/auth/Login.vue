<template>
	<div>
		<form @submit.prevent="submit">
			<input type="email" v-model="fields.username">
			<input type="password" v-model="fields.password">
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			fields: {
				username: '',
				password: '',
			}
		}
	},
	methods: {
		submit() {
			this.$store.dispatch('auth/login', this.fields).then(response => {
				for (let key in this.fields) {
					this.fields[key] = '';
				}
			}).catch(error => { console.log(error) });
		}
	}
}
</script>
