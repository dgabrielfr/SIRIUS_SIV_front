<script setup>
import axios from 'axios'
import { ref } from 'vue'

import TrainPosition from './components/TrainPosition.vue'

let data = ref()
async function hello(){
  await axios.get('http://127.0.0.1:6543/hello').then(function (response){
    console.log(response.data)
    data.value = response.data
  })
}

let data_django = ref()
async function hello_django(){
  await axios.get('http://127.0.0.1:8000/trainmap/test/').then(function (response){
    console.log(response.data)
    data_django.value = response.data
  })
}

let data_train_TS = ref()
async function get_coordo_TS(){
  await axios.get('http://127.0.0.1:6543/train_data_TS').then(function (response){
    console.log(response.data)
    data_train_TS.value = response.data
  })
}

let data_train_TSW = ref()
async function get_coordo_TSW(){
  await axios.get('http://127.0.0.1:6543/train_data_TSW').then(function (response){
    console.log(response.data)
    data_train_TSW.value = response.data
  })
}


</script>

<template>
  <div>
    <input type="radio" id="TS" name="simulator" value="TS" checked v-model="simulator"></input>
    <label for="TS">TS</label>
    <input type="radio" id="TSW" name="simulator" value="TSW" v-model="simulator"></input>
    <label for="TSW">TSW</label>
    <p>Simulateur : {{ simulator }}</p>
    <div>
      <button @click="hello">Appel de la route hello du backend</button>
      <p v-if="data">Données renvoyées par le backend : {{ data }}</p>
      <div>
        <button @click="hello_django">Appel de la route hello du backend Django</button>
        <p v-if="data_django">Données renvoyées par le backend : {{ data_django }}</p>
      </div>
    </div>
    <div>
      <button @click="get_coordo_TS">Récupère les coordonnées depuis TS</button>
      <p v-if="data_train_TS">Données renvoyées par le backend : {{ data_train_TS }}</p>
    </div>
    <div>
      <TrainPosition simulator="simulator"></TrainPosition>
    </div>
        <div>
      <button @click="get_coordo_TSW">Récupère les coordonnées depuis TSW</button>
      <p v-if="data_train_TSW">Données renvoyées par le backend : {{ data_train_TSW }}</p>
    </div>
  </div>
</template>
