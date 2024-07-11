<script>
  import Slide from "$lib/components/Slide.svelte";

  export let data;

  let cutData = data.tracks.slice(0, 4).reverse();
</script>

<div class="center">
  {#each data.tracks as { track }}
    <div class="stackItem">
      <Slide
        imageUrl={track.album.images[0].url}
        name={track.name}
        artist={track.artists[0].name}
      />
    </div>
  {/each}
</div>

<style>
  .center {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 100px auto;
    padding: 30px 40vw;
  }

  .stackItem {
    position: absolute;
  }
</style>
