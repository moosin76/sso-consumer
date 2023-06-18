import { ssoApi, ssoServer } from 'boot/axios'

const URL = `/auth`;

const setHeaderToken = (token) => {
	ssoServer.defaults.headers.common['Authorization'] = 'bearer ' + token;
	ssoApi.defaults.headers.common['Authorization'] = 'bearer ' + token;
}

const unsetHeaderToken = () => {
	delete ssoServer.defaults.headers.common['Authorization'];
	delete ssoApi.defaults.headers.common['Authorization'];
}

const logout = async (socketId) => {
	return await ssoApi.post(`${URL}/logout`, { socketId })
}
export default {
	logout,
	setHeaderToken, unsetHeaderToken,
}