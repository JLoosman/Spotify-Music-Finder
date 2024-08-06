import { json, error } from '@sveltejs/kit'

export const GET = async ({ cookies }) => {
  const access_token = cookies.get("access_token")
  const offset = 0;

  const getTopArtists = async () => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=1&offset=${offset}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    const data = await response.json()
    return data
  }

  const topArtists = await getTopArtists()
  const topArtistSeed = topArtists.items[0].id

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
