<script>
  import Slide from "$lib/components/Slide.svelte";
  import { onMount } from "svelte";

  let tracks = [];
  let offset = 0;
  let error;

  $: console.log(tracks);

  $: tracks, addTracks();

  const getTracks = async (offset) => {
    const tracks = await fetch(`/api/recommendations/songs?offset=${offset}`);

    return tracks.json();
  };

  const addTracks = async () => {
    if (tracks.length === 2) {
      getTracks(offset).then((value) => {
        tracks = [...value.tracks, ...tracks];
      });

      offset++;
    }
  };

  const removeFirst = () => {
    tracks.pop();
    tracks = tracks;
  };

  onMount(() => {
    getTracks(offset).then((value) => {
      if (value.message) {
        console.log(value.message);
        error = value.message;
      } else {
        tracks = [...tracks, ...value.tracks];
      }
    });
    offset++;
  });
</script>

{#each tracks as track, i}
  <div class="item">
    <Slide
      on:delete={removeFirst}
      index={i}
      songURI={track.uri}
      imageUrl={track.album.images[0].url}
      name={track.name}
      artist={track.artists[0].name}
      preview={track.preview_url}
    />
  </div>
{/each}

{#if error}
  <h1 class="item">{error}</h1>
{/if}

<style>
  h1 {
    color: #ddd;
    margin-top: 400px !important;
  }
  .item {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    margin-top: 200px;
  }
</style>
