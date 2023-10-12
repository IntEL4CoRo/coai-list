<script setup>
import COAIListItem from './COAIListItem.vue'
import offlineList from '../../public/coai.json'
import { coaiUrl, dataValidate } from './utils.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const jsonUrl = route.query.coai || coaiUrl
const categories = ['Research', 'Innovation', "Competition", "Subsystem"]
let coaiList = ref([])

axios.get(jsonUrl).then(response => {
  coaiList.value = dataValidate(response.data)
}).catch(err => {
  console.log('Can not fetch remote json. Use local dev data!')
  coaiList.value = dataValidate(offlineList)
})

</script>
<template>
  <div class="coai-list">
    <div v-for="cate in categories">
      <h3 class="mb-3">{{cate}}</h3>
      <COAIListItem v-for="item in coaiList.filter(item => item.category == cate)" :item="item" :index="coaiList.indexOf(item)" />
    </div>
  </div>
</template>

<style scoped>
.coai-list {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
