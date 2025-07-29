import { defineStore } from 'pinia'
import axios from "axios";

export const useTSData = defineStore('tsData', {
  state: () => ({
    latitude: null,
    longitude: null,
    loading: false,
    error: null
  }),

  getters: {
    position: (state) => {
      if (state.latitude && state.longitude) {
        return {
          latitude: state.latitude,
          longitude: state.longitude
        }
      }
      return null
    },

    hasPosition: (state) => {
      return state.latitude !== null && state.longitude !== null
    }
  },

  actions: {
    async fetchPosition() {
      this.loading = true
      this.error = null

      try {
        const [latitudeRes, longitudeRes] = await Promise.all([
          axios.get('http://localhost:8888/api/railworks/virtual/Latitude'),
          axios.get('http://localhost:8888/api/railworks/virtual/Longitude')
        ])

        this.latitude = latitudeRes.data
        this.longitude = longitudeRes.data

      } catch (e) {
        this.error = "Erreur lors de la récupération de la position"
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async fetchPositionTSW() {
      this.loading = true;
      this.error = null;

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:31270/get/DriverAid.PlayerInfo',
        headers: {
          'DTGCommKey': '5c8N1tnWPtApKPkUzCufVp5XmsbQKcEEiDgt3wUgiHk='
        }
      };

      try {
        const response = await axios.request(config);
        console.log("response.data : ", response.data);
        this.latitude = response.data.Values.geoLocation.latitude;
        this.longitude = response.data.Values.geoLocation.longitude;
      } catch (error) {
        this.error = "Erreur lors de la récupération de la position";
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
})