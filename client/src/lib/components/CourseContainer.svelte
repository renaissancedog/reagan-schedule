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
        for (let i = 0; i < sentences.length; i += 8) {
          if (sentences[i] != '') {
            data.push({
              name: sentences[i],
              desc: sentences[i + 1],
              num: sentences[i + 2],
              credit: sentences[i + 3],
              term: sentences[i + 4],
              grades: sentences[i + 5],
              prereqs: sentences[i + 6],
              notes: sentences[i + 7]
            });
          }
        }
      });
  }
</script>

<ul
  class="align-center grid list-none justify-center text-black md:grid-cols-[repeat(auto-fill,_minmax(480px,_1fr))]"
>
  {#each data as course}
    {#if searchQuery == '' || course.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())}
      <Course {...course} />
    {/if}
  {/each}
</ul>
