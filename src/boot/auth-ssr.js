import { boot } from 'quasar/wrappers'
import useUser from 'src/stores/useUser';
import { ssoApi } from 'boot/axios';

export default boot(async ({ app, ssrContext, store }) => {
	const { req } = ssrContext;
	console.log('auth ssr =>', req.session);
	const userStore = useUser(store);
	if (req.session.socketId) {
		userStore.socketId = req.session.socketId;
		const data = await ssoApi.post('/auth/auth', { socketId: userStore.socketId });
		if(data) {
			userStore.member = data.member;
			userStore.accToken = data.token;
		}
	}
});