<script setup lang="ts">
import { getAllCharacters, type GetAllCharactersResponse } from '@/service/RMservice'
import { ref, watch } from 'vue'
import CharactersItem from '@/components/CharactersItem.vue'

const name = ref('')
const status = ref('')
const species = ref('')
const gender = ref('')

const characters = ref<GetAllCharactersResponse['results']>([])
let nextPage = 1
const hasNextPage = ref(false)

getAllCharactersFetch()

function getAllCharactersFetch() {
  getAllCharacters(nextPage, name.value, status.value, species.value, gender.value).then((resp) => {
    characters.value.push(...resp.results)
    if (resp.info.next) {
      nextPage += 1
      hasNextPage.value = true
      return
    }

    hasNextPage.value = false
  })
}

let timer: number | undefined
watch([name, status, species, gender], () => {
  clearTimeout(timer)
  nextPage = 1
  timer = setTimeout(
    () =>
      getAllCharacters(nextPage, name.value, status.value, species.value, gender.value).then(
        (resp) => {
          characters.value = resp.results
        }
      ),
    200
  )
})
</script>

<template>
  <div class="characters-wrapper">
    <div class="characters-box">
      <img src="../components/icons/RIM.svg" class="character-main-img" />

      <div class="characters-input-box">
        <div style="position: relative">
          <input class="characters-input" placeholder="Filter by name..." v-model="name" />
          <img src="../components/icons/magnifier.svg" class="magnifierChar" />
        </div>
        <input class="characters-input" placeholder="Species" v-model="species" />
        <input class="characters-input" placeholder="Gender" list="Gender" v-model="gender" />
        <datalist id="Gender">
          <option>female</option>
          <option>male</option>
          <option>genderless</option>
          <option>unknown</option>
        </datalist>
        <input class="characters-input" placeholder="Status" list="Status" v-model="status" />
        <datalist id="Status">
          <option>alive</option>
          <option>dead</option>
          <option>unknown</option>
        </datalist>
      </div>

      <div class="characters-list">
        <CharactersItem
          :character="character"
          v-for="character of characters"
          :key="character.id"
          @click="$router.push({ name: 'characterDetails', params: { characterId: character.id } })"
        />
      </div>

      <button class="button-load-more" v-if="hasNextPage" @click="getAllCharactersFetch">
        LOAD MORE
      </button>
    </div>
  </div>
</template>

<style scoped>
.characters-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 90px 20px 90px;
}

.character-main-img {
  width: 600px;
  height: 200px;
}

.characters-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.characters-input-box {
  display: flex;
  gap: 24px;
}

.characters-input {
  width: 240px;
  height: 56px;
  border: solid 1px #00000080;
  border-radius: 5px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  color: #00000080;
  padding: 30px;
}

.characters-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  width: 100%;
}

.button-load-more {
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

.button-load-more:hover {
  background-color: #def0fa;
}

.magnifierChar {
  position: absolute;
  width: 17.49px;
  height: 17.49px;
  z-index: 1;
  top: 22px;
  left: 8px;
}

@media (max-width: 360px) {
  .characters-wrapper {
    padding: 30px 20px;
  }

  .character-main-img {
    width: 280px;
    height: 100px;
  }

  .characters-input-box {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
}
</style>
