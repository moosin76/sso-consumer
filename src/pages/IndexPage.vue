<template>
  <q-page class="row flex-center">
    <div>{{ socketId }}</div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useUser from 'src/stores/useUser';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'IndexPage',
	computed : {
		...mapState(useUser, ['socketId']),
	}
})
</script>
