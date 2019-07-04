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
					<div class="flex">
						<div class="column" @click="openNewWindow">
							<label class="form-label">Total Time Spent This Week</label>
							<span>{{ timeRendered.hours == 0 ? "" : formatNumber(timeRendered.hours) + ':' }}{{ formatNumber(timeRendered.minutes) + ':' }}{{ formatNumber(timeRendered.seconds) }}</span>
						</div>

						<div class="column">
							<label class="form-label">Total Time Spent</label>
							<span>{{ timeRendered.hours == 0 ? "" : formatNumber(timeRendered.hours) + ':' }}{{ formatNumber(timeRendered.minutes) + ':' }}{{ formatNumber(timeRendered.seconds) }}</span>
						</div>
						
						<div class="column">
							<label class="form-label">Money This Week</label>
							<span>$3,000.00</span>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-title">Chart</div>
				<div class="card-body">
					<chart />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header.vue'
import Timer from '~/components/Timer.vue'
import chart from '~/components/chart.vue'
export default {
	middleware: 'authenticated',
	components: { Header, Timer, chart },
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
		},
		openNewWindow() {
			window.open('/trackings', '_blank', "width=405,height=145,resizable=no").focus();
		}
	}
}
</script>