<script>
  import { page } from "$app/stores";

  let urlArr = [];
  let url = "";

  $: urlArr = $page.url.pathname.split("/");
  $: url = urlArr[urlArr.length - 1];
</script>

<div class="container">
  <div class="left">
    <a class:current={url === "popular"} href="./popular">Popular</a>
    <a class:current={url === "foryou"} href="./foryou">For You</a>
    <a class:current={url === "artists"} href="./artists">Artists</a>
  </div>
  <div class="right">
    <slot></slot>
  </div>
</div>

<style>
  .container {
    display: flex;
  }

  .left {
    position: absolute;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    z-index: 2;
  }

  .right {
    position: relative;
    height: 100vh;
    width: 100vw;
  }

  a {
    font-size: 25px;
    color: #333;
    text-decoration: none;
  }

  .current {
    font-size: 30px;
    color: #eee;
    padding-left: 10px;
  }
</style>
