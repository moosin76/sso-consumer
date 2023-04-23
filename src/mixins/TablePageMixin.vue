<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TablePageMixin",
  data() {
    return {
      pageRouting: false,
      pageReady: false,
      axiosSource: null,
    };
  },
  computed: {
    // 기본값하고 목록 가져오는 함수 필수!!
    defaultPagination: () => null,
    fetchApi: () => null,
    
  },
  created() {
    this.initPagination();
  },
  mounted() {
    this.fetchData({ pagination: this.pagination });
    window.addEventListener("popstate", this.routeChange);
  },
  beforeUnmount() {
    window.removeEventListener("popstate", this.routeChange);
  },
  methods: {
    changePagination() {
			// console.log('changePagination', this.pagination);
      this.fetchData({ pagination: this.pagination });
    },
    routeChange() {
      this.pageRouting = true;
      this.initPagination();
      this.fetchData({ pagination: this.pagination });
    },
    initPagination() {
      const { query } = this.$route;
      const pagination = {};
      const options = { ...this.defaultPagination, ...this.pagination };

      Object.keys(options).forEach((key) => {
        const value = options[key];
        switch (typeof value) {
          case "number":
            pagination[key] = query[key] ? Number(query[key]) : value;
            break;
          case "boolean":
            pagination[key] = query[key] ? query[key] == "true" : value;
            break;
          default:
            pagination[key] = query[key] || value;
        }
        this.pagination = pagination;
      });
    },
    async fetchData({ pagination }) {
      try {
        if (this.fetchApi == null) {
          throw new Error("fetchApi 함수가 없습니다.");
        }
				const payload = {...pagination}
        delete payload.rowsNumber;

				this.$q.loading.show();
        const data = await this.fetchApi(payload);
				this.$q.loading.hide();
        if (data) {
          this.rows = data.rows;
          this.pagination = {
            ...payload,
            rowsNumber: data.count,
          };
          if (this.selected) {
            this.selected = [];
          }
          this.pushState();
          this.pageReady = true;
          this.pageRouting = false;
        }
      } catch (e) {
        console.error(e);
      }
    },
    pushState() {
      if (!this.pageRouting) {
        const query = {};
        Object.keys(this.pagination).forEach((key) => {
          switch (key) {
            case "rowsNumber":
              break;
            default:
              query[key] = this.pagination[key] || undefined;
          }
        });
        if (this.pageReady) {
          this.$router.push({ path: this.$route.path, query });
        } else {
          this.$router.replace({ path: this.$route.path, query });
          this.pageReady = true;
        }
      }
    },
  },
});
</script>