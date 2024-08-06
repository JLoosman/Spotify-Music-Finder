import { json, error } from '@sveltejs/kit'

export const GET = async ({ cookies, url }) => {
  const access_token = cookies.get("access_token")
  const offset = url.searchParams.get("offset")

  const getTopTracks = async () => {
    const topTracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=1&offset=${offset}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    const data = await topTracks.json()

    return data;
  }

  const topTracks = await getTopTracks()

  const seed = topTracks.items[0].id

  const getRecommendations = async () => {
    const recommendation = await fetch(`https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${seed}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    if (recommendation.status === 429) {
      throw error(429, "Too many requests")
    }

    data = await recommendation.json()

    return data
  }

  const recommendation = await getRecommendations()

  return json(recommendation)
}
