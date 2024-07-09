import 'dotenv/config'
import { redirect } from '@sveltejs/kit'


export const GET = () => {

  const CLIENT_ID = process.env.CLIENT_ID;

  let url = new URL('https://accounts.spotify.com/authorize?') + new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: 'user-read-private user-read-email user-top-read',
    redirect_uri: 'http://localhost:5173/api/callback'
  })

  console.log(url)
  throw redirect(302, url)

}
