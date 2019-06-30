export default function({ store, route, redirect }) {
	if (route.path == '/login' || route.path == '/register') {
		if (store.state.auth.user && store.state.auth.token) {
			return redirect('/home');
		}
	}
}