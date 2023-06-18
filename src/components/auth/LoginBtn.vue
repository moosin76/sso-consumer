<template>
  <q-btn @click="goLogin">
    <slot></slot>
  </q-btn>
</template>

<script>
import { defineComponent } from "vue";
import Config from "../../../config";

export default defineComponent({
  name: "LoginBtn",
  data() {
    return {};
  },
  methods: {
    goLogin() {
      const href = `${Config.SSO_SERVER}/auth/login?next=${location.origin}${this.$route.fullPath}`;
      location.href = href;
    },
  },
});
</script>

<style lang='scss' scoped>
</style>