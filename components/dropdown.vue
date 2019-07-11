<template>
	<div class="dropdown-container">
		<div class="dropdown-select">
			<div class="dropdown-name">
				{{ value ? value.name : placeholder }} 
				<img src="~/assets/arrow-down.svg" alt="arrow-down" :class="{ 'rotate': show == true }" @click="show = !show">
			</div>

			<transition name="dropdown-fade">
			<ul class="dropdown-options" id="ddo" v-if="show" v-on-clickaway="onClickAway">
				<li class="dropdown-option" v-for="option in options" @click="selectOption(option)">
					<label> 
						<input type="checkbox" :value="option"> 
						{{ option.name }} 
						<div v-if="value">
							<img src="~/assets/check.svg" alt="check" v-if="value.name == option.name">
						</div>
					</label>
				</li>
			</ul>
			</transition>
		</div>
	</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
	name: 'dropdown',
	mixins: [ clickaway ],
	props: ['options', 'value', 'placeholder'],
	data() {
		return {
			show: false,
		};
	},
	
	methods: {
		selectOption(option) {
			this.$emit('input', option);
			this.show = false;
		},
		onClickAway() {
			this.show = false;
		},
	}
}
</script>