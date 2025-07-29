<template>
  <div>
    <div class="controls">
      <div class="slider-container">
        <label for="refresh-rate">Interval de rafraîchissement : {{ refreshRate / 1000 }} secondes</label>
        <input
          type="range"
          id="refresh-rate"
          v-model="refreshRate"
          min="100"
          max="5000"
          step="100"
          @change="updateRefreshInterval"
        >
      </div>
    </div>
    <div style="width: 800px; height: 500px">
      <div id="mapContainer"></div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import { useTSData } from '../stores/TS_data'
import { storeToRefs } from 'pinia'

export default {
  name: "MapTest",
  props: {
    simulator: String,
  },
  data() {
    return {
      map: null,
      marker: null,
      refreshRate: 1000, // Valeur par défaut : 1 seconde
      updateInterval: null
    }
  },
  setup() {
    const store = useTSData()
    const { position } = storeToRefs(store)
    return { store, position }
  },
  mounted() {
    this.map = L.map("mapContainer").setView([48.45, 1.55], 12)
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map)

    this.marker = L.marker([48.45, 1.55]).addTo(this.map)
    this.startPositionUpdate()
  },
  methods: {
    startPositionUpdate() {
      this.stopPositionUpdate() // Arrêter l'interval précédent si existant
      this.updateInterval = setInterval(() => {
        if (this.simulator === 'TS') {
          this.store.fetchPosition()
        }
        else{
          this.store.fetchPositionTSW()
        }
      }, this.refreshRate)
    },
    stopPositionUpdate() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
      }
    },
    updateRefreshInterval() {
      this.startPositionUpdate()
    },
    updateMarkerPosition() {
      if (this.position && this.marker) {
        const newPosition = [this.position.latitude, this.position.longitude]
        this.marker.setLatLng(newPosition)
        this.map.flyTo(newPosition, this.map.getZoom(), {
          duration: 2,
          easeLinearity: 0.5
        })
      }
    }
  },
  watch: {
    position: {
      handler: 'updateMarkerPosition',
      deep: true
    }
  },
  beforeUnmount() {
    this.stopPositionUpdate()
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>

<style scoped>
#mapContainer {
  width: 800px;
  height: 500px;
}

.controls {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.slider-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input[type="range"] {
  width: 100%;
  max-width: 300px;
}

label {
  font-size: 14px;
  color: #333;
}
</style>