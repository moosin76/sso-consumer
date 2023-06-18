import { defineStore } from 'pinia';
import authApi from 'src/apis/authApi';

export default defineStore('user', {
	state: () => ({
		socketId: null,
		member: null,
		accToken: null,
	}),
	getters: {
		isLogin() {
			return !!this.member;
		}
	},
	actions: {
		async socketLogin({ member, token }) {
			this.member = member;
			this.accToken = token;
			authApi.setHeaderToken(token)
		},
		async socketLogout() {
			this.member = null;
			this.accToken = null;
			authApi.unsetHeaderToken();
		},
		async logout() {
			const data = await authApi.logout(this.socketId);
			if (data) {
				this.socketLogout();
				socket.emit('sso:logout', this.socketId);
			}
		}
	},
});