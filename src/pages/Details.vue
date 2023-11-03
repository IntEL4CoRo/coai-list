<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import offlineList from '../../public/coai.json'
import ActionForm from '../components/ActionForm.vue'

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

</script>
<template>
  <div class="details">
    <div v-if="info">
      <h2 class="mb-4 text-center"> {{ info.title }} </h2>
      <div class="videos text-center">
        <p v-for="video in info.videos">
          <video v-if="isMP4Video(video.src)" :src="video.src" controls></video>
          <iframe v-if="isYouTubeVideo(video.src)" frameborder="0" allowfullscreen="allowfullscreen" :src="video.src" scrolling="no">
          </iframe>
        </p>
      </div>

      <div class="descriptions text-center">
        <h4 v-if="info.sub_title">{{ info.sub_title }}</h4>
        <p v-html="info.description_details || info.description"></p>
      </div>
      <div class="form text-center">
        <ActionForm v-if="info.actions.length !== 0"
            :actions="info.actions"
            :urlparams="info.urlparams"
            :options="info.options"/>
      </div>
      <div class="software" v-if="info.software_components.length !== 0">
        <h3 class="mb-3">Software Components</h3>
        <div class="card-group">
          <div class="col-md-6" v-for="software in info.software_components">
            <div class="card">
              <div class="row no-gutters">
                <a class="img-link col-md-6" :href="software.link" target="_blank">
                  <img :src="software.image" class="card-img" :alt="software.title">
                </a>
                <div class="col-md-6">
                  <div class="card-body">
                    <p class="card-text">
                      <a :href="software.link" target="_blank"><b>{{ software.title }}</b></a>
                      {{ software.description }}
                    </p>
                    <small class="text-muted">
                      <a class="source-code-link" :href="software.source_url" target="_blank">
                        <img src="https://iris.informatik.uni-bremen.de/images/github.svg" alt="github">Source Code</a>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
