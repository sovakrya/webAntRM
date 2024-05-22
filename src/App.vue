<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="main-box">
    <header class="header-box">
      <img src="./components/icons/logo.svg" width="46px" height="49px" />

      <div class="header-src-box">
        <a class="src" @click="$router.push({ name: 'characters' })">Characters</a>
        <a class="src" @click="$router.push({ name: 'locations' })">Locations</a>
        <a class="src" @click="$router.push({ name: 'episodes' })">Episodes</a>
      </div>
    </header>

    <RouterView class="main-content" />

    <footer class="footer-box">
      <span class="footer-text">Make with ❤️ for the MobProgramming team</span>
    </footer>
  </div>
</template>

<style scoped>
@import url(https://myfonts.ru/myfonts?fonts=karya-abadi);

.main-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.header-box {
  position: sticky;
  top: 0;
  display: flex;
  flex-shrink: 0;
  height: 60px;
  padding: 0px 90px;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: -2px 0px 8px 2px #0000001a;
  z-index: 2;
}

.header-src-box {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 12px;
}

.src {
  font-family: 'Karya Abadi', aria;
  font-weight: 700;
  font-size: 18px;
  color: #000000;
  cursor: pointer;
}

.src:hover {
  text-decoration: underline;
}

.footer-box {
  display: flex;
  height: 60px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  box-shadow: -2px 0px 8px 2px #0000001a;
  flex-shrink: 0;
}

.footer-text {
  font-family: 'Karya Abadi', aria;
  font-weight: 700;
  font-size: 18px;
  color: #212121;
}

@media (max-width: 360px) {
  .header-box {
    padding: 0px 20px;
  }

  .src {
    font-size: 14px;
  }

  .footer-text {
    font-size: 14px;
  }
}
</style>
