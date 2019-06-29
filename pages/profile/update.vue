<template>
	<div>
		<Header />

		<div class="container">
				<ChangeUserDetails />
				<ChangePassword />
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header.vue';
import ChangeUserDetails from '~/components/ChangeUserDetails.vue';
import ChangePassword from '~/components/ChangePassword.vue';
export default {
	middleware: 'authenticated',
	components: { Header, ChangeUserDetails, ChangePassword, },
}
</script>
