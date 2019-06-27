export const state = () => ({
	token: localStorage.getItem('access_token') || null,
	user: JSON.parse(localStorage.getItem('current_logged_in_user')) || null,
});

export const mutations = {
	setToken(state, token) { state.token = token; },
	setUser(state, data) { state.user = data; },
};

export const actions = {
	register(context, credentials) {
		return new Promise((resolve, reject) => {
			this.$axios.$post('auth/register', credentials)
				.then(response => {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				})
		});
	},

	login (context, credentials) {
		return new Promise((resolve, reject) => {
			this.$axios.$post('auth/login', { username: credentials.username, password: credentials.password })
				.then(response => {
					localStorage.setItem('access_token', response.body.access_token);
					context.commit('setToken', response.body.access_token);
					localStorage.setItem('current_logged_in_user', JSON.stringify(response.user));
					context.commit('setUser', response.user);
					resolve(response);
				})
				.catch(error => { reject(error); })
		});
	},

	logout (context) {
		return new Promise((resolve, reject) => {
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
			this.$axios.$delete('auth/logout').then(response => {
				localStorage.removeItem('access_token');
				localStorage.removeItem('current_logged_in_user');
				context.commit('setToken', null);
				context.commit('setUser', null);
				resolve(response);
			}).catch(error => { 
				reject(error); 
			});
		});
	},

	update (context, credentials) {
		return new Promise((resolve, reject) => {
			this.$axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
			this.$axios.$post('/me/update', credentials).then(response => {
				localStorage.removeItem('current_logged_in_user');
				context.commit('setUser', response.data);
				localStorage.setItem('current_logged_in_user', JSON.stringify(response.data));
				resolve(response);
			}).catch(error => { reject(error); })
		});
	},
};