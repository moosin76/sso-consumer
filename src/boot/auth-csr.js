import { boot } from 'quasar/wrappers'
import useUser from 'src/stores/useUser';
import { socket } from 'boot/socket';
import authApi from 'src/apis/authApi';

export default boot(({ app, store }) => {
	const userStore = useUser(store);
	console.log('auth csr =>', userStore.socketId);
	if (userStore.socketId) {
		socket.emit('sso:join', userStore.socketId)
	}
	if(userStore.accToken) {
		authApi.setHeaderToken(userStore.accToken);
	}
});