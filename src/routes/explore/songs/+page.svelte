<script>
  import Slide from "$lib/components/Slide.svelte";

  export let data;

  console.log(data.tracks[0].track.preview_url);
</script>

<div class="center">
  {#each data.tracks as { track }, i}
    <div class="stackItem">
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
</div>

<style>
  .center {
    position: relative;
    height: 100vh;
    width: 100%;
  }

  .stackItem {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    margin-top: 200px;
  }
</style>
