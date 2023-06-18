<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import useSocketListener from "src/composables/useSocketListener";
import { socket } from "boot/socket";
import useUser from "stores/useUser";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const userStore = useUser();
    const router = useRouter();
    useSocketListener(socket, {
      "sso:login": (data) => {
        userStore.socketLogin(data);
      },
      "sso:logout": () => {
        userStore.socketLogout();
        router.push({ name: "home" });
      },
    });
  },
});
</script>
