import { redirect } from "@sveltejs/kit"

export const handle = async ({ event, resolve }) => {


  const access_token = event.cookies.get("access_token")

  if (access_token === 'undefined' || typeof (access_token) === 'undefined' || !access_token) {
    if (event.url.pathname.startsWith('/explore')) {
      throw redirect(302, '/')
    }
    if (event.url.pathname.startsWith('/api') && !event.url.pathname.startsWith("/api/auth")) {
      throw redirect(302, '/')
    }
  }
  const response = await resolve(event)
  return response
}
