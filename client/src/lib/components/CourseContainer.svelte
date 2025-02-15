<script>
  let data = $state([]);
  let { searchQuery } = $props();
  import { onMount } from 'svelte';
  import Course from './Course.svelte';
  onMount(() => {
    process();
  });
  async function process() {
    let sentences;
    await fetch('processedcatalog.txt')
      .then((res) => res.text())
      .then((text) => {
        sentences = text.split('\n');
        for (let i = 0; i < sentences.length; i += 7) {
          if (sentences[i] != '') {
            data.push({
              name: sentences[i],
              desc: sentences[i + 1],
              credit: sentences[i + 2],
              term: sentences[i + 3],
              grades: sentences[i + 4],
              prereqs: sentences[i + 5],
              notes: sentences[i + 6]
            });
          }
        }
      });
  }
</script>

<ul
  class="align-center grid list-none justify-center text-black md:grid-cols-[repeat(auto-fill,minmax(480px,1fr))]"
>
  {#each data as course}
    {#if searchQuery == '' || course.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())}
      <Course {...course} />
    {/if}
  {/each}
</ul>
