import { json, error } from '@sveltejs/kit'

export const GET = async ({ cookies, url }) => {
  const access_token = cookies.get("access_token")
  const offset = url.searchParams.get("offset");

  const getTopArtists = async () => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=5&offset=${offset}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    const data = await response.json()
    return data
  }

  const randomInt = Math.floor(Math.random() * 5);

  const topArtists = await getTopArtists()
  const topArtistSeed = topArtists.items[randomInt].id

  const getRelatedArtists = async () => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${topArtistSeed}/related-artists`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    if (response.status === 429) {
      throw error(429, "Too many requests")
    }

    const data = await response.json()
    return data
  }

  return json(await getRelatedArtists())
}
