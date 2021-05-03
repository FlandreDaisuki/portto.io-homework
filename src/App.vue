<template>
  <ListPage
    v-show="isListPage"
    @details="onDetailsClick"
  />
  <DetailsPage
    v-show="!isListPage"
    v-bind="detailProps"
    @back="isListPage=true"
  />
</template>

<script>
import DetailsPage from './components/DetailsPage.vue';
import ListPage from './components/ListPage.vue';
import { ref, watch } from 'vue';

export default {
  components: { DetailsPage, ListPage },
  setup() {
    const isListPage = ref(true);
    const detailProps = ref(null);
    watch(detailProps, () => {
      isListPage.value = !detailProps.value;
    });
    const onDetailsClick = (details) => {
      detailProps.value = details;
    };
    return {
      isListPage,
      detailProps,
      onDetailsClick,
    };
  },
};
</script>
