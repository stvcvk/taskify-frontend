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

			<div class="card">
				<div class="card-title">Total Time Spent</div>
				<div class="card-body">
					<label class="form-label">Total Time Spent</label>
					{{ timeRendered.hours == 0 ? "" : formatNumber(timeRendered.hours) }} {{ formatNumber(timeRendered.minutes) }}:{{ formatNumber(timeRendered.seconds) }}
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
	components: { Header, Timer, },
	data() {
		return {
			timeRendered: {},
		}
	},
	created() {
		this.$axios.get('/track').then(res => { this.timeRendered = res.data; });
	},
	methods: {
		formatNumber(number) {
			return number > 9 ? number : "0" + number;
		}
	}
}
</script>