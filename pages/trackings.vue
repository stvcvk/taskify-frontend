<template>
	<div>
		<Header />
		
		<div class="container">
			<div class="card">
				<div class="card-title">Trackings</div>
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
			trackings: [],
		}
	},
	methods: {
		fetch() {

		},
	}
}
</script>