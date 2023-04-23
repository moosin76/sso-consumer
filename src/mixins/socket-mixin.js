function getMixin(vm) {
	const { socket } = vm.$options;
	if (socket) {
		return socket.call(vm);
	}
}

export default {
	data() {
		return {
			socketEvents: []
		}
	},
	mounted() {
		const socket = getMixin(this);
		if (socket) {
			this.socketEvents = Object.keys(socket);
			for (const ev of this.socketEvents) {
				this.$socket.on(ev, socket[ev]);
			}
			console.log(this.socketEvents);
		}
	},
	beforeUnmount() {
		for (const ev of this.socketEvents) {
			this.$socket.off(ev)
		}
	}
}