<template>
   <Line :data="data" :options="options" />
 </template>
 
 <script lang="ts">
 import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
 } from 'chart.js'
 import { Line } from 'vue-chartjs'
//  import * as chartConfig from './chartConfig.js'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: true
}
 
 ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
 )
 
 export default {
   name: 'App',
   components: {
     Line
   },
   data() {
     return {
      data,
      options
     }
   }
 }
 </script>
 