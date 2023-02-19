<script setup lang="ts">
import HomeTopbar from "@/components/nav/home.topbar.vue";
import { $tsl } from "@/components/translate/content.translate";
</script>

<template>
  <div class="h-screen m-auto text-content">
    <div class="grid grid-flow-row md:gap-20">
      <HomeTopbar></HomeTopbar>

      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-[480px] min-w-xs md:w-8/12 lg:w-5/12">
          <div class="md:shadow px-8 py-16 md:px-14 md:py-16 rounded-xl">
            <div class="grid grid-flow-row gap-10">
              <h1>Comming soon page</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
