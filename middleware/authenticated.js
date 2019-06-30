export default function({ store, route, redirect }) {
	if (!store.state.auth.user && !store.state.auth.token) {
		return redirect('/login');
	}
}