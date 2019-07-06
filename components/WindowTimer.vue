<template>
	<div class="window-timer">
		<div class="window-timer-container">
			<h2>{{ time }}</h2>
			<h3>{{ state }}</h3>
			
			<pre>
				{{ JSON.parse(restored) }}
			</pre>

			<button class="danger" v-if="restored" @click="reset">Reset</button>

			<button class="success icon" v-if="state != 'running'" @click="start">
				<img src="~/assets/start.svg">
				Start
			</button>

			<button class="warning" v-if="state == 'running'" @click="pause">
				<img src="~/assets/pause.svg">
				Pause
			</button>

			<button class="danger" @click="stop">
				<img src="~/assets/stop.svg">
				Stop
			</button>

		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'window-timer',

	computed: mapState({
		time: state => state.timer.formattedTime,
		state: state => state.timer.timerState,
		restored: state => state.timer.restoredTime,
	}),

	mounted() {
		let store = this.$store;
		let state = this.$store.state.timer;

		window.addEventListener('beforeunload', () => {
			store.dispatch('timer/setRestoredTime');
		}, false);
	},

	methods: {
		// START TIMER
		start() {
			let store = this.$store;
			let state = this.$store.state.timer;

			if (state.timerState !== 'running') {
				store.commit('timer/SET_TIMER_STATE', 'running');

				let ticker = setInterval(() => {
					store.commit('timer/INCREMENT_TIME');
					store.commit('timer/SET_FORMATTED_TIME', state.currentTime);
				}, 1000);

				store.dispatch('timer/tick', { ticker: ticker });
			}
		},
		// PAUSE TIMER
		pause() {
			let store = this.$store;
			let state = this.$store.state.timer;
			window.clearInterval(state.ticker);
			store.commit('timer/SET_TIMER_STATE', 'paused');
		},
		// STOP TIMER
		stop() {
			let store = this.$store;
			let state = this.$store.state.timer;
			window.clearInterval(state.ticker);
			store.commit('timer/SET_TIMER_STATE', 'stopped');
		},
		// RESET RESTORED TIME
		reset() {
			let store = this.$store;
			store.commit('timer/RESET_RESTORED_TIME');
		},
	}
}
</script>