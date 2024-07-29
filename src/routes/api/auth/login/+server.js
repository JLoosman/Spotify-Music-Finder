import 'dotenv/config'
import { redirect } from '@sveltejs/kit'


export const GET = ({ cookies }) => {

  if (cookies.get("access_token") && cookies.get("access_token") !== 'undefined') {
    throw redirect(302, "/")
  }
  const CLIENT_ID = process.env.CLIENT_ID;

  let url = new URL('https://accounts.spotify.com/authorize?') + new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private playlist-read-private',
    redirect_uri: 'http://localhost:5173/api/auth/callback'
  })

  console.log(url)
  throw redirect(302, url)

}
