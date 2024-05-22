<script setup lang="ts">
type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
}

const props = defineProps<{
  episode: Episode
}>()
</script>

<template>
  <div class="episode-item-box">
    <div class="episode-item-name">
      {{ props.episode.name }}
    </div>

    <div class="episode-item-date">
      {{ props.episode.air_date }}
    </div>

    <div class="episode-item-episode">
      {{ props.episode.episode }}
    </div>
  </div>
</template>

<style scoped>
.episode-item-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
  padding: 25px 16px;
  box-shadow: 0px 3px 4px 0px #00000033;
  cursor: pointer;
  font-family: 'Roboto';
}

.episode-item-box:hover {
  box-shadow: 0px 6px 8px 0px #00000033;
}

.episode-item-name {
  font-weight: 500;
  font-size: 20px;
  color: #000000de;
  text-align: center;
}

.episode-item-date {
  font-weight: 400;
  font-size: 14px;
  color: #00000099;
}

.episode-item-episode {
  font-weight: 700;
  font-size: 14px;
  color: #00000099;
}
</style>
