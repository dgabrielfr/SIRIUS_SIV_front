<script setup>
import axios from 'axios'
import { ref } from 'vue'

let data = ref()
async function hello(){
  await axios.get('http://127.0.0.1:6543/hello').then(function (response){
    console.log(response.data)
    data.value = response.data
  })
}
</script>

<template>
  <div>
    <button @click="hello">Appel de la route hello du backend</button>
    <p v-if="data">Données renvoyées par le backend : {{ data }}</p>
  </div>
</template>
