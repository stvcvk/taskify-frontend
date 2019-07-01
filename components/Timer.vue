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
				<select>
					<option>Test</option>
					<option>Test 2</option>
				</select>
			</div>

			<div class="form-group">
				<label for="" class="form-label">Select Tool</label>
				<select>
					<option>Photoshop</option>
					<option>Illustrator</option>
				</select>
			</div>

			<div class="form-group">
				<button class="rounded sml">Save Track</button>
			</div>
		</div>

		<div class="timer-controls">
			<div class="push">
				<button class="success icon" v-if="killedTime">
					Save Track
				</button>

				<button class="warning" v-if="killedTime" @click="resetKilledTime">
					Resume
				</button>

				<button class="danger" v-if="killedTime">
					Reset
				</button>

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
import { mixin as clickaway } from 'vue-clickaway';

export default {
	mixins: [ clickaway ],
	name: 'timer',
	data() {
		return {
			state: 'stopped',
	  	currentTime: 0,
	  	formattedTime: "00:00:00",
	  	ticker: undefined,
	  	helper: false,
	  	killedTime: localStorage.getItem('killedTime') || null,
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