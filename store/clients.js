export const state = () => ({
	clients: [],
});

export const getters = {
	mappedClients(state) {
		return state.clients.map((item) => {
			return { id: item.id, name: item.name };
		});
	},
};

export const mutations = {
	SET_CLIENTS(state, clients) {
		state.clients = clients;
	},

	PUSH_CLIENT(state, client) {
		state.clients.push(client);
	},
};

export const actions = {
	fetch ({ commit, rootState }) {
		this.$axios.defaults.headers.common['Authorization'] = `Bearer ${rootState.auth.token}`;
		this.$axios.get('/client').then(response => {
			commit('SET_CLIENTS', response.data);
		}).catch(error => { console.log(error); });
	},

	store ({ commit, rootState }, payload) {
		this.$axios.defaults.headers.common['Authorization'] = `Bearer ${rootState.auth.token}`;
		return new Promise((resolve, reject) => {
			this.$axios.post('/client', payload).then(response => {
				commit('PUSH_CLIENT', response.data);
				resolve(response);
			}).catch(error => { reject(error); console.log(error); });
		});
	},

	edit ({ commit, rootState }, payload) {

	},

	delete({ commit, rootState }, payload) {

	},
};