<template>
	<div class="timer">
		<modal title="Save Track">
			<div class="form-group">
				<label class="form-label">Project Name</label>
				<dropdown :options="projectOptions" v-model="selectedProject" placeholder="Select Project"/>
			</div>

			<div class="form-group">
				<label class="form-label">Option Name</label>
				<dropdown :options="toolOptions" v-model="selectedTool" placeholder="Select Project"/>
			</div>

			<button class="rounded">Save</button>
			<button class="warning rounded" @click="$bus.$emit('modal-close')">Cancel</button>
		</modal>

		<div class="time">
			<label>Time</label>
			<span>{{ time }}</span>

			<button class="success rounded" @click="$bus.$emit('modal-close')">Save</button>
			<button @click="reset">Reset</button>
		</div>
	</div>
</template>

<script>
import modal from '~/components/modal.vue';
import dropdown from '~/components/dropdown.vue';
import { mapState } from 'vuex';
export default {
	name: 'timer',

	components: { modal, dropdown },

	// Map States as computed property
	computed: mapState({
		time: state => state.timer.formattedTime,
		state: state => state.timer.timerState,
		restored: state => state.timer.restoredTime,
	}),

	data() {
		return {
			projectOptions: [],
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

	// Mounted
	mounted() {
		let store = this.$store;
		let state = this.$store.state.timer;

		if (this.restored) store.commit('timer/FETCH_RESTORED_TIME');

		window.addEventListener('beforeunload', () => {
			store.dispatch('timer/setRestoredTime');
		}, false);
	},

	// Created
	created() {
		this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
		this.$axios.get('/project').then(response => {
			let mapped = response.data.map((item) => {
				return { id: item.id, name: item.name };
			});

			this.projectOptions = mapped;
		}).catch(error => {
			console.log(error);
		});
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