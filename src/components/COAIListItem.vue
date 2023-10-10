<script setup>

import ActionForm from './ActionForm.vue'

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

</script>

<template>
  <div class="card row mb-3">
    <div class="row">
      <div class="col-md-3">
        <a :href="item.link || ('./#/details/' + index)" target="_blank" >
          <img v-if="item.cover_img" :src="item.cover_img" class="card-img" :alt="item.title">
        </a>
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title">
            <a class="font-weight-bold" :href="item.link || ('./#/details/' + index)" target="_blank">{{ item.title }}</a>
          </h5>
          <p class="card-text">{{ item.description }}</p>
          <div class="row">
            <ActionForm v-if="item.actions.length !== 0"
            :actions="item.actions"
            :urlparams="item.urlparams"
            :options="item.options"/>
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
