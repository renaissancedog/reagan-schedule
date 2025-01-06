<script>
  let { name, desc, credit, term, grades, prereqs, notes } = $props();
  let shown = $state(false);
  function show() {
    shown = !shown;
  }
</script>

<button class="w-auto cursor-pointer px-3 py-5 text-xl" onclick={show}>
  <p class="text-secondary">{name}</p>
  <p class="text-secondary">{credit} credits</p>
</button>
{#if shown}
  <div></div>
  <!-- This is a placeholder for the expanded course info -->
  <button class="mx-2 text-left text-lg" onclick={show}>
    <p class="text-secondary">{desc}</p>
    <p class="text-secondary">Term: {term}</p>
    <p class="text-secondary">Grades: {grades}</p>
    <p class="text-secondary">Prerequisites: {prereqs}</p>
    <p class="text-secondary">Special Notes: {notes}</p>
  </button>
{/if}
