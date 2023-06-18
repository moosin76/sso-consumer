import { boot } from 'quasar/wrappers'
import axios from 'axios'
import config from '../../config';
import axiosInterceptor from 'src/util/axiosInterceptor';

const isDev = process.env.NODE_ENV == 'development';
const ssoApi = axios.create({ baseURL: config.API_SERVER, withCredentials: true });
ssoApi.interceptors.response.use(axiosInterceptor.res('ssoApi', isDev));
ssoApi.interceptors.request.use(axiosInterceptor.req('ssoApi', isDev));

const ssoServer = axios.create({ baseURL: config.SSO_SERVER, withCredentials: true });
ssoServer.interceptors.response.use(axiosInterceptor.res('ssoServer', isDev));
ssoServer.interceptors.request.use(axiosInterceptor.req('ssoServer', isDev));

export default boot(({ app }) => {
	app.config.globalProperties.$axios = axios;
	app.config.globalProperties.$ssoApi = ssoApi;
	app.config.globalProperties.$ssoServer = ssoServer;
})

export { ssoApi, ssoServer, axios }
