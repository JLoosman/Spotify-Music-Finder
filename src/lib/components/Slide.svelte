<script>
  import { createEventDispatcher } from "svelte";
  import { Howl, Howler } from "howler";

  export let index;
  export let songURI = "";
  export let imageUrl = "";
  export let name = "";
  export let artist = "";
  export let preview = "";

  export let isArtist = false;

  let isHidden = false;
  let isPlaying = false;

  const dispatch = createEventDispatcher();

  let sound;

  if (!isArtist) {
    sound = new Howl({
      src: [preview],
      html5: true,
      onend: function () {
        isPlaying = false;
      },
    });
    sound.volume(0.5);
  }

  const handleRemove = () => {
    dispatch("delete");
    if (sound.playing) {
      sound.stop();
      isPlaying = false;
    }
    isHidden = !isHidden;
  };

  const handlePlay = () => {
    if (!isArtist) {
      console.log(sound.playing());
      if (sound.playing()) {
        sound.pause();
        isPlaying = false;
      } else {
        sound.play();
        isPlaying = true;
      }
    }
  };

  const handleAdd = async () => {
    isHidden = !isHidden;
    const playlist = await fetch("/api/playlist/create");
    const playlistID = await playlist.json();

    await fetch("/api/playlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songURI: songURI,
        playlistID: playlistID,
      }),
    });
  };
</script>

<div class="container" class:hidden={isHidden}>
  <div class="card">
    <img
      src={imageUrl}
      alt="Album cover"
      loading={index === 49 || index === 48 ? "eager" : "lazy"}
    />
    <h2>{name.slice(0, 20)}</h2>
    <p>{artist}</p>
  </div>
  <div class="buttons">
    <button on:click={handleRemove}>
      <svg
        width="256px"
        height="256px"
        viewBox="0 0 24 24"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        style="display:inline-block;vertical-align:middle"
        xmlns="http://www.w3.org/2000/svg"
        ><g fill="currentColor"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M20 20L4 4m16 0L4 20"
          /></g
        ></svg
      >
    </button>
    <button on:click={handlePlay}>
      {#if !isPlaying}
        <svg
          width="256px"
          height="256px"
          viewBox="0 0 16 16"
          fill="currentColor"
          x="128"
          y="128"
          role="img"
          style="display:inline-block;vertical-align:middle"
          xmlns="http://www.w3.org/2000/svg"
          ><g fill="currentColor"
            ><path
              fill="currentColor"
              d="m11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
            /></g
          ></svg
        >
      {/if}
      {#if isPlaying}
        <svg
          width="512"
          height="512"
          viewBox="0 0 512 512"
          style="color:currentColor"
          xmlns="http://www.w3.org/2000/svg"
          class="h-full w-full"
          ><rect
            width="512"
            height="512"
            x="0"
            y="0"
            rx="30"
            fill="transparent"
            stroke="transparent"
            stroke-width="0"
            stroke-opacity="100%"
            paint-order="stroke"
          ></rect><svg
            width="512px"
            height="512px"
            viewBox="0 0 24 24"
            fill="currentColor"
            x="0"
            y="0"
            role="img"
            style="display:inline-block;vertical-align:middle"
            xmlns="http://www.w3.org/2000/svg"
            ><g fill="currentColor"
              ><path
                fill="currentColor"
                d="M17.276 5.47c.435.16.724.575.724 1.039V17.49c0 .464-.29.879-.724 1.039a3.69 3.69 0 0 1-2.552 0A1.107 1.107 0 0 1 14 17.491V6.51c0-.464.29-.879.724-1.04a3.69 3.69 0 0 1 2.552 0Zm-8 0c.435.16.724.575.724 1.039V17.49c0 .464-.29.879-.724 1.039a3.69 3.69 0 0 1-2.552 0A1.107 1.107 0 0 1 6 17.491V6.51c0-.464.29-.879.724-1.04a3.69 3.69 0 0 1 2.552 0Z"
              /></g
            ></svg
          ></svg
        >
      {/if}
    </button>
    <button on:click={handleAdd}>
      <svg
        width="256px"
        height="256px"
        viewBox="0 0 1024 1024"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        style="display:inline-block;vertical-align:middle"
        xmlns="http://www.w3.org/2000/svg"
        ><g fill="currentColor"
          ><path
            fill="currentColor"
            d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9z"
          /></g
        ></svg
      >
    </button>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .hidden {
    display: none;
  }

  .card {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 20px auto;
    background: var(--secondary);
    border-radius: 20px;
    padding: 20px;
    max-width: 350px;
  }

  .card > img {
    height: 300px;
    width: 300px;
    margin-bottom: 20px;
  }

  .card > h2 {
    height: 34px;
  }
  .card > p {
    margin: 10px;
  }

  svg {
    height: 30px;
    width: 30px;
    margin: 0;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    padding: 0 10px;
    width: 300px;
  }

  button {
    height: 50px;
    width: 50px;
    padding: 10px;
    background-color: var(--secondary);
    border: none;
    border-radius: 30px;
  }
</style>
