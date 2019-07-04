<template>
	<div>
		<Header />
		
		<div class="container">
			<button class="rounded">Create New</button>
		</div>

		<div class="container">
			<div class="card">
				<div class="card-title">List Projects</div>
				<div class="card-body">
					<h1>Hello World</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
	components: { Header },
	data() {
		return {
			projects: [],
		}
	},
	methods: {
		fetch() {

		},
	}
}
</script>