<template>
	<div>
		<Header />

		<div class="container">
			<div class="card">
				<div class="card-title">Change User Informations</div>
				<div class="card-body">
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

						<button>Save Changes</button>						
					</form>
				</div>
			</div>
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
	  		email: ''
	  	},
	  	errors: [],
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
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.$post('/me/update', this.fields)
				.then(response => {
					console.log('updated!')
					console.log(response)
					localStorage.removeItem('current_logged_in_user');
					this.$store.commit('auth/setUser', response.data);
					localStorage.setItem('current_logged_in_user', JSON.stringify(response.data));
				}).catch(error => {
					this.errors = error.response.data;
				})
		}
	}
}
</script>

<style>
@import '~/assets/components/login.scss';
@import '~/assets/pages/update.scss';
</style>
