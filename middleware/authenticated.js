export default function({ store, redirect }) {
	if (!store.state.auth.user && !store.state.auth.token) {
		return redirect('/');
	}
}