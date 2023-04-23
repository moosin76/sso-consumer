<template>
  <q-tooltip
    v-bind="{ ...$attrs, ...bindAttr }"
    :offset="offset"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <slot></slot>
  </q-tooltip>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyTooltip",
  props: {
    offset: { type: Array, default: [10, 10] },
    dir: { type: String, default: "top" },
  },
  computed: {
    bindAttr() {
      switch (this.dir) {
        case "bottom":
          return { anchor: "bottom middle", self: "top middle" };
        case "left":
          return { anchor: "center left", self: "center right" };
        case "right":
          return { anchor: "center right", self: "center left" };
        default:
          return { anchor: "top middle", self: "bottom middle" };
      }
    },
  },
});
</script>

<style lang='scss' scoped>
</style>