import { ssrMiddleware } from 'quasar/wrappers';
import config from '../../config';
import URL from 'url';

export default ssrMiddleware(({ app, resolve, render, serve }) => {
	// SSO 서버에서 소켓 아이디를 받아왔다면 세션에 저장하고 소켓아이디를 버리고 리다이렉트
	app.get('*', async (req, res, next) => {
		const { socketToken } = req.query;
		if(socketToken) {
			const redirectURL = URL.parse(req.url).pathname;
			req.session.socketToken = socketToken;
			req.session.save();
			return res.redirect(redirectURL);
		}
		next();
	})

	// 세션에 소켓 아이디가 없으면 SSO 서버에 소켓아이디를 요청하게 리다이렉트 함
	app.get('*', async (req, res, next) => {
		console.log('socket ID ==>', req.session.socketToken);
		if (!req.session.socketToken) {
			const serviceURL = req.app.get('serviceURL');
			return res.redirect(`${config.SSO_SERVER}/sso?serviceURL=${serviceURL}&appToken=${config.APP_TOKEN}`);
		}
		next();
	});
});