import { onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';

export default function (socket, evts) {
	const socketEvts = Object.keys(evts);

	onMounted(() => {
		socketEvts.forEach(ev => {
			socket.on(ev, evts[ev]);
		});
		const $q = useQuasar();
		// if ($q.config.isDev) {
			console.log(socket.nsp, socketEvts);
		// }
	})

	onUnmounted(() => {
		socketEvts.forEach(ev => {
			socket.off(ev);
		})
	})
}