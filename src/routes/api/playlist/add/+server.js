import { json } from '@sveltejs/kit'

export const POST = async ({ request, cookies }) => {
  const access_token = cookies.get("access_token")
  const { songURI, playlistID } = await request.json()

  const addSong = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'uris': [songURI]
    })
  })

  return json(0)
}
