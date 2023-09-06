<script setup>
import COAITile from './COAITile.vue'
import offlineList from '../../public/coai.json'
import { ref } from 'vue'
import axios from 'axios'

let coaiList = ref([])
let jsonUrl = 'https://iris.informatik.uni-bremen.de/data/coai.json'

if (import.meta.env.DEV) {
  jsonUrl = 'coai.json'
}

function randomDate() {
  const start = 1683995706000
  const end = 1693905934063

  return Math.round(Math.random() * (end - start)) + start
}

function dataValidate(data) {
  return data.map(e => {
    let _obj = {
      title: '',
      cover_img: '',
      description: '',
      link: '',
      src_url: '',
      open_ease: '',
      run_url: '',
      asset_url: '',
      author: 'unknown',
      created_time: randomDate(),
      environment: [],
      ...e
    }
    _obj.environment = _obj.environment.map(env => {
      return {
        name: '',
        robot: [],
        task: [],
        ...env
      }
    })
    return _obj
  })
}

axios.get(jsonUrl).then(response => {
  coaiList.value = dataValidate(response.data)
}).catch(err => {
  console.log(err)
  coaiList.value = dataValidate(offlineList)
})

</script>

<template>
  <div class="coai-list">
    <COAITile v-for="(item, index) in coaiList" :item="item" :index="index" />
  </div>
</template>

<style scoped>
.coai-list {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
