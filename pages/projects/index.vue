<template>
	<div>
		<Header />

		<modal title="Create Project">
			<form @submit.prevent="store">
			<div class="form-group">
				<label class="form-label">Project Name</label>
				<input type="text" v-model="fields.name" class="form-input" @change="onType">
			</div>

			<div class="form-group">
				<label class="form-label">Slug</label>
				<div style="display: flex; align-items: center;" v-if="autogenerating">
					<div class="spinner" style="margin-right: 12px;"></div>
					<p style="font-size: 14px;">Waiting for project name...</p>
				</div>
				<div v-else>
					<p>triton-i-skoljkaboj</p>
				</div>
			</div>

			<div class="form-group">
				<label class="form-label">Client</label>
				<dropdown :options="mappedClients" v-model="fields.client_id" placeholder="Select Client"/>
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
<!--
		<div class="container">
			<div class="project-card card">
				<div class="card-title">List Projects ({{ filterProjects.length }})</div>
				<div class="card-body">
					<input type="text" v-model="search" class="form-input" placeholder="Search for project...">

					<div class="each-project special-card" v-for="project in filterProjects">
						<p>{{ project.name }}</p>
						<button>View Project</button> 
					</div>
				</div>
			</div>
		</div>
	-->

		<div class="container">
			<input type="text" v-model="search" class="form-input" placeholder="Filter by name, address...">
		</div>

		<div class="container">
			<table class="table">
			  <tr>
			    <th>Name</th>
			    <th>Address</th>
			    <th></th>
			  </tr>
			  <tr v-for="project in filterProjects">
					<td>{{ project.name }}</td>
					<td>{{ project.client.address }}</td>
					<td class="control">
						<button class="sml" @click="redirect(project.id)">View Project</button>
					</td>
			  </tr>
			</table>
			<div class="error" v-if="filterProjects.length === 0">
			  	No results found!
			  </div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Header from '~/components/Header.vue'
import modal from '~/components/modal.vue'
import dropdown from '~/components/dropdown.vue'
export default {
	components: { Header, modal, dropdown },
	computed: {
		...mapGetters('clients', ['mappedClients']),
		filterProjects() {
			return this.projects.filter(project => {
				return project.name.toLowerCase().match(this.search.toString().toLowerCase());
			});
		}
	},
	data() {
		return {
			autogenerating: true,
			fields: {
				name: '',
				client_id: null
			},
			clients: null,
			projects: [],
			search: '',
		};
	},
	created() {
		this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
		this.$axios.get('/project').then(response => {
			this.projects = response.data;
		}).catch(error => {
			console.log(error);
		});

		this.$store.dispatch('clients/fetch');
		console.log(this.$store.getters['clients/mappedClients']);
	},
	methods: {
		redirect(id) {
			this.$router.push(`/projects/${id}`);
		},

		onType() {
			this.autogenerating = false;
		},

		store() {
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.post('/project', { name: this.fields.name, client_id: this.fields.client_id.id }).then(response => {
				this.projects.push(response.data);
				this.$bus.$emit('modal-close');
				this.fields.name = '';
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>