import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'characters' }
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/TheCharacters.vue')
    },
    {
      path: '/characters/:characterId',
      name: 'characterDetails',
      component: () => import('../views/CharactersDetails.vue'),
      props: true
    },

    {
      path: '/episodes',
      name: 'episodes',
      component: () => import('../views/TheEpisodes.vue')
    },

    {
      path: '/episodes/:episodeId',
      name: 'episodeDetails',
      component: () => import('../views/EpisodeDetails.vue'),
      props: true
    },

    {
      path: '/locations',
      name: 'locations',
      component: () => import('../views/TheLocations.vue')
    },
    {
      path: '/locations/:locationId',
      name: 'locationDetails',
      component: () => import('../views/LocationsDetails.vue'),
      props: true
    }
  ]
})

export default router
