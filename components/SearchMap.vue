<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import type { Database } from '~/types/database.types'
type Nanny = Database['public']['Tables']['users_meta']['Row']

const props = defineProps<{
  center: google.maps.LatLngLiteral,
  nannys: Nanny[]
}>()

const mapCanvas = ref()

const locations = props.nannys!.map((a) => {
  return {
    lat: Number(a.location!.split(',')[0].trim()),
    lng: Number(a.location!.split(',')[1].trim())
  }
})

onMounted(() => {
  loadGMaps()
})

const loadGMaps = async () => {
  const config = useRuntimeConfig()
  const loader = new Loader({
    apiKey: config.public.googleApiKey,
    libraries: ['places']
  })
  await loader.load()

  const option:google.maps.MapOptions = {
    // center: props.center
    // zoom: 12
  }
  const map = new google.maps.Map(mapCanvas.value, option)
  const infoWindow = new google.maps.InfoWindow({ maxWidth: 200 })
  const bounds = new google.maps.LatLngBounds()

  const icon = {
    url: 'https://img.icons8.com/offices/2x/person-female-skin-type-1-2.png', // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  }
  const markers:google.maps.Marker[] = []
  props.nannys.forEach((place, index) => {
    markers.push(
      new google.maps.Marker({
        map,
        title: place.name,
        position: locations[index]
        // icon
      })
    )
    bounds.extend(locations[index])
  })
  const infoWindowContent = (nanny:Nanny) => {
    return `
    <h3 class="info-window-title">${nanny.name}</h3>
    <div class="info-window-content">${nanny.about}</div>
    <a class="info-window-link" href="/profile/${nanny.id}">More info</a>
    `
  }
  markers.forEach((marker, index) => {
    marker.addListener('click', () => {
      infoWindow.close()
      infoWindow.setContent(infoWindowContent(props.nannys[index]))
      infoWindow.open(marker.getMap(), marker)
    })
  })
  infoWindow.addListener('closeclick', () => {
    map.fitBounds(bounds)
  })
  map.fitBounds(bounds)
}

</script>
<template>
  <div id="mapCanvas" ref="mapCanvas" class="w-full" />
</template>

<style>
h3.info-window-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;;
}
.info-window-content {
  margin-bottom: 0.2rem;
  line-height: 1.4;
}
.info-window-link {
  text-decoration: underline;
  color: blue;
}
#mapCanvas {
  height: 700px;
}
</style>
