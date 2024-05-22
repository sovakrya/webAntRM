<script setup lang="ts">
import CharactersItem from '@/components/CharactersItem.vue'
import {
  getCharactersDetail,
  getSingleEpisode,
  type EpisodesDetails,
  type SingleCharacter
} from '@/service/RMservice'
import { ref, watch } from 'vue'

const props = defineProps<{
  episodeId: number
}>()

const episode = ref<EpisodesDetails>()
const characters = ref<SingleCharacter[]>([])

watch(episode, (episode) => {
  if (!episode) {
    return
  }

  getCharactersDetail(episode.characters).then((resp) => {
    characters.value = resp
  })
})

getSingleEpisodeFetch()

function getSingleEpisodeFetch() {
  getSingleEpisode(props.episodeId).then((resp) => {
    episode.value = resp
  })
}
</script>

<template>
  <div class="episode-details-wrapper">
    <div class="episode-details-name-go-back-box">
      <div class="episode-details-go_back-box">
        <button
          @click="$router.push({ name: 'episodes' })"
          class="episode-details-button-go-back pc"
        >
          <img src="../components/icons/arrow_back.svg" height="16px" width="16px" />
          GO BACK
        </button>

        <button
          class="episode-details-button-go-back mobile"
          @click="$router.push({ name: 'episodes' })"
        >
          <img src="../components/icons/arrow_back.svg" height="16px" width="16px" />
        </button>
      </div>

      <div class="episode-details-name-title">{{ episode?.name }}</div>
    </div>

    <div class="episode-details-info-box">
      <div>
        <div class="episode-details-info-box-title">Episode</div>
        <div class="episode-details-info-box-subtitle">{{ episode?.episode }}</div>
      </div>

      <div>
        <div class="episode-details-info-box-title">Date</div>
        <div class="episode-details-info-box-subtitle">{{ episode?.air_date }}</div>
      </div>
    </div>

    <div class="episode-details-cast-box">
      <div class="episode-details-cast-text">Cast</div>

      <div class="characters-details-list">
        <CharactersItem
          :character="character"
          v-for="character of characters"
          :key="character.id"
          @click="$router.push({ name: 'characterDetails', params: { characterId: character.id } })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(https://myfonts.ru/myfonts?fonts=karya-abadi);

.episode-details-wrapper {
  display: flex;
  flex-direction: column;
  padding: 30px 210px;
  gap: 34px;
}

.episode-details-name-go-back-box {
  position: relative;
  display: flex;
  justify-content: center;
}

.episode-details-go_back-box {
  position: absolute;
  left: 0;
  top: 20px;
}

.characters-details-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  width: 100%;
}

.episode-details-button-go-back {
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

.episode-details-button-go-back:hover {
  background-color: #e7eff3;
  border-radius: 4px;
}

.episode-details-name-title {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 36px;
  color: #081f32;
}

.episode-details-info-box {
  display: flex;
  justify-content: center;
  gap: 201px;
  font-family: 'Roboto';
}

.episode-details-info-box-title {
  font-weight: 700;
  font-size: 16px;
  color: #081f32;
}

.episode-details-info-box-subtitle {
  font-weight: 400;
  font-size: 14px;
  color: #6e798c;
}

.episode-details-cast-box {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.episode-details-cast-text {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  color: #8e8e93;
}

@media (max-width: 360px) {
  .pc {
    display: none;
  }

  .episode-details-wrapper {
    display: flex;
    flex-direction: column;
    padding: 30px;
    gap: 34px;
  }

  .episode-details-go_back-box {
    top: 10px;
  }

  .episode-details-button-go-back {
    width: 30px;
    background: none;
  }

  .episode-details-name-title {
    font-size: 26px;
  }

  .episode-details-info-box {
    gap: 50px;
  }

  .episode-details-cast-text {
    font-size: 16px;
  }
}

@media (min-width: 500px) {
  .mobile {
    display: none;
  }
}
</style>
