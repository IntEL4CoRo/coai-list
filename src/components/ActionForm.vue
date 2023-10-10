<script setup>
import { ref, computed } from 'vue'
import SelectGroup from './SelectGroup.vue'

const props = defineProps({
  actions: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: false
  },
  urlparams: {
    type: Object,
    required: false
  }
})
let selectedNotebookId = ref('')
let selectedUrlparams = ref('')

function getActionUrl(action) {
  if (!action.url) return ''
  let _url = action.url
  if (action.options && action.available) {
    let _notebookUrl = action.available[selectedNotebookId.value]
    if (!_notebookUrl) return ''
    _url += _notebookUrl
  }
  if (action.urlparams) {
    let _paramsStr = composeUrlParams(selectedUrlparams.value)
    _url = `${_url}${_paramsStr}`
  }
  return _url
}

function composeUrlParams (params) {
  let str = '?&' +
  params
    .replace(/\|/g, '"&')
    .replace(/\=/g, '="') + '"'
  return encodeURIComponent(str)
}

const warningMsg = computed(() => {
  let str = ''
  return str
})

</script>

<template>
    <div class="card-buttons">
      <SelectGroup
        v-if="options"
        :options="options"
        @update:model-value="newValue => selectedNotebookId = newValue"
      />
      <SelectGroup
        v-if="urlparams"
        :options="urlparams"
        @update:model-value="newValue => selectedUrlparams = newValue"
      />
      <div v-show="warningMsg" class="text-danger">{{ warningMsg }}</div>
      
      <a class="btn btn-secondary" target="_blank"
        v-for="action in actions"
        :title="action.description"
        :href="getActionUrl(action)"
        :class="{ 'btn-primary': action.primary, 'disabled': !getActionUrl(action) }">
        {{ action.name }}
      </a>
    </div>
</template>

<style scoped>
.card-buttons .btn {
  margin-right: 1rem;
  margin-top: 1rem;
}

</style>
