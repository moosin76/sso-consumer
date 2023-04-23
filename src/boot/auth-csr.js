import { boot } from 'quasar/wrappers'
import useUser from 'src/stores/useUser';
import { socket } from 'boot/socket';

export default boot(({ app, store }) => {
	const userStore = useUser(store);
	console.log('auth csr =>', userStore.socketId);
	if (userStore.socketId) {
		socket.emit('sso:join', userStore.socketId)
		// TODO: 인증토큰이 있으면 axios header에 정보를 넣을꺼에요
	}
});