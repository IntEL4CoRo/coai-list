<script setup>
import { ref, computed } from 'vue'
import Dropdown from 'primevue/dropdown';

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

let selectedEnv = ref(props.item.options.environments.length !== 0
  ? props.item.options.environments[0]
  : {})

let selectedRob = ref(props.item.options.robots.length !== 0
  ? props.item.options.robots[0]
  : {})

let selectedTask = ref(props.item.options.tasks.length !== 0
  ? props.item.options.tasks[0]
  : {})

const envOpts = computed(() => {
  return props.item.options.environments
})

const robOpts = computed(() => {
  return props.item.options.robots
})

const taskOpts = computed(() => {
  return props.item.options.tasks
})

const warningMsg = computed(() => {
  const envMsg = notEmptyRefObj(selectedEnv) ? `in the "${ selectedEnv.value.name }" Enivironment` : ''
  const robMsg = notEmptyRefObj(selectedRob) ? `for the robot "${selectedRob.value.name}"` : ''
  const taskMsg = notEmptyRefObj(selectedTask) ? `performing the task "${ selectedTask.value.name }"` : ''
  return `No executable available ${robMsg} ${taskMsg} ${envMsg}!`
})

function hasNoOptions() {
  let optsLength = props.item.options.environments.length
    + props.item.options.robots.length
    + props.item.options.tasks.length
  return optsLength === 0
}

const composedSrcUrl = computed(() => {
  if (hasNoOptions() || /\.ipynb$/.test(props.item.src_url)) {
    return props.item.src_url
  }
  if (targetNotebook.value && typeof targetNotebook.value === 'string') {
    return `${props.item.src_url}${targetNotebook.value}`
  }
  if (targetNotebook.value && targetNotebook.value.src) {
    return targetNotebook.value.src
  }
  return ''
})

const composedRunUrl = computed(() => {
  if (hasNoOptions() || /\.ipynb$/.test(props.item.run_url)) {
    return props.item.run_url
  }
  if (targetNotebook.value && typeof targetNotebook.value === 'string') {
    return (isAbsoluteUrl(targetNotebook.value)) ? targetNotebook.value : `${props.item.run_url}${targetNotebook.value}`
  }
  if (targetNotebook.value && targetNotebook.value.run) {
    return targetNotebook.value.run
  }
  if (targetNotebook.value) {
  }
  return ''
})

function isAbsoluteUrl(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url) || /^data:/i.test(url);
}

const targetNotebook = computed(() => {
  let env = notEmptyRefObj(selectedEnv) ? `${selectedEnv.value.value}` : ''
  let rob = notEmptyRefObj(selectedRob) ? `_${selectedRob.value.value}` : ''
  let task = notEmptyRefObj(selectedTask) ? `_${selectedTask.value.value}` : ''
  let notebookKey = `${env}${rob}${task}`
  return props.item.notebooks[notebookKey]
})

function notEmptyRefObj(obj) {
  return obj && obj.value && Object.keys(obj.value).length !== 0

}

function runCode(event) {
  window.open(event.target.href, '_blank', 'width=1280,height=720');
  return false;
}

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
            <a class="font-weight-bold" :href="item.link" target="_blank">{{ item.title }}</a>
          </h5>
          <p class="card-text">{{ item.description }}</p>
          <div class="row">
            <div class="options-select row">

              <Dropdown v-if="envOpts.length !== 0" :options="envOpts" v-model="selectedEnv" optionLabel="name"
                placeholder="Select an environment" class="col-md-5 mb-3">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex h-100 align-items-center">
                    <img v-if="slotProps.value.img" class="selected-img" :alt="slotProps.value.name"
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
                    <img v-if="slotProps.option.img" class="option-img" :alt="slotProps.option.name"
                      :src="slotProps.option.img" />
                    <div class="image-missing" v-else></div>
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
              <Dropdown v-if="robOpts.length !== 0" :options="robOpts" v-model="selectedRob" optionLabel="name"
                placeholder="Select an robot" class="col-md-5 mb-3">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex h-100 align-items-center">
                    <img v-if="slotProps.value.img" class="selected-img" :alt="slotProps.value.name"
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
                    <img v-if="slotProps.option.img" class="option-img" :alt="slotProps.option.name"
                      :src="slotProps.option.img" />
                    <div class="image-missing" v-else></div>
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
              <Dropdown v-if="taskOpts.length !== 0" :options="taskOpts" v-model="selectedTask" optionLabel="name"
                placeholder="Select an task" class="col-md-5 mb-3">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex h-100 align-items-center">
                    <img v-if="slotProps.value.img" class="selected-img" :alt="slotProps.value.name"
                      :src="slotProps.value.img" />
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <img v-if="slotProps.option.img" class="option-img" :alt="slotProps.option.name"
                      :src="slotProps.option.img" />
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
            <div v-if="!composedRunUrl" class="text-danger">
              {{ warningMsg }}
            </div>
            <div class="card-buttons">
              <a :class="{ disabled: !composedRunUrl }" :href="composedRunUrl" @click.prevent="runCode($event)"
                class="btn btn-primary">Run
                Code</a>
              <a :class="{ disabled: !item.open_ease }" :href="item.open_ease" target="_blank"
                class="btn btn-secondary">Experimental Data</a>
              <a :class="{ disabled: !composedSrcUrl }" :href="composedSrcUrl" target="_blank"
                class="btn btn-secondary">Source
                Code</a>
              <a :class="{ disabled: !item.asset_url }" :href="item.asset_url" target="_blank"
                class="btn btn-secondary">Assets</a>
              <!-- <a :href="item.videos" target="_blank" class="card-link">Videos</a> -->
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="card-footer text-end">
      <small class="text-muted">Created by
        <span>{{ item.author }}</span> at
        <span>{{ new Date(item.created_time).toDateString() }}</span>
      </small>
    </div>
  </div>
</template>

<style scoped>
.env-select {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.form-floating {
  width: 48%;
}

.card-img {
  height: 100%;
  min-height: 150px;
  object-fit: contain;
}

.form-select option {
  height: 200px;
}

.card-buttons .btn {
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.card-footer span {
  font-style: italic;
}

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

@media (max-width: 768px) {
  .card-img {
    margin-top: 1rem;
    height: 60px;
  }
}
</style>
