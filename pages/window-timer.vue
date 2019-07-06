<template>
	<div class="windowtimer">
		<button class="rounded sml" @click="originSize" v-if="width != 500 || height != 185">Origin Size</button>
		<span>Width {{ width }}</span>
		<span>Height {{ height }}</span>
		<WindowTimer />

		<label class="form-label">Logged In as {{ $store.state.auth.user.name }}</label>
	</div>
</template>

<script>
import WindowTimer from '~/components/WindowTimer.vue';
export default {
	name: 'timer',
	components: { WindowTimer, },
	data() {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		}
	},

	head() {
    return {
      title: 'Window Tracker - Trackify',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

	created() {
		window.addEventListener('click', this.handleResize);
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},

	destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

	methods: {
		handleResize() {
      this.width = window.innerWidth;
	    this.height = window.innerHeight;
		},

		originSize() {
			this.width = window.innerWidth = 500;
			this.height = window.innerHeight = 185;
			window.resizeTo(this.width, this.height);
			window.focus();
		}
	}
}
</script>