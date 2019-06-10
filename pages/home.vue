<template>
	<div>
		<Header />

		<h1>Welcome to home!</h1>
	</div>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
	middleware: 'authenticated',
	components: { Header, }
}
</script>