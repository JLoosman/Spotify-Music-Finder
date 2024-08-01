<script>
  import Slide from "$lib/components/Slide.svelte";
  import { onMount } from "svelte";

  let tracks = [];

  $: console.log(tracks);

  $: tracks, addTracks();

  const getTracks = async (offset) => {
    const tracks = await fetch(`/api/recommendations/songs?offset=${offset}`);

    return tracks.json();
  };

  const addTracks = async () => {
    if (tracks.length === 1) {
      getTracks(1).then((value) => {
        tracks = [...value.tracks, ...tracks];
      });
    }
  };

  const removeFirst = () => {
    console.log(tracks[tracks.length - 1].name);
    tracks.pop();
    tracks = tracks;
  };

  onMount(() => {
    getTracks(0).then((value) => {
      tracks = [...tracks, ...value.tracks];
    });
  });
</script>

{#each tracks as track, i}
  <div class="item">
    <Slide
      on:delete={removeFirst}
      index={i}
      imageUrl={track.album.images[0].url}
      name={track.name}
      artist={track.artists[0].name}
      preview={track.preview_url}
    />
  </div>
{/each}

<style>
  .item {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    margin-top: 200px;
  }
</style>
