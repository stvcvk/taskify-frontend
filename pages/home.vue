<template>
	<div>
		<Header />

		<div class="container">
			<div class="card">
				<div class="card-title">Track Time</div>
				<div class="card-body">
						<input type="text" placeholder="Name">
						<Timer />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header.vue'
import Timer from '~/components/Timer.vue'
export default {
	middleware: 'authenticated',
	components: { Header, Timer, }
}
</script>