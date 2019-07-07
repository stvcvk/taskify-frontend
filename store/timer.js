export const state = () => ({
	timerState: 'stopped',
	currentTime: 0,
	formattedTime: '00:00:00',
	ticker: null,
	restoredTime: localStorage.getItem('restored_time') || null,
});

export const mutations = {
	// STATE MUTATIONS
	SET_TIMER_STATE(state, option) {
		// State can be running, paused, stopped 'n finished
		state.timerState = option;
	},

	// TICKER MUTATIONS
	SET_TICKER(state, payload) {
		state.ticker = payload;
	},

	// TIME MUTATIONS
	INCREMENT_TIME(state) {
		state.currentTime++;
	},

	SET_FORMATTED_TIME(state, seconds) {
		let measturedTime = new Date(null);
  	measturedTime.setSeconds(seconds);
  	let MHSTime = measturedTime.toISOString().substr(11, 8);
  	state.formattedTime = MHSTime;
	},

	// RESTORED TIME MUTATIONS
	SET_RESTORED_TIME(state, payload) {
		state.restoredTime = payload;
	},

	FETCH_RESTORED_TIME(state) {
		let time = JSON.parse(state.restoredTime);
		state.currentTime = time.currentTime;
		state.formattedTime = time.formattedTime;
	},

	RESET_RESTORED_TIME(state) {
		state.restoredTime = null;
		localStorage.removeItem('restored_time');
		state.currentTime = 0;
		state.formattedTime = '00:00:00';
	},
};

export const actions = {
	// TICKER ACTIONS
	tick ({ commit }, payload) {
		commit('SET_TICKER', payload.ticker);
	},

	// RESTORED TIME ACTIONS
	setRestoredTime({ commit, state }) {
		if (state.currentTime >= 1) {
			let data = JSON.stringify({
				'currentTime': state.currentTime,
				'formattedTime': state.formattedTime,
			});

			localStorage.setItem('restored_time', data);
		}
	},
};
