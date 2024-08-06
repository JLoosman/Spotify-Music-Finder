<script>
  import Slide from "$lib/components/Slide.svelte";
  import { onMount } from "svelte";

  let artists = [];
  let offset = 0;
  let error = "";

  $: console.log(artists);
  $: artists, addArtist();

  const getArtists = async () => {
    const response = await fetch(
      `/api/recommendations/artists?offset=${offset}`,
    );

    return await response.json();
  };

  const addArtist = () => {
    if (artists.length === 2) {
      getArtists().then((value) => {
        artists = [...value.artists, ...artists];
      });

      offset++;
    }
  };

  const removeFirst = () => {
    artists.pop();
    artists = artists;
  };

  onMount(() => {
    getArtists().then((value) => {
      if (value.message) {
        console.log("Error " + value.message);
        error = value.message;
      } else {
        artists = [...value.artists, ...artists];
      }
    });
    offset++;
  });
</script>

{#each artists as artist, i}
  <div class="item">
    <Slide
      isArtist={true}
      on:delete={removeFirst}
      index={i}
      imageUrl={artist.images[0].url}
      name={artist.name}
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
