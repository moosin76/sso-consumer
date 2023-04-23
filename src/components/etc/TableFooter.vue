<template>
  <div class="full-width q-gutter-y-sm q-py-sm">
    <div class="row items-center">
      <div
        v-if="selected.length"
        class="row col-grow items-center q-gutter-x-md"
      >
        <slot></slot>
        <q-btn
          icon="mdi-close"
          @click="unSelect"
          round
          color="negative"
          size="sm"
        >
          <MyTooltip dir="top">선택 취소</MyTooltip>
        </q-btn>
        <div>{{ selected.length }} 선택됨</div>
      </div>
			<q-space v-else></q-space>
      <div class="row justify-end col-grow items-center q-gutter-x-md">
        <div>전체 : {{ pagination.rowsNumber }}</div>
        <q-select
          v-model="pagination.rowsPerPage"
          :options="pageOptions"
          outlined
          dense
          @update:model-value="onRequest"
        ></q-select>
      </div>
    </div>
    <q-separator></q-separator>
    <div class="row justify-center">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        active-color="primary"
        :max="pagesNumber"
        direction-links
        boundary-links
        :max-pages="9"
        :boundary-numbers="false"
        @update:model-value="onRequest"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MyTooltip from "components/etc/MyTooltip.vue";

export default defineComponent({
  components: { MyTooltip },
  name: "TableFooter",
  emits: ["request", "update:selected"],
  props: {
    pagination: { type: Object, required: true },
    selected: { type: Array, default: [] },
  },
  data() {
    return {
      pageOptions: [5, 10, 20, 50, 100],
    };
  },
  computed: {
    pagesNumber() {
      return Math.ceil(
        this.pagination.rowsNumber / this.pagination.rowsPerPage
      );
    },
  },
  methods: {
    unSelect() {
      this.$emit("update:selected", []);
    },
    onRequest() {
      this.$emit("request", { pagination: this.pagination });
    },
  },
});
</script>

<style lang='scss' scoped>
</style>