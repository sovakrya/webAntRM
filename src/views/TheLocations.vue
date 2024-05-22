<script setup lang="ts">
import { ref, watch } from 'vue'
import LocationItem from '@/components/LocationItem.vue'
import { getAllLocations, type GetAllLocationsResponse } from '@/service/RMservice'

const locationName = ref('')
const locationType = ref('')
const locationDimension = ref('')

const locations = ref<GetAllLocationsResponse['results']>([])
let nextPage = 1
const hasNextPage = ref(false)

getAllLocationsFetch()

function getAllLocationsFetch() {
  getAllLocations(nextPage, locationName.value, locationType.value, locationDimension.value).then(
    (resp) => {
      locations.value.push(...resp.results)
      if (resp.info.next) {
        nextPage += 1
        hasNextPage.value = true
        return
      }
      hasNextPage.value = false
    }
  )
}

let timer: number | undefined
watch([locationName, locationType, locationDimension], () => {
  clearTimeout(timer)
  nextPage = 1
  timer = setTimeout(
    () =>
      getAllLocations(
        nextPage,
        locationName.value,
        locationType.value,
        locationDimension.value
      ).then((resp) => {
        locations.value = resp.results
      }),
    200
  )
})
</script>

<template>
  <div class="locations-wrapper">
    <div class="locations-box">
      <img src="../components/icons/rick-and-morty1.svg" class="locations-main-img" />

      <div class="locations-filter-box">
        <div class="filter-name-wrapper">
          <input
            placeholder="Filter by name..."
            class="locations-input-filter"
            v-model="locationName"
          />
          <img src="../components/icons/magnifier.svg" class="locations-filter-magnifier" />
        </div>
        <input
          placeholder="Type"
          class="locations-input-filter"
          v-model="locationType"
          list="type"
        />
        <datalist id="type">
          <option>Planet</option>
          <option>Cluster</option>
          <option>Space station</option>
          <option>Microverse</option>
          <option>TV</option>
          <option>Resort</option>
          <option>Fantasy town</option>
          <option>Dream</option>
        </datalist>
        <input
          placeholder="Dimension"
          class="locations-input-filter"
          v-model="locationDimension"
          list="Dimension"
        />
        <datalist id="Dimension">
          <option>Dimension C-137</option>
          <option>Interdimensional Cable</option>
          <option>Post-Apocalyptic Dimension</option>
          <option>Replacement Dimension</option>
          <option>Cronenberg Dimension</option>
          <option>Fantasy Dimension</option>
          <option>Dimension 5-126</option>
        </datalist>
      </div>

      <div class="locations-list">
        <LocationItem
          :location="location"
          v-for="location of locations"
          :key="location.id"
          @click="$router.push({ name: 'locationDetails', params: { locationId: location.id } })"
        />
      </div>

      <button @click="getAllLocationsFetch" class="locations-button-load-more" v-if="hasNextPage">
        LOAD MORE
      </button>
    </div>
  </div>
</template>

<style scoped>
.locations-wrapper {
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-items: center;
}

.locations-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.locations-main-img {
  width: 326px;
  height: 202px;
}

.locations-filter-box {
  display: flex;
  gap: 20px;
}

.filter-name-wrapper {
  position: relative;
}

.locations-filter-magnifier {
  position: absolute;
  top: 23px;
  left: 6px;
  height: 17.49px;
  width: 17.49px;
}

.locations-input-filter {
  width: 326px;
  height: 56px;
  border: solid 1px #00000080;
  border-radius: 8px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  color: #00000080;
  padding: 30px;
}

.locations-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  width: 100%;
}

.locations-button-load-more {
  width: 154px;
  height: 36px;
  background-color: #f2f9fe;
  border: none;
  border-radius: 4px;
  padding: 10px, 16px, 10px, 16px;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  color: #2196f3;
  box-shadow: 0px 3px 5px 0px #00000033;
  cursor: pointer;
}

.locations-button-load-more:hover {
  background-color: #def0fa;
}

@media (max-width: 360px) {
  .locations-filter-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
