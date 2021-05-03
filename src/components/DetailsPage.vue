<template>
  <div class="layout">
    <header>
      <button
        class="back"
        @click="onBackClick"
      >
        ←
      </button>
      <h1>{{ title }}</h1>
    </header>
    <div
      class="image"
      :style="{backgroundImage: `url(${image})`}"
    />
    <div>{{ name }}</div>
    <div>{{ description }}</div>
    <a
      :href="permalink"
      target="_blank"
      role="button"
      class="block text-blue-800 text-xl"
    >
      permalink
    </a>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { getDetails } from '../api';
export default {
  props: {
    contractAddress: String,
    tokenId: String,
  },
  emits: ['back'],
  setup(props, { emit }) {
    const item = ref({});
    watchEffect(async() => {
      if (props.contractAddress && props.tokenId) {
        item.value = {};
        const details = await getDetails(props);
        if (!details.error) {
          item.value = details.data;
        }
      }
    });

    return {
      item,
      title: computed(() => item.value?.collection?.name ?? ''),
      image: computed(() => item.value?.image_url ?? ''),
      name: computed(() => item.value?.name ?? ''),
      description: computed(() => item.value?.description ?? ''),
      permalink: computed(() => item.value?.permalink ?? ''),
      onBackClick: () => emit('back'),
    };
  },
};
</script>

<style scoped>
.layout {
  @apply flex flex-col h-screen bg-white;
}
header {
  @apply relative;
}
header > .back {
  @apply absolute left-0;
}
.image {
  @apply flex-1 bg-no-repeat bg-contain bg-center;
}
</style>
