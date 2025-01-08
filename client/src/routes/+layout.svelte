<script>
  import '../app.css';
  import { base } from '$app/paths';
  import Navbar from '../lib/components/Navbar.svelte';
</script>

<svelte:head>
  <title>Reagan Schedule</title>
  <script
    src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.slim.min.js"
  ></script>
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="{base}/favicon-16x16.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="{base}/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="48x48"
    href="{base}/favicon-48x48.png"
  />
</svelte:head>
<div class="z-0 min-h-full bg-sky-50 text-black">
  <Navbar />

  <main class="mx-auto text-center">
    <slot></slot>
    <footer class="mt-4 text-center">
      <p>
        <a
          class="text-sky-600 underline"
          href="https://github.com/renaissancedog/reagan-schedule"
          target="_blank">Star or fork</a
        >
        this repo.
      </p>
      <p class="mb-4 mt-2">Made with ❤️ by William, 2025</p>
    </footer>
  </main>
</div>
