<script lang="ts">
export default { name: "ToolTopbar" };
</script>

<script setup lang="ts">
</script>

<template>
  <nav
    class="h-fit px-2 sm:px-4 py-2.5 "
  >
    <div
      class="container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"
    >
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
    </div>
  </nav>
</template>
