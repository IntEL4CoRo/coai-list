<script setup>
import { ref, computed } from 'vue'
import { 
  isAbsoluteUrl,
  isEmptyOject,
  isNotebookUrl,
  openPopupWindow 
} from './utils.js'
import SelectGroup from './SelectGroup.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

let targetNotebookId = ref('')

const targetNotebook = computed(() => {
  return props.item.notebooks[targetNotebookId.value]
})

const warningMsg = computed(() => {
  return !targetNotebook.value
   ? `No available executable notebook!`
   : undefined
})

const composedSrcUrl = computed(() => {
  if (isEmptyOject(props.item.options) || isNotebookUrl(props.item.src_url)) {
    return props.item.src_url
  }
  if (!targetNotebook.value) {
    return ''
  }
  if (typeof targetNotebook.value === 'object') {
    return targetNotebook.value.src
  }
  if (typeof targetNotebook.value === 'string' && isAbsoluteUrl(targetNotebook.value)) {
    return targetNotebook.value
  }
  return `${props.item.src_url}${targetNotebook.value}`
})

const composedRunUrl = computed(() => {
  if (isEmptyOject(props.item.options) || isNotebookUrl(props.item.run_url)) {
    return props.item.run_url
  }
  if (!targetNotebook.value) {
    return ''
  }
  if (typeof targetNotebook.value === 'object') {
    return targetNotebook.value.run
  }
  if (typeof targetNotebook.value === 'string' && isAbsoluteUrl(targetNotebook.value)) {
    return targetNotebook.value
  }
  return `${props.item.run_url}${targetNotebook.value}`
})

</script>

<template>
  <div class="card row mb-3">
    <div class="row">
      <div class="col-md-3">
        <img v-if="item.cover_img" :src="item.cover_img" class="card-img" :alt="item.title">
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title">
            <a class="font-weight-bold" :href="item.link || ('./#/details/' + index)" target="_blank">{{ item.title }}</a>
          </h5>
          <p class="card-text">{{ item.description }}</p>
          <div class="row">
            <SelectGroup :options="item.options" @update:model-value="newValue => targetNotebookId = newValue" />
            <div v-if="!composedRunUrl" class="text-danger">{{ warningMsg }}</div>
            <div class="card-buttons">
              <a :class="{ disabled: !composedRunUrl }" :href="composedRunUrl" @click.prevent="openPopupWindow($event)"
                class="btn btn-primary">Run
                Code</a>
              <a :class="{ disabled: !item.open_ease }" :href="item.open_ease" target="_blank"
                class="btn btn-secondary">Experimental Data</a>
              <a :class="{ disabled: !composedSrcUrl }" :href="composedSrcUrl" target="_blank"
                class="btn btn-secondary">Source
                Code</a>
              <a :class="{ disabled: !item.asset_url }" :href="item.asset_url" target="_blank"
                class="btn btn-secondary">Assets</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: rgb(248, 249, 250);
}

.form-floating {
  width: 48%;
}

.card-img {
  height: 100%;
  min-height: 150px;
  object-fit: contain;
}

.card-buttons .btn {
  margin-right: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .card-img {
    margin-top: 1rem;
    height: 60px;
  }
}
</style>
