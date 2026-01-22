<script>
  import CourseContainer from '../../lib/CourseContainer.svelte';
  let searchQuery = $state('');

  function handleInput(event) {
    searchQuery = event.target.value;
  }
</script>

<main class="mx-auto w-full text-center lg:w-1/2">
  <div class="space-y-4 text-sky-600">
    <h1 class="text-5xl">Courses</h1>
    <p class="px-2 text-2xl">
      Please note that all courses were taken from the NEISD Course Catalog as
      of 1/15/2025. Attribute inaccuracies to them. Also note that athletics
      courses are not included. Not all courses may be available at all
      campuses.
    </p>
    <input
      type="search"
      class="w-[min(12.5rem,_100%)] rounded-full border-2 bg-white px-2.5 py-1 text-black"
      placeholder="Search courses"
      oninput={handleInput}
    />
    <CourseContainer {searchQuery} />
  </div>
</main>
