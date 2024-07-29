import 'dotenv/config'
import { redirect } from '@sveltejs/kit'

export const load = async ({ cookies, fetch, url }) => {
  let access_token = cookies.get("access_token")
  let refresh_token = cookies.get("refresh_token")
  const CLIENT_ID = process.env.CLIENT_ID
  const CLIENT_SECRET = process.env.CLIENT_SECRET

  if (access_token === 'undefined' || typeof (access_token) === 'undefined') {
    if (url.pathname !== '/') {
      redirect(302, '/')
    }
    return {
      access_token: undefined,
      refresh_token: undefined
    }
  }

  const getProfile = async () => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    const data = await response.json()

    return data
  }

  const refreshToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: CLIENT_ID
      })
    })
    // console.log(response)
    const data = await response.json()
    return data
  }

  const profile = await getProfile()

  // console.log(profile)

  if (profile.error && profile.error.status === 401) {
    const newToken = await refreshToken()
    // console.log(newToken)
    access_token = newToken.access_token
    refresh_token = newToken.refresh_token === 'undefined' || typeof (newToken.refreshToken) === 'undefined' ? refresh_token : newToken.refresh_token

    cookies.set("access_token", access_token, { path: "/" })
    cookies.set("refresh_token", refresh_token, { path: "/" })
  }

  return {
    access_token,
    refresh_token
  }
}
