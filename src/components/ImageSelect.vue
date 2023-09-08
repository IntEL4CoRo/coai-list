<script setup>
import Dropdown from 'primevue/dropdown';
defineProps({
  options: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <Dropdown v-if="item.options.environments.length !== 0" v-model="selectedEnv" :options="item.options.environments"
    optionLabel="name" placeholder="Select an environment" class="w-full md:w-14rem">
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <img v-if="slotProps.value.img && slotProps.value.img !== 0" :alt="slotProps.value.name"
          :src="slotProps.value.img" />
        <div>{{ slotProps.value.name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
  </Dropdown>
</template>

<style scoped>
.select-img {
  max-height: 20px;
}
</style>
