import { boot } from 'quasar/wrappers';
import { io } from 'socket.io-client';
import { ssoApi } from 'boot/axios';

const socket = io(ssoApi.defaults.baseURL, { transports: ['websocket'] });

if (process.env.NODE_ENV == 'development') {
	socket.onAny((event, ...args) => {
		console.log('Socket =>', event, ...args);
	})
}

export default boot(({ app }) => {
	app.config.globalProperties.$socket = socket;
})

export { socket };