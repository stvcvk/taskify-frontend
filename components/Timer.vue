<template>
	<div class="timer">
		<div class="time">
			<label>Time</label>
			<span>{{ formattedTime }}</span>
		</div>

		<div class="project">
			<label>Project name</label>
			<span>My Newiest Project</span>
		</div>

		<div class="helper" v-if="helper" v-on-clickaway="closeHelper">
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
				<button class="rounded loading sml" @click="store">
					<span class="spinner" v-if="loading"></span>
					Save Track
				</button>
				<button class="rounded warning sml" @click="helper = false">Cancel</button>
			</div>
		</div>

		<div class="timer-controls">
			<div class="push">
				<div v-if="killedTime">
					<button class="warning" v-if="killedTime" @click="start">
						Resume
					</button>

					<button class="danger" v-if="killedTime" @click="resetKilledTime">
						Reset
					</button>

					<button class="success icon" v-if="killedTime">
						Save Track
					</button>
				</div>

				<div v-if="!killedTime">
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
		</div><!-- .timer controls -->
	</div>
</template>

<script>
import dropdown from '~/components/dropdown.vue';
import { mixin as clickaway } from 'vue-clickaway';

export default {
	mixins: [ clickaway ],
	components: { dropdown },
	name: 'timer',
	data() {
		return {
			state: 'stopped',
	  		currentTime: 0,
	  		formattedTime: "00:00:00",
	  		ticker: undefined,
	  		helper: false,
	  		loading: false,
	  		killedTime: localStorage.getItem('killedTime') || null,

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
		window.addEventListener('beforeunload', () => {
			this.onRefresh();
		}, false);

		if (localStorage.getItem('killedTime')) {
			let killedTime = JSON.parse(localStorage.getItem('killedTime'));
			this.currentTime = killedTime.currentTime;
			this.formattedTime = killedTime.formattedTime;
		}
	},
	methods: {
	start() { 
		if (this.killedTime) localStorage.removeItem('killedTime'); this.killedTime = null;
	  	if (this.state !== 'running') {
	  		this.tick(); 
	  		this.state = 'running'; 
	  	};
	  },
	  tick() {
	    this.ticker = setInterval(() => {
	  		this.currentTime++;
	  		this.formattedTime = this.formatTime(this.currentTime);
	  	}, 1000);
	  },
	  formatTime(secounds) {
	  	let measturedTime = new Date(null);
	  	measturedTime.setSeconds(secounds);
	  	let MHSTime = measturedTime.toISOString().substr(11, 8);
	  	return MHSTime;
	  },
	  pause() {
	  	window.clearInterval(this.ticker);
	  	this.state = 'paused';
	  },
	  stop() {
	  	window.clearInterval(this.ticker);
	  	this.state = 'finished';
	  	this.helper = true;
	  },
	  store() {
	  	this.loading = true;
	  	//this.$store.dispatch('publishTrack', { time: this.formattedTime, project_id: this.fields.project_id, tool_used: this.fields.tool_used })
	  	this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.post('/track', { time: this.formattedTime, totalTime: this.currentTime })
				.then(res => { console.log(res); this.loading = false; }).catch(err => { console.log(err); this.loading = false; });	  	

		if (this.killedTime) this.killedTime = null; localStorage.removeItem('killedTime');
	  	this.currentTime = 0;
	  	this.formattedTime = "00:00:00";
	  	this.state = 'stopped';
	  	this.helper = false;
	  },
	  onRefresh() {
	  	if (localStorage.getItem('killedTime')) {
	  		return;
	  	}

	  	if (this.currentTime >= 1) {
	  		let data = { 'currentTime': this.currentTime, 'formattedTime': this.formattedTime };
	  		localStorage.setItem('killedTime', JSON.stringify(data));
	  	}
	  },
	  resetKilledTime() {
	  	this.killedTime = null;
	  	localStorage.removeItem('killedTime');
	  	this.currentTime = 0;
	  	this.formattedTime = "00:00:00";
	  },
	  closeHelper() {
	  	this.helper = false;
	  }
	}
}
</script>