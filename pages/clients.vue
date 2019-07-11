<template>
	<div>
		<Header />

		<modal title="Create Project">
			<form @submit.prevent="store">
			<div class="form-group">
				<label class="form-label">Client Name</label>
				<input type="text" v-model="fields.name" class="form-input">
				<strong class="danger" v-if="errors.name">{{ errors.name[0] }}</strong>
			</div>

			<div class="form-group">
				<label class="form-label">Client Address</label>
				<input type="text" v-model="fields.address" class="form-input">
				<strong class="danger" v-if="errors.address">{{ errors.address[0] }}</strong>
			</div>

			<div class="form-group">
				<label class="form-label">Client Phone Number</label>
				<input type="text" v-model="fields.mobile_number" class="form-input">
				<strong class="danger" v-if="errors.mobile_number">{{ errors.mobile_number[0] }}</strong>
			</div>

			<div class="form-group">
				<button class="rounded loading" type="submit">
					<span class="spinner"></span>
					Save Project
				</button>
				<button class="warning rounded" @click="$bus.$emit('modal-close')">Cancel</button>
			</div>
			</form>
		</modal>

		<div class="container">
			<button class="rounded" @click="$bus.$emit('modal-close')">Create New</button>
		</div>

		<div class="container each-client" v-for="client in clients">
			<h2>{{client.name}}</h2>
			<span>{{client.mobile_number}}</span>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '~/components/Header.vue';
import modal from '~/components/modal.vue';
export default {
	components: { Header, modal },

	computed: mapState({
		clients: state => state.clients.clients,
	}),

	data() {
		return {
			fields: {
				name: '',
				address: '',
				mobile_number: '',
			},

			errors: [],
		};
	},

	created() {
		// Fetch clients from api
		let store = this.$store;
		store.dispatch('clients/fetch');

		this.$bus.$on('modal-close', () => {
			this.errors = [];
		});
	}, 
	methods: {
		store() {
			this.$store.dispatch('clients/store', this.fields).then(response => {
				this.$bus.$emit('modal-close');
			}).catch(error => {
				this.errors = error.response.data;
			});
		},
	}
}
</script>