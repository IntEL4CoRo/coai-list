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
    noImg: props.options[v].map(v => !!v.img).filter(v => v).length === 0,
    selected: props.options[v][0],
    options: props.options[v]
  }
}))


const optionComposedStr = computed(() => {
  const newValue = formatedOpts.value
    ? formatedOpts.value.map(v => v.name + '=' + v.selected.value).join('|')
    : ''
  emit('update:modelValue', newValue)
  return newValue
})

</script>

<template>
  <div class="row" :data-compose="optionComposedStr">
    <div class="p-float-label col-md-6" v-for="item in formatedOpts">
      <Dropdown v-model="item.selected" :options="item.options" :optionLabel="item.name" :placeholder="item.name"
        :inputId="item.name" class="col-md-12 mb-3">
        <template #value="slotProps">
          <div v-if="slotProps.value" :title="slotProps.value.value" class="flex h-100 align-items-center"
            :class="{ noImg: item.noImg }">
            <img v-if="slotProps.value.img" class="selected-img" :alt="slotProps.value.name" :src="slotProps.value.img" />
            <div class="image-missing" v-else></div>
            <div class="text-capitalize option-name">{{ slotProps.value.name }}</div>
            <a class="text-xs" target="_blank" title="Knowledge Bases in OpenEASE"
              v-if="slotProps.value.knowledge_bases" :href="slotProps.value.knowledge_bases"
              onclick="event.stopPropagation()">Knowledge Bases</a>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center" :title="slotProps.option.value" :class="{ noImg: item.noImg }">
            <img v-if="slotProps.option.img" class="option-img" :alt="slotProps.option.name"
              :src="slotProps.option.img" />
            <div class="image-missing" v-else></div>
            <div class="text-capitalize option-name">{{ slotProps.option.name }}</div>
            <a class="text-xs" target="_blank" title="Knowledge Bases in OpenEASE"
              v-if="slotProps.option.knowledge_bases" :href="slotProps.option.knowledge_bases"
              onclick="event.stopPropagation()">Knowledge Bases</a>
          </div>
        </template>
      </Dropdown>
      <label :for="item.name">
        {{ item.name }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.noImg {
  min-height: 2rem;
}

.noImg .option-img,
.noImg .selected-img,
.noImg .image-missing {
  display: none;
}

.p-float-label {
  margin-top: 1rem;
}

.p-float-label>label {
  left: 1.5rem;
  top: 42%;
}

.p-dropdown {
  margin-right: 1rem;
}

.selected-img,
.option-img {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}

.option-name {
  flex-grow: 1;
  text-align: left;
  padding-left: 1rem;
}

.image-missing {
  width: 2rem;
  height: 2rem;
  background-color: #ebebeb;
}
</style>
