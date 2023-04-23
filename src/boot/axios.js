import { boot } from 'quasar/wrappers'
import axios from 'axios'
import config from '../../config';
import { Notify } from 'quasar';

function interceptorRes(name, isDev = false) {
	return function (response) {
		let { data, status } = response;
		if (!data) {
			data = {
				success: true,
				data: response
			};
		}

		if (isDev) {
			console.log('AJAX', name, status, data);
		}

		try {
			if (status && status != 200) {
				const message = `${name} AJAX Error : ${status}`;
				try {
					Notify.create({ type: 'negative', message })
				} catch (e) { };
				throw new Error(message);
			}

			if (data && data.success) {
				return data.data
			} else {
				const message = data?.data;
				try {
					Notify.create({ type: 'negative', message })
				} catch (e) { };
				throw new Error(message);
			}

		} catch (e) {
			if (isDev) {
				console.error(e);
			}
			return false;
		}
	}
}

const isDev = process.env.NODE_ENV == 'development';

const ssoApi = axios.create({ baseURL: config.API_SERVER, withCredentials: true });
const ssoServer = axios.create({ baseURL: config.SSO_SERVER, withCredentials: true });

ssoApi.interceptors.response.use(interceptorRes('ssoApi', isDev));
ssoServer.interceptors.response.use(interceptorRes('ssoServer', isDev));

export default boot(({ app }) => {
	app.config.globalProperties.$axios = axios;
	app.config.globalProperties.$ssoApi = ssoApi;
	app.config.globalProperties.$ssoServer = ssoServer;
})

export { ssoApi, ssoServer, axios }
