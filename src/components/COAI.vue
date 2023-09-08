<script setup>
import COAITile from './COAITile.vue'
import offlineList from '../coai.json'
import { ref } from 'vue'
import axios from 'axios'

let coaiList = ref([])
// let jsonUrl = import.meta.env.COAIURL
let jsonUrl = "https://moodle.intel4coro.de/pluginfile.php/223/mod_resource/content/1/coai.json"

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
      options: {},
      notebooks: [],
      ...e
    }
    _obj.options = {
      environments: [],
      robots: [],
      tasks: [],
      ..._obj.options
    }
    for (let opt in _obj.options) {
      _obj.options[opt] = _obj.options[opt].map(env => {
        return {
          name: '',
          value: '',
          img: '',
          ...env
        }
      })
    }
    return _obj
  })
}

axios.get(jsonUrl).then(response => {
  coaiList.value = dataValidate(response.data)
}).catch(err => {
  console.log('Can not fetch remote json. Use local dev json')
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
