import { boot } from 'quasar/wrappers'
import useUser from 'src/stores/useUser';

export default boot(({ app, ssrContext, store }) => {
	const { req } = ssrContext;
	console.log('auth ssr =>', req.session);
	const userStore = useUser(store);
	if(req.session.socketId) {
		userStore.socketId = req.session.socketId;
	}
});