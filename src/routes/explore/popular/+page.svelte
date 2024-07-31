<script>
  import Slide from "$lib/components/Slide.svelte";

  export let data;
</script>

{#each data.tracks as { track }, i}
  <div class="item">
    <Slide
      index={i}
      songURI={track.uri}
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
