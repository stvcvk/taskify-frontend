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

		<div class="timer-controls">
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
		</div><!-- .timer controls -->
	</div>
</template>

<script>
export default {
	name: 'timer',
	data() {
		return {
			state: 'stopped',
	  	currentTime: 0,
	  	formattedTime: "00:00:00",
	  	ticker: undefined,
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
	  },
	}
}
</script>