<template>
	<transition name="dropdown-fade">
	<div class="modal" v-if="visible">
		<div class="modal-content" v-on-clickaway="hide">
			<h2>{{ title }}</h2>
			<slot></slot>
		</div>
	</div>
	</transition>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
	name: 'modal',
	props: ['title'],
	mixins: [ clickaway ],
	data() {
		return {
			visible: false,
		}
	},
	created() {
		this.$bus.$on('modal-close', () => {
			this.visible = !this.visible;
		});
	},
	methods: {
		hide() {
			this.visible = false;
		},

	}
}
</script>