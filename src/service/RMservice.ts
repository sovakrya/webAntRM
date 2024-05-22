export type GetAllCharactersResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: {
      name: string
      url: string
    }
    location: {
      name: string
      url: string
    }
    image: string
    episode: string[]
    url: string
    created: string
  }[]
}

export type SingleCharacter = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export type GetAllLocationsResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: {
    id: number
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
  }[]
}

export type EpisodesDetails = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export type GetAllEpisodesResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: {
    id: number
    name: string
    air_date: string
    episode: string
    characters: string[]
    url: string
    created: string
  }[]
}

export type SingleLocation = {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export async function getAllCharacters(
  page = 1,
  name?: string,
  status?: string,
  species?: string,
  gender?: string
): Promise<GetAllCharactersResponse> {
  const sp = new URLSearchParams()
  sp.append('page', page.toString())

  if (name) {
    sp.append('name', name)
  }

  if (status) {
    sp.append('status', status)
  }

  if (species) {
    sp.append('species', species)
  }

  if (gender) {
    sp.append('gender', gender)
  }

  const res = await fetch(`https://rickandmortyapi.com/api/character?${sp}`)

  return res.json()
}

export async function getSingleCharacter(id: number): Promise<SingleCharacter> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)

  return res.json()
}

export async function getEpisodesDetails(urls: string[]): Promise<EpisodesDetails[]> {
  return Promise.all(
    urls.map((url) => {
      return fetch(url).then((res) => res.json())
    })
  )
}

export async function getAllEpisodes(page = 1, name?: string): Promise<GetAllEpisodesResponse> {
  const sp = new URLSearchParams()
  sp.append('page', page.toString())

  if (name) {
    if (name[1] === '0') {
      sp.append('episode', name)
    } else {
      sp.append('name', name)
    }
  }

  const res = await fetch(`https://rickandmortyapi.com/api/episode?${sp}`)

  return res.json()
}

export async function getSingleEpisode(id: number): Promise<EpisodesDetails> {
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)

  return res.json()
}

export async function getCharactersDetail(urls: string[]): Promise<SingleCharacter[]> {
  return Promise.all(
    urls.map((url) => {
      return fetch(url).then((res) => res.json())
    })
  )
}

export async function getAllLocations(
  page = 1,
  name?: string,
  type?: string,
  dimension?: string
): Promise<GetAllLocationsResponse> {
  const sp = new URLSearchParams()
  sp.append('page', page.toString())

  if (name) {
    sp.append('name', name)
  }

  if (type) {
    sp.append('type', type)
  }

  if (dimension) {
    sp.append('dimension', dimension)
  }

  const res = await fetch(`https://rickandmortyapi.com/api/location?${sp}`)

  return res.json()
}

export async function getSingleLocation(id: number): Promise<SingleLocation> {
  const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`)

  return res.json()
}
