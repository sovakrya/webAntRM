<script setup lang="ts">
import CharactersItem from '@/components/CharactersItem.vue'
import {
  getCharactersDetail,
  getSingleLocation,
  type SingleCharacter,
  type SingleLocation
} from '@/service/RMservice'
import { ref, watch } from 'vue'

const props = defineProps<{
  locationId: number
}>()

const location = ref<SingleLocation>()
const characters = ref<SingleCharacter[]>([])

watch(location, (location) => {
  if (!location) {
    return
  }

  getCharactersDetail(location.residents).then((resp) => {
    characters.value = resp
  })
})

getSingleLocation(props.locationId).then((resp) => {
  location.value = resp
})
</script>

<template>
  <div class="locations-detail-wrapper">
    <div class="locations-detail-name-go-back-box">
      <div class="locations-details-go_back-box">
        <button
          class="location-details-button-go-back pc"
          @click="$router.push({ name: 'locations' })"
        >
          <img src="../components/icons/arrow_back.svg pc" height="16px" width="16px" />
          GO BACK
        </button>

        <button
          class="location-details-button-go-back mobile"
          @click="$router.push({ name: 'locations' })"
        >
          <img src="../components/icons/arrow_back.svg" height="16px" width="16px" />
        </button>
      </div>

      <div class="location-details-location_name">{{ location?.name }}</div>
    </div>

    <div class="location-details-info-box">
      <div>
        <div class="location-details-info-title">Type</div>
        <div class="location-details-info-subtitle">{{ location?.type }}</div>
      </div>

      <div>
        <div class="location-details-info-title">Dimension</div>
        <div class="location-details-info-subtitle">{{ location?.dimension }}</div>
      </div>
    </div>

    <div class="location-details-residents">Residents</div>

    <div class="locations-detail-character-list">
      <CharactersItem
        :character="character"
        v-for="character of characters"
        :key="character.id"
        @click="$router.push({ name: 'characterDetails', params: { characterId: character.id } })"
      />
    </div>
  </div>
</template>

<style scoped>
@import url(https://myfonts.ru/myfonts?fonts=karya-abadi);

.locations-detail-wrapper {
  display: flex;
  flex-direction: column;
  padding: 30px 210px;
  gap: 24px;
}

.locations-detail-name-go-back-box {
  position: relative;
  display: flex;
  justify-content: center;
}

.locations-details-go_back-box {
  position: absolute;
  left: 0;
  top: 20px;
}

.locations-detail-character-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  width: 100%;
}

.location-details-button-go-back {
  display: flex;
  align-items: center;
  width: 120px;
  gap: 6px;
  height: 24px;
  border: none;
  background-color: #ffffff;
  font-family: 'Karya Abadi', aria;
  font-weight: 700;
  font-size: 18px;
  color: #000000;
  cursor: pointer;
}

.location-details-button-go-back:hover {
  background-color: #e7eff3;
  border-radius: 4px;
}

.location-details-location_name {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 36px;
  color: #081f32;
  text-align: center;
}

.location-details-info-box {
  display: flex;
  justify-content: center;
  gap: 224px;
  font-family: 'Roboto';
}

.location-details-info-title {
  font-weight: 700;
  font-size: 16px;
  color: #081f32;
}

.location-details-info-subtitle {
  font-weight: 400;
  font-size: 14px;
  color: #6e798c;
}

.location-details-residents {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  color: #8e8e93;
}

@media (max-width: 360px) {
  .pc {
    display: none;
  }

  .locations-detail-wrapper {
    display: flex;
    flex-direction: column;
    padding: 30px 40px;
    gap: 24px;
  }

  .location-details-button-go-back {
    width: 30px;
  }

  .location-details-location_name {
    font-size: 26px;
  }

  .locations-details-go_back-box {
    top: 9px;
  }

  .location-details-info-box {
    gap: 50px;
  }

  .location-details-residents {
    font-size: 16px;
  }
}

@media (min-width: 500px) {
  .mobile {
    display: none;
  }
}
</style>
