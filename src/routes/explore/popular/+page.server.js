
export const load = async ({ fetch, cookies }) => {
  const chartsPlaylistID = "37i9dQZEVXbNG2KDcFcKOF"

  let access_token = cookies.get("access_token")

  const getCharts = async () => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${chartsPlaylistID}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    const data = await response.json()
    return data.tracks.items
  }

  const charts = await getCharts()

  return {
    tracks: charts
  }
}
