<template>
  <div>
    <h1 class="text-3xl">
      List
    </h1>
    <div class="grid-layout">
      <figure
        v-for="item in items"
        :key="item.id"
        @click="openDetails(item)"
      >
        <img
          :src="item.image_url"
          class="object-contain h-48 w-full"
        >

        <figcaption>{{ item.name }}</figcaption>
      </figure>
    </div>
    <footer id="footer">
      Loading...
    </footer>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import { getPage } from '../api.js';
export default {
  emits: ['details'],
  setup(props, { emit }) {
    const pageCounter = ref(0);
    const items = reactive([]);

    watch(pageCounter, async(pc) => {
      console.log('pc', pc);
      const page = await getPage(pc);
      if (!page.error) {
        items.push(...page.data);
      }
    }, { immediate: true });

    const intersectionObserver = ref();

    onMounted(() => {
      const options = {
        root: document,
        rootMargin: '300px', // load when footer and root <= 300px
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(() => {
        pageCounter.value += 1;
      }, options);

      observer.observe(document.querySelector('#footer'));
      intersectionObserver.value = observer;
    });

    onUnmounted(() => {
      intersectionObserver.value.disconnect();
    });

    const openDetails = (item) => {
      const contractAddress = item?.asset_contract?.address;
      const tokenId = item?.token_id;
      emit('details', { contractAddress, tokenId });
    };
    return {
      items,
      openDetails,
    };
  },
};
</script>

<style scoped>
.grid-layout {
  @apply grid items-center justify-center gap-4;
  @apply sm:grid-cols-2;
}
figure {
  @apply cursor-pointer w-64 mx-auto border-gray-800 border-solid border-2;
}
</style>
