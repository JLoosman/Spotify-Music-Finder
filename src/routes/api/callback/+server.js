import 'dotenv/config'
import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, cookies }) => {

  const code = url.searchParams.get("code")
  const CLIENT_ID = process.env.CLIENT_ID
  const CLIENT_SECRET = process.env.CLIENT_SECRET


  let options = {
    method: 'POST',
    headers: {
      'Contente-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: 'http://localhost:5173/api/callback',
      grant_type: 'authorization_code'
    })
  }
  const response = await fetch('https://accounts.spotify.com/api/token', options)
  const data = await response.json()
  console.log(data)

  let access_token = data.access_token
  let refresh_token = data.refresh_token

  cookies.set('access_token', access_token, { path: "/" })
  cookies.set('refresh_token', refresh_token, { path: "/" })

  throw redirect(302, "/")
}
