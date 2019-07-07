<template>
	<div class="timer">
		<div class="time">
			<label>Time</label>
			<span>{{ time }}</span>

			<button @click="reset">Reset</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'timer',

	// Map States as computed property
	computed: mapState({
		time: state => state.timer.formattedTime,
		state: state => state.timer.timerState,
		restored: state => state.timer.restoredTime,
	}),

	// Mounted
	mounted() {
		let store = this.$store;
		let state = this.$store.state.timer;

		if (this.restored) store.commit('timer/FETCH_RESTORED_TIME');

		window.addEventListener('beforeunload', () => {
			store.dispatch('timer/setRestoredTime');
		}, false);
	},

	// Methods
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