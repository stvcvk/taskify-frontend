<template>
	<div>
		<!--
<div class="card">
					<div class="card-title">Update Password</div>
					<div class="card-body">
						<div class="message error" v-if="messages.password.errors.inline_error">{{ messages.password.errors.inline_error }}</div>
						<div class="message success" v-if="messages.password.success">{{ messages.password.success }}</div>

						<form @submit.prevent="changePassword">
							<div class="form-group">
								<label class="form-label">Current Password</label>
								<input class="form-input" type="password" v-model="password.current_password">	
								<strong class="danger" v-if="messages.password.errors.current_password">{{ messages.password.errors.current_password[0] }}</strong>
							</div>

							<div class="form-group">
								<label class="form-label">New Password</label>
								<input class="form-input" type="password" v-model="password.password">
								<strong class="danger" v-if="messages.password.errors.password">{{ messages.password.errors.password[0] }}</strong>
							</div>

							<div class="form-group">
								<label class="form-label">Confirm New Password</label>
								<input class="form-input" type="password" v-model="password.password_confirmation">
							</div>

							<button class="loading rounded">
								<div class="spinner"></div>
								Change Password
							</button>
						</form>
					</div>
				</div>
		-->
	</div>
</template>

<script>
/*
changePassword() {
			this.loading = true;
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
			this.$axios.$post('/me/change-password', this.password).then(response => {
				this.messages.password.success = response.data;
				this.loading = false;
			}).catch(error => {
				this.loading = false;
				this.messages.password.errors = [];
				this.messages.password.errors.inline_error = "";
				if (error.response.data.message) this.messages.password.errors.inline_error = error.response.data.message;
				// need small bug fix
				if (error.response.data.password) this.messages.password.errors = error.response.data;
			});
		}
	}
*/

</script>