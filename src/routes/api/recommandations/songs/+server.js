import { json } from '@sveltejs/kit'

export const GET = async () => {
  const access_token = cookies.get("access_token")

  return json(1)
}
