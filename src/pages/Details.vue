<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import offlineList from '../../public/coai.json'
import ActionForm from '../components/ActionForm.vue'

import { marked } from 'marked';

import {
  coaiUrl,
  isYouTubeVideo,
  isMP4Video,
  dataValidate
} from '../utils.js'

const route = useRoute()
const jsonUrl = route.query.coai || coaiUrl
const index = Number(route.params.id)
const info = ref(undefined)

axios.get(jsonUrl).then(response => {
  info.value = dataValidate(response.data)[index]
}).catch(err => {
  console.log('Can not fetch remote json. Use local dev data!')
  info.value = dataValidate(offlineList)[index]
})


const markdownIntro = ref(undefined);
const markdownDetails = ref(undefined);

function markdownToHml(path, target) {
  axios.get(path).then(function(response){
    //console.log(response);
    target.value = marked(response.data);
  }).catch(function(err){
    console.log(err);
    target.value = marked('#Error');
  });
}

axios.get(jsonUrl).then(function(response){
  info.value = dataValidate(response.data)[index]
}).catch(function(err){
  console.log('Can not fetch remote json. Use local dev data!')
  info.value = dataValidate(offlineList)[index]
}).finally(function () {
  // try load and transform markdown file for the intro
  const mdFileIntro = info.value['md_file_intro'] || './project_descriptions/template_intro.md';
  markdownToHml(mdFileIntro, markdownIntro)
  
  // try load and transform markdown file for the details
  const mdFileDetails = info.value[ 'md_file_details'] || './project_descriptions/template_details.md';
  markdownToHml(mdFileDetails, markdownDetails)
});

</script>
<template>
  <div class="details">
    <div v-if="info">
      <div v-html="markdownIntro">
      </div>
      <br/>
      
      <div class="form text-center">
        <ActionForm v-if="info.actions.length !== 0"
            :actions="info.actions"
            :urlparams="info.urlparams"
            :options="info.options"/>
      </div>
      <br/>
      
      <div v-html="markdownDetails">
      </div>
      
    </div>
    <h2 class="text-center" v-else>Page not found!</h2>
  </div>
</template>

<style scoped>
.details {
  padding: 3rem 0;
  max-width: 960px;
  margin: 0 auto;
}

iframe,
video {
  width: 100%;
  height: 480px;
  max-width: 864px;
  overflow: hidden;
}

.descriptions {
  margin: 3rem 0;
  text-align: left;
}

.card-buttons .btn {
  margin-right: 2rem;
  margin-top: 1rem;
}

.descriptions p {
  font-size: 1rem;
}

.software {
  margin: 3rem 0;
}
.source-code-link img {
  height: 16px;
  margin-right: 6px;
}

.card-group>div {
  padding: 1rem;
}

.card {
  width: 100%;
  border-radius: 0;
  justify-content: center;
  height: 100%;
}

.card-img {
  height: 100%;
  object-fit: contain;
  padding: 1.5rem;
}
</style>
