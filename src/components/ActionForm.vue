<script setup>
import { ref, computed } from 'vue'
import SelectGroup from './SelectGroup.vue'
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';


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
const op = ref();
const toggleWarning = (event) => {
  op.value.toggle(event);
}

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

function composeUrlParams(params) {
  let str = '?&' +
    params
      .replace(/\|/g, '"&')
      .replace(/\=/g, '="') + '"'
  return encodeURIComponent(str)
}

const errorMsgs = computed(() => {
  let _arr = props.actions
    .filter(act => !getActionUrl(act))
    .map(act => `"${act.name}"`)
  let selectionStr = selectedNotebookId.value || selectedUrlparams.value
    ? ` for options: \n\n${selectedNotebookId.value.replace(/\|/g, '\n')}${selectedUrlparams.value.replace(/\|/g, '\n')}`
    : '!'
  return _arr.length === 0 ? '' : `${_arr.join(',')} is currently unavailable${selectionStr}`
})

</script>

<template>
  <div class="card-buttons">
    <SelectGroup v-if="options" :options="options" @update:model-value="newValue => selectedNotebookId = newValue" />
    <SelectGroup v-if="urlparams" :options="urlparams" @update:model-value="newValue => selectedUrlparams = newValue" />
    <div v-show="errorMsgs.length !== 0">
      <Button icon="pi pi-bell" severity="warning" text rounded aria-label="Notification" @click="toggleWarning" />
      <OverlayPanel ref="op" class="error-msg">
        <pre>{{ errorMsgs }}</pre>
      </OverlayPanel>
    </div>
    <a class="btn btn-secondary" target="_blank" v-for="action in actions" :title="action.description"
      :href="getActionUrl(action)" :class="{ 'btn-primary': action.primary, 'disabled': !getActionUrl(action) }">
      {{ action.name }}
    </a>
  </div>
</template>

<style scoped>
.card-buttons .btn {
  margin-right: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .card-buttons .btn {
    margin-right: 0;
    margin-top: 0.5rem;
    width: 100%;
  }
}

.error-msg pre {
  text-align: left;
  margin-bottom: 0;
  color: #F59E0B;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
