<script setup lang="ts">
type Character = {
  id: number
  image: string
  name: string
  species: string
}

const props = defineProps<{
  character: Character
}>()
</script>

<template>
  <div class="character-item-box">
    <img :src="character.image" height="168px" class="item-character-image" />

    <div class="item-character-text-box">
      <span class="item-character-name">{{ character.name }}</span>
      <span class="item-character-species">{{ character.species }}</span>
    </div>
  </div>
</template>

<style scoped>
.character-item-box {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 0px #00000033;
  border-radius: 4px;
  cursor: pointer;
}

.character-item-box:hover {
  box-shadow: 0px 5px 8px 0px #00000033;
}

.item-character-image {
  border-radius: 4px 4px 0px 0px;
}

.item-character-text-box {
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 4px;
}

.item-character-name {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  color: #000000de;
}

.item-character-species {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  color: #00000099;
}
</style>
