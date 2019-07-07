<template>
	<div class="window-timer">
		<modal title="Save Track">
			<div class="form-group">
				<label for="" class="form-label">Project Name</label>
				<dropdown :options="projectOptions" placeholder="Select Project" v-model="selectedProject"/>
				<strong class="danger">Project is required!</strong>
			</div>

			<div class="form-group">
				<label class="form-label">Tool Used</label>
				<dropdown :options="toolOptions" placeholder="Select Tool" v-model="selectedTool"/>
			</div>

			<div class="form-group">
				<label class="form-label">Bill Hour</label>
			</div>

			<div class="form-group">
				<button class="rounded loading sml">
					<span class="spinner"></span>
					Save Track
				</button>
				<button class="rounded warning sml" @click="$bus.$emit('modal-close')">Cancel</button>
			</div>
		</modal>

		<div class="window-timer-container">
			<h2>{{ time }}</h2>
			<h3>{{ state }}</h3>
			
			<pre>
				{{ JSON.parse(restored) }}
			</pre>

			<div v-if="restored">
				<button class="danger" @click="reset">Reset</button>
				<button @click="start">Resume</button>
				<button class="success" @click="$bus.$emit('modal-close')">Save Track</button>
			</div>

			<div v-if="!restored">
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
	</div>
</template>

<script>
import modal from '~/components/modal.vue';
import dropdown from '~/components/dropdown.vue'
import { mapState } from 'vuex';

export default {
	name: 'window-timer',

	components: { modal, dropdown },

	computed: mapState({
		time: state => state.timer.formattedTime,
		state: state => state.timer.timerState,
		restored: state => state.timer.restoredTime,
	}),

	data() {
		return {
			projectOptions: [
		  		{ id: 0, name: 'Test' },
		  		{ id: 1, name: 'Test 2' },
		  		{ id: 2, name: 'Test 3' },
		  		{ id: 3, name: 'Test 4' },
		  		{ id: 4, name: 'Test 5' },
		  		{ id: 5, name: 'Test 6' },
		  	],
		  	selectedProject: null,

		  	toolOptions: [
		  		{ id: 0, name: 'Test' },
		  		{ id: 1, name: 'Test 2' },
		  		{ id: 2, name: 'Test 3' },
		  		{ id: 3, name: 'Test 4' },
		  		{ id: 4, name: 'Test 5' },
		  		{ id: 5, name: 'Test 6' },
	  		],
	  		selectedTool: null,
		}
	},

	mounted() {
		let store = this.$store;
		let state = this.$store.state.timer;

		if (this.restored) store.commit('timer/FETCH_RESTORED_TIME');

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