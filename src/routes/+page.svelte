<script>
  export let data;

  let loggedIn =
    data.access_token !== "undefined" &&
    typeof data.access_token !== "undefined";
</script>

<div class="container">
  <h1>Find new Music</h1>
  <p>A simple application for finding new music</p>
  {#if !loggedIn}
    <a href="api/auth/login">
      <button>Login</button>
    </a>
  {/if}
  {#if loggedIn}
    <a href="explore/popular">
      <button>Explore</button>
    </a>
  {/if}
  {#if loggedIn}
    <a href="api/auth/logout">
      <button class="secondary">Logout</button>
    </a>
  {/if}
</div>

<style>
  .container {
    height: 100vh;
    width: 100%;
    padding-top: 300px;
    background: var(--background);
  }

  .container > * {
    margin: 30px 15px;
  }

  h1 {
    font-size: 80px;
    color: var(--primary);
  }

  p {
    font-size: 25px;
    color: var(--secondary);
  }

  button {
    padding: 10px 20px;
    font-size: 20px;
    color: var(--secondary);
    background-color: var(--primary);
    border: none;
    border-radius: 10px;
  }

  .secondary {
    color: var(--background);
    background-color: var(--secondary);
  }
</style>
