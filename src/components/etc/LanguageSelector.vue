<template>
  <q-btn>
    <q-badge v-bind="badgeOptions">{{ selected }}</q-badge>
    <AkarLanguageIcon v-bind="iconOptions"></AkarLanguageIcon>
    <q-menu>
      <q-list>
        <q-item
          v-for="opt in localeOptions"
          :key="opt.value"
          clickable
          v-close-popup
          @click="changeLocale(opt.value)"
        >
          <q-item-section>{{ opt.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent } from "vue";
import AkarLanguageIcon from "../icons/AkarLanguageIcon.vue";

export default defineComponent({
  components: { AkarLanguageIcon },
  name: "LanguageSelector",
  props: {
    badgeOptions: {
      type: Object,
      default: () => ({ color: "orange", floating: true }),
    },
    iconOptions: {
      type: Object,
      default: () => ({ size: "md" }),
    },
  },
  data() {
    return {
      locale: "ko-KR",
      localeOptions: [
        { value: "en-US", label: "English" },
        { value: "ko-KR", label: "Korean" },
      ],
    };
  },
  computed: {
    selected() {
      switch (this.locale) {
        case "en-US":
          return "A";
        case "ko-KR":
          return "가";
      }
    },
  },
  watch: {
    locale() {
      this.$i18n.locale = this.locale;
    },
  },
  mounted() {
    this.locale = this.$q.localStorage.getItem("locale") || "ko-KR";
  },
  methods: {
    changeLocale(value) {
      this.locale = value;
      this.$q.localStorage.set("locale", value);
    },
  },
});
</script>

<style lang='scss' scoped>
</style>