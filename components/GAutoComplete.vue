<script setup lang="ts">
import type { Loader } from '@googlemaps/js-api-loader'
const props = defineProps<{
  loader: Loader
}>()
const initAutoComplete = async () => {
  const { Autocomplete } = await props.loader.importLibrary('places')

  const center = { lat: 40.689247, lng: -74.044502 }
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  }
  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: 'rs' },
    fields: ['address_components', 'geometry'],
    types: ['address'],
  }

  const input = document.getElementById('location-input') as HTMLInputElement
  const addressComplete = new Autocomplete(input, options)
  addressComplete.addListener('place_changed', () => {
    const place = addressComplete.getPlace()
    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      console.error("No details available for input: '" + place.name + "'")
      return
    }

    let address = ''

    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name) || '',
        (place.address_components[1] && place.address_components[1].short_name) || '',
        (place.address_components[2] && place.address_components[2].short_name) || '',
      ].join(' ')
    }

    console.log(place.geometry.location.lat(), address)
  })
}

const onFocus = () => {
  initAutoComplete()
}
</script>

<template>
  <label class="block text-gray-700 font-bold mb-2" for="location-input">Your location</label>
  <input
    id="location-input"
    placeholder="Enter a location"
    class="form-input block w-full bg-gray-200 px-4 py-3 rounded-lg focus:bg-white focus:outline-none focus:shadow-outline"
    type="text"
    required
    @focus="onFocus" />
</template>
