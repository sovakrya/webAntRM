<script setup lang="ts">
type Location = {
  id: number
  name: string
  type: string
}

const props = defineProps<{
  location: Location
}>()
</script>

<template>
  <div class="location-item-box">
    <div class="location-name">{{ props.location.name }}</div>
    <div class="location-type">{{ props.location.type }}</div>
  </div>
</template>

<style scoped>
.location-item-box {
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  font-family: 'Roboto';
  border-radius: 4px;
  box-shadow: 0px 1px 5px 0px #00000033;
  padding: 38px 16px;
  gap: 1px;
  align-items: center;
  cursor: pointer;
}

.location-item-box:hover {
  box-shadow: 0px 3px 7px 0px #00000057;
}

.location-name {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  color: #000000de;
  text-align: center;
}

.location-type {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  color: #00000099;
  text-align: center;
}
</style>
