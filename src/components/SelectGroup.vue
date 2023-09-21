<script setup>
import { ref, computed } from 'vue'
import Dropdown from 'primevue/dropdown';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

const formatedOpts = ref(Object.keys(props.options).map(v => {
  return {
    name: v,
    selected: props.options[v][0],
    options: props.options[v]
  }
}))


const optionComposedStr = computed(() => {
  const newValue = formatedOpts.value 
      ? formatedOpts.value.map(v => v.selected.value).join('_')
      : ''
  emit('update:modelValue', newValue)
  return newValue
})

</script>

<template>
  <div :data-compose="optionComposedStr">
    <Dropdown
      v-for="item in formatedOpts"
      v-model="item.selected"
      :options="item.options" 
      :optionLabel="item.name"
      :placeholder="item.name"
      class="col-md-5 mb-3">
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex h-100 align-items-center">
          <img v-if="slotProps.value.img" class="selected-img"
            :alt="slotProps.value.name" 
            :src="slotProps.value.img" />
          <div class="image-missing" v-else></div>
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center">
          <img v-if="slotProps.option.img" class="option-img"
          :alt="slotProps.option.name"
          :src="slotProps.option.img" />
          <div class="image-missing" v-else></div>
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<style scoped>
.p-dropdown {
  margin-right: 1rem;
}
.selected-img,
.option-img {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  margin-right: 1rem;
}

.image-missing {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  background-color: #ebebeb;
}
</style>
