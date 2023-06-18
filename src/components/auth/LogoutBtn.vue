<template>
  <q-btn @click="signOut" :loading="loading">
    <slot></slot>
  </q-btn>
</template>

<script>
import { mapActions } from "pinia";
import useUser from "src/stores/useUser";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Logout",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(useUser, ["logout"]),
    async signOut() {
      this.loading = true;
      const data = await this.logout();
      this.loading = false;
      if (data) {
        this.$router.push({ name: "home" });
      }
    },
  },
});
</script>

<style lang='scss' scoped>
</style>