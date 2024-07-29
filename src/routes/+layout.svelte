<script>
  import "../app.css";
  export let data;
</script>

<main>
  <h1>{data.access_token}</h1>
  <h1>{data.refresh_token}</h1>
  <slot />
</main>

<style>
  h1 {
    font-size: 10px;
    color: var(--secondary);
  }
  main {
    background-color: var(--background);
  }
</style>
