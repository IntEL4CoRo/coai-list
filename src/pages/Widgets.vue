<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ActionForm from '../components/ActionForm.vue'

const route = useRoute()
const jsonUrl = route.query.data
const widgetName = route.params.name
const data = ref(undefined)

jsonUrl && axios.get(jsonUrl).then(response => {
  data.value = response.data
}).catch(err => {
  console.log(err)
})

</script>
<template>
  <ActionForm
      v-if="widgetName === 'ActionForm' && data && data.actions.length !== 0"
      :actions="data.actions"
      :urlparams="data.urlparams"
      :options="data.options"
  ></ActionForm>
</template>

<style scoped>
</style>
