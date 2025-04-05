<script>
  import { base } from '$app/paths';
  import House from './House.svelte';
  import Book from './Book.svelte';
</script>

<div
  class="relative inset-x-0 top-0 flex w-screen flex-row bg-sky-600 px-4 text-lg text-white"
>
  <a class="flex flex-row items-center p-4" href="{base}/">
    <House />
    <p class="align-items invisible px-3 md:visible">Home</p>
  </a>
  <a class="flex flex-row items-center p-4" href="{base}/courses">
    <Book />
    <p class="align-items invisible px-3 md:visible">Courses</p>
  </a>
</div>
