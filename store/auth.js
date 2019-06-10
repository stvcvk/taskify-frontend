export const state = () => ({
	token: localStorage.getItem('access_token') || null,
	user: localStorage.getItem('current_logged_in_user') || null,
});

export const mutations = {
	setToken(state, token) { state.token = token; },
	setUser(state, data) { state.user = data; },
};

export const actions = {
	login (context, credentials) {
		return new Promise((resolve, reject) => {
			this.$axios.$post('auth/login', credentials)
				.then(response => {
					localStorage.setItem('access_token', response.body.access_token);
					context.commit('setToken', response.body.access_token);
					localStorage.setItem('current_logged_in_user', response.user);
					context.commit('setUser', response.user);
					resolve(response);
				})
				.catch(error => { reject(error); })
		});
	},
};