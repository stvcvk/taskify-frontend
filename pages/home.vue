<template>
	<div>
		<Header />

		<!--
		<dropdown :options="projectOptions" placeholder="Select Project" v-model="selectedProject" />

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
	-->

		<div class="container">
			<div class="card">
				<div class="card-title">Track Time</div>
				<div class="card-body">
					<NewTimer />
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
import NewTimer from '~/components/NewTimer.vue'
import chart from '~/components/chart.vue'
import modal from '~/components/modal.vue'
import dropdown from '~/components/dropdown.vue'
export default {
	middleware: 'authenticated',
	components: { Header, Timer, NewTimer, chart, modal, dropdown },
	data() {
		return {
			timeRendered: {},
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
	created() {
		this.$axios.get('/track').then(res => { this.timeRendered = res.data; });
	},
	methods: {
		formatNumber(number) {
			return number > 9 ? number : "0" + number;
		},
		openNewWindow() {
			window.open('/window-timer', '_blank', "width=500,height=185,resizable=no,location=no").focus();
		}
	}
}
</script>