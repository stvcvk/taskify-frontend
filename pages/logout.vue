<template>
	<div>
		<p>Wait while logging out...</p>
	</div>
</template>

<script>
export default {
	mounted() {
		this.$store.dispatch('auth/logout')
				 .then(response => { 
				 	this.$router.push('/'); 
				 })
				 .catch(error => { this.statusText = 'Something went wrong!'; console.log(error) })
	}
}
</script>