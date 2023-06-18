import axios from 'axios';
import { Notify } from 'quasar';

const cancelToken = {};

const res = function (name, isDev = false) {
	return function (response) {
		let { data, status } = response;

		if (!data) {
			data = {
				success: true,
				data: response
			};
		}

		if (isDev) {
			console.log('AJAX', name, response?.config?.url, status);
			console.log(data);
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

const req = function (name, isDev = false) {
	if (!cancelToken[name]) {
		cancelToken[name] = {};
	};
	return function (config) {
		if (cancelToken[name][config.url]) {
			cancelToken[name][config.url].cancel(`${name} ${config.url} Cancel...`);
		}
		cancelToken[name][config.url] = axios.CancelToken.source();
		config.cancelToken = cancelToken[name][config.url].token;
		return config;
	}
}

export default { res, req };

