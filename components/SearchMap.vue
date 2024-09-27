<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import type { Database } from '~/types/database.types'
type Nanny = Database['public']['Tables']['users_meta']['Row']

const props = defineProps<{
  center: google.maps.LatLngLiteral
  nannys: Nanny[]
}>()

const mapCanvas = ref()

const locations = props.nannys!.map((a) => {
  return {
    lat: Number(a.location!.split(',')[0].trim()),
    lng: Number(a.location!.split(',')[1].trim()),
  }
})

onMounted(() => {
  loadGMaps()
})

const loadGMaps = async () => {
  const config = useRuntimeConfig()
  const loader = new Loader({
    apiKey: config.public.googleApiKey,
    libraries: ['places'],
  })

  const option: google.maps.MapOptions = {
    mapId: 'SEARCH_MAP',
    // center: props.center
    // zoom: 12
  }
  loader
    .importLibrary('maps')
    .then(async ({ Map }) => {
      const map = new Map(mapCanvas.value, option)
      // const map = new google.maps.Map(mapCanvas.value, option)
      const infoWindow = new google.maps.InfoWindow({ maxWidth: 200 })
      const bounds = new google.maps.LatLngBounds()

      // const icon = document.createElement('img')
      // icon.src = 'https://img.icons8.com/offices/2x/person-female-skin-type-1-2.png'

      const { AdvancedMarkerElement } = await loader.importLibrary('marker')

      const markers: google.maps.marker.AdvancedMarkerElement[] = []
      props.nannys.forEach((place, index) => {
        markers.push(
          new AdvancedMarkerElement({
            map,
            title: place.first_name,
            position: locations[index],
            // content: icon,
          })
        )
        bounds.extend(locations[index])
      })
      const infoWindowContent = (nanny: Nanny) => {
        return `
    <h3 class="info-window-title">${nanny.first_name}</h3>
    <div class="info-window-content">${nanny.about}</div>
    <a class="info-window-link" href="/profile/${nanny.id}">More info</a>
    `
      }
      markers.forEach((marker, index) => {
        marker.addListener('click', () => {
          infoWindow.close()
          infoWindow.setContent(infoWindowContent(props.nannys[index]))
          infoWindow.open(marker.map, marker)
        })
      })
      infoWindow.addListener('closeclick', () => {
        map.fitBounds(bounds)
      })
      map.fitBounds(bounds)
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>
<template>
  <div id="mapCanvas" ref="mapCanvas" class="w-full" />
</template>

<style>
h3.info-window-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
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
