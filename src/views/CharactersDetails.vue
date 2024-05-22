<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  getSingleCharacter,
  getEpisodesDetails,
  type SingleCharacter,
  type EpisodesDetails
} from '@/service/RMservice'

const props = defineProps<{
  characterId: number
}>()

const character = ref<SingleCharacter>()
const episodes = ref<EpisodesDetails[]>([])

watch(character, (character) => {
  if (!character) {
    return
  }

  getEpisodesDetails(character.episode).then((resp) => {
    episodes.value = resp
  })
})

getSingleCharacterFetch()

function getSingleCharacterFetch() {
  getSingleCharacter(props.characterId).then((resp) => {
    character.value = resp
  })
}
</script>

<template>
  <div class="character-details-wrapper">
    <div class="character-details-box">
      <div class="character-details-button-box">
        <button class="button-go-back pc" @click="$router.push({ name: 'characters' })">
          <img src="../components/icons/arrow_back.svg" height="16px" width="16px" />
          GO BACK
        </button>

        <button class="button-go-back mobile" @click="$router.push({ name: 'characters' })">
          <img src="../components/icons/arrow_back.svg" height="16px" width="16px" />
        </button>
      </div>

      <img :src="character?.image" class="character-details-image" />
    </div>

    <span class="character-details-name">{{ character?.name }}</span>

    <div class="character-details-info-ep-text-wrapper">
      <div class="character-details-info-ep-box">
        <div class="character-details-info-ep-text-box">
          <span>Informations</span>
          <span>Episodes</span>
        </div>

        <div class="character-details-content-box">
          <div class="character-details-info-box">
            <span class="character-details-info-box-title">Gender</span>
            <span class="character-details-info-box-subtitle">{{ character?.gender }}</span>

            <div class="divider"></div>

            <span class="character-details-info-box-title">Status</span>
            <span class="character-details-info-box-subtitle">{{ character?.status }}</span>

            <div class="divider"></div>

            <span class="character-details-info-box-title">Species</span>
            <span class="character-details-info-box-subtitle">{{ character?.species }}</span>

            <div class="divider"></div>

            <span class="character-details-info-box-title">Origin</span>
            <span class="character-details-info-box-subtitle"> {{ character?.origin.name }}</span>

            <div class="divider"></div>

            <span class="character-details-info-box-title">Type</span>
            <span class="character-details-info-box-subtitle">{{ character?.type }}</span>

            <div class="divider"></div>

            <span class="character-details-info-box-title">Location</span>
            <span class="character-details-info-box-subtitle">{{ character?.location.name }}</span>

            <div class="divider"></div>
          </div>

          <div class="character-details-ep-box">
            <div
              v-for="episode of episodes"
              :key="episode.id"
              class="character-details-episode-card-box"
            >
              <div class="character-details-episode-card">
                <div class="episode-ep">
                  {{ episode.episode }}
                </div>

                <div class="episode-name">
                  {{ episode.name }}
                </div>

                <div class="episode-date">
                  {{ episode.air_date }}
                </div>
              </div>

              <button
                class="button-arrow-right"
                @click="$router.push({ name: 'episodeDetails', params: { episodeId: episode.id } })"
              >
                <img src="../components/icons/arrow_right.svg" />
              </button>

              <div class="divider"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(https://myfonts.ru/myfonts?fonts=karya-abadi);

.character-details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 14px;
}

.character-details-box {
  display: flex;
  justify-content: center;
  position: relative;
}

.character-details-button-box {
  position: absolute;
  left: 0;
  top: 0;
}

.character-details-image {
  width: 300px;
  height: 300px;
  border-radius: 150px;
  border: solid 5px #f2f2f7;
}

.button-go-back {
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

.button-go-back:hover {
  background-color: #e7eff3;
  border-radius: 4px;
}

.character-details-name {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 48px;
  color: #081f32;
  text-align: center;
}

.character-details-info-ep-text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.character-details-info-ep-text-box {
  display: flex;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  color: #8e8e93;
  padding: 14px;
  gap: 298px;
}

.character-details-info-ep-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.character-details-info-box {
  display: flex;
  flex-direction: column;
  padding: 9px 16px 12px 16px;
  gap: 6px;
  width: 413px;
}

.character-details-info-box-title {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 16px;
  color: #081f32;
}
.character-details-info-box-subtitle {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  color: #6e798c;
}

.character-details-ep-box {
  display: flex;
  flex-direction: column;
  width: 413px;
}

.character-details-episode-card-box {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 10px 16px 16px 16px;
}

.character-details-episode-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: 'Roboto';
}

.episode-ep {
  font-weight: 700;
  font-size: 16px;
  color: #081f32;
}

.episode-name {
  font-weight: 400;
  font-size: 14px;
  color: #6e798c;
}

.episode-date {
  font-weight: 500;
  font-size: 10px;
  color: #8e8e93;
}
.divider {
  height: 1px;
  background-color: #212121;
  filter: opacity(0.08);
}

.button-arrow-right {
  position: absolute;
  right: 22px;
  top: 34px;
  border: none;
  background: none;
  cursor: pointer;
  width: 7.41px;
  height: 12px;
}

.character-details-content-box {
  display: flex;
}

@media (max-width: 360px) {
  .pc {
    display: none;
  }

  .button-go-back {
    background: none;
    width: 30px;
  }

  .character-details-name {
    font-size: 34px;
  }

  .character-details-ep-box {
    width: 212.44px;
  }

  .character-details-info-box {
    width: 119.69px;
  }

  .character-details-info-ep-text-box {
    font-size: 16px;
    gap: 50px;
  }

  .character-details-content-box {
    gap: 20px;
  }

  .character-details-info-ep-text-wrapper {
    flex-direction: row;
  }
}

@media (min-width: 500px) {
  .mobile {
    display: none;
  }
}
</style>
