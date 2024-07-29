import { json } from '@sveltejs/kit'


export const GET = async ({ cookies }) => {
  const access_token = cookies.get("access_token")

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })

  const data = await response.json()

  return json(data)
}
