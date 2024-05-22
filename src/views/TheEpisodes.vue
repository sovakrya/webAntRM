<script setup lang="ts">
import EpisodeItem from '@/components/EpisodeItem.vue'
import { getAllEpisodes, type GetAllEpisodesResponse } from '@/service/RMservice'
import { ref, watch } from 'vue'

const episodeFilter = ref('')

const episodes = ref<GetAllEpisodesResponse['results']>([])
let nextPageEp = 1
const hasNextPageEp = ref(false)

getAllEpisodesFetch()

function getAllEpisodesFetch() {
  getAllEpisodes(nextPageEp).then((resp) => {
    episodes.value.push(...resp.results)

    if (resp.info.next) {
      nextPageEp += 1
      hasNextPageEp.value = true
      return
    }

    hasNextPageEp.value = false
  })
}

let timer: number | undefined
watch(episodeFilter, () => {
  clearTimeout(timer)
  nextPageEp = 1
  timer = setTimeout(
    () =>
      getAllEpisodes(nextPageEp, episodeFilter.value).then((resp) => {
        episodes.value = resp.results
      }),
    200
  )
})
</script>

<template>
  <div class="episodes-box">
    <div class="episodes-filter-box">
      <img src="../components/icons/rick-and-morty2.svg" class="episodes-main-img" />

      <div class="filter-wrapper">
        <input
          placeholder="Filter by name or episode (ex. S01 or S01E02)"
          class="input-filter"
          v-model="episodeFilter"
        />
        <img src="../components/icons/magnifier.svg" class="magnifier" />
      </div>
    </div>

    <div class="episodes-list">
      <EpisodeItem
        :episode="episode"
        v-for="episode of episodes"
        :key="episode.id"
        @click="$router.push({ name: 'episodeDetails', params: { episodeId: episode.id } })"
      />
    </div>

    <button @click="getAllEpisodesFetch" class="button-load-more-episode" v-if="hasNextPageEp">
      LOAD MORE
    </button>
  </div>
</template>

<style scoped>
.episodes-box {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.episodes-filter-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.episodes-main-img {
  width: 269.55px;
  height: 210px;
}

.filter-wrapper {
  position: relative;
}

.input-filter {
  display: flex;
  gap: 8px;
  width: 500px;
  height: 56px;
  padding: 16px 16px 16px 34px;
  border: solid 1px #00000080;
  border-radius: 8px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  color: #00000080;
}

.magnifier {
  position: absolute;
  width: 17.49px;
  height: 17.49px;
  z-index: 1;
  top: 20px;
  left: 8px;
}

.episodes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  padding: 65px 210px;
}

.button-load-more-episode {
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
  align-self: center;
}

.button-load-more-episode:hover {
  background-color: #def0fa;
}

@media (max-width: 360px) {
  .input-filter {
    width: 300px;
    font-size: 12px;
  }

  .episodes-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    padding: 26px 14px;
  }
}
</style>
