<template>
  <q-dialog v-model="dialog">
    <q-card v-bind="cardProps">
			<q-toolbar>
				<q-toolbar-title>{{ label }}</q-toolbar-title>
				<q-btn icon="mdi-close" @click="hide" flat round></q-btn>
			</q-toolbar>
			<q-separator></q-separator>
			<slot></slot>
		</q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyDialog",
	emits : ['show', 'hide'],
  props: {
    label: { type: String, default: "" },
    cardProps: { type: Object, default: null },
  },
  data() {
    return {
      dialog: false,
    };
  },
	methods : {
		show() {
			this.$emit('show');
			this.dialog = true;
		},
		hide() {
			this.$emit('hide');
			this.dialog = false;
		}
	}
});
</script>

<style lang='scss' scoped>
</style>