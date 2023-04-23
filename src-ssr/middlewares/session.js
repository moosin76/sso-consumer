import { ssrMiddleware } from 'quasar/wrappers'
import session from 'express-session';
import FileStore from 'session-file-store';

export default ssrMiddleware(({ app, resolve, render, serve }) => {
	const SessionStore = FileStore(session);

	app.use(session({
		key : 'connect.sid',
		store : new SessionStore({}),
		secret : 'keyboard cat',
		resave : false,
		saveUninitialized : true,
	}));

	app.use('*', (req, res,next)=>{
		app.set('serviceURL', `${req.protocol}://${req.headers.host}`);
		console.log(req.app.get('serviceURL'));
		console.log('session', req.session);
		next();
	})

})