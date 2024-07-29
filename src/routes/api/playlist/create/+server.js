import { json } from '@sveltejs/kit'

export const GET = async ({ fetch, cookies }) => {
  const access_token = cookies.get("access_token")

  const userResponse = await fetch("../profile")
  const userData = await userResponse.json()

  const getPlaylistsResponse = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

  const getPlaylistsData = await getPlaylistsResponse.json()

  const matchingPlaylists = getPlaylistsData.items.filter(item => item.name === "New Music Recommandations")

  if (matchingPlaylists.length === 0) {
    const response = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": "New Music Recommandations",
        "description": "new music provided by the music finder application",
        "public": false
      })
    })

    const data = await response.json()
    return json(data.id)
  }
  else {
    return json(matchingPlaylists[0].id)
  }
}
