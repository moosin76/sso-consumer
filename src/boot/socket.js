import { boot } from 'quasar/wrappers';
import { io } from 'socket.io-client';
import { ssoApi } from 'boot/axios';
import socketMixin from 'src/mixins/socket-mixin';

const socket = io(ssoApi.defaults.baseURL, { transports: ['websocket'] });

if (process.env.NODE_ENV == 'development') {
	socket.onAny((event, ...args) => {
		console.log('Socket =>', event, ...args);
	})
}

export default boot(({ app }) => {
	app.config.globalProperties.$socket = socket;
	app.mixin(socketMixin);
})

export { socket };