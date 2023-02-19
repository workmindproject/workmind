<script lang="ts">
export default { name: "HomeTopbar" };
</script>
<script setup lang="ts">
import { $tsl } from "@/components/translate/content.translate";
import IconLogo from "../icons/IconLogo.vue";
</script>
<template>
  <nav
    class="h-fit bg-white dark:bg-gray-900 px-2 sm:px-4 py-2.5 shadow rounded"
  >
    <div
      class="container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"
    >
      <a href="/" class="flex items-center">
        <IconLogo></IconLogo>
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden text-content hover:bg-primary dark:hover:bg-primary dark:focus:bg-primary dark:text-gray-400"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">{{ $tsl("Open main menu") }} </span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="https://workmind.app/features"
              class="block py-2 pl-3 pr-4 font-bold text-content bg-primary hover:bg-primary rounded md:bg-transparent md:hover:bg-transparent md:hover:text-secondary md:p-0 dark:text-white"
              aria-current="page"
              >{{ $tsl("Features") }}</a
            >
          </li>
          <li>
            <a
              href="https://workmind.app/pricing"
              class="block py-2 pl-3 pr-4 font-bold text-content hover:bg-primary rounded md:bg-transparent md:hover:bg-transparent md:hover:text-secondary md:p-0 dark:text-white"
              >{{ $tsl("Pricing") }}</a
            >
          </li>
          <li>
            <a
              href="https://workmind.app/contact"
              class="block py-2 pl-3 pr-4 font-bold text-content hover:bg-primary rounded md:bg-transparent md:hover:bg-transparent md:hover:text-secondary md:p-0 dark:text-white"
              >{{ $tsl("Contact") }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
