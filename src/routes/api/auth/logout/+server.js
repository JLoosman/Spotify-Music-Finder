import { redirect } from "@sveltejs/kit"

export const GET = ({ cookies }) => {

  cookies.delete("access_token", { path: "/" })
  cookies.delete("refresh_token", { path: "/" })

  throw redirect(302, "/")
}
