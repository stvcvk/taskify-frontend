export const state = () => ({
	state: 'stopped',
	currentTime: 0,
	formattedTime: "00:00:00",
	ticker: undefined,

	killedTime: localStorage.getItem('killedTime') || null,
});

export const mutations = {
	
};

export const actions = {
	start(context) {

	},

	// Check If Time Is Killed
	checkIsTimeKilled(context) {
		if (localStorage.getItem('killedTime')) {
			let killedTime = JSON.parse(localStorage.getItem('killedTime'));
			context.state.currentTime = killedTime.currentTime;
			context.state.formattedTime = killedTime.formattedTime;
		};
	}
};