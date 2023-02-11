<script lang="ts">
export default { name: "ErrorSignupForm" };
</script>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { TransitionRoot } from "@headlessui/vue";

const props = defineProps<{
  msg?: string;
}>();

const emit = defineEmits<{
  (event: "on-try-again"): void;
  (event: "on-signup-google"): void;
}>();

function submitTryAgain() {
  emit("on-try-again");
}
function submitGoogleHandler() {
  emit("on-signup-google");
}
</script>

<template>
  <TransitionRoot
    appear
    show
    enter="transform transition duration-[400ms] ease-in-out"
    enter-from="translate-x-1/4 opacity-0"
    enter-to="translate-x-0 opacity-100"
    leave="transform duration-200 transition ease-in-out"
    leave-from="translate-x-1/4 opacity-100"
    leave-to="translate-x-full opacity-0"
  >
    <div class="grid grid-flow-row gap-10">
      <div
        class="flex p-4 text-sm text-red-800 border border-red-300 rounded-xl bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <svg
          aria-hidden="true"
          class="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Info</span>
        <div>
          {{ props.msg }}
        </div>
      </div>

      <div class="grid grid-flow-row gap-3">
        <button
          type="submit"
          class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          @click="submitTryAgain"
        >
          Try again
        </button>

        <div
          class="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
        >
          <p class="text-center font-semibold mx-4 mb-0">OR</p>
        </div>

        <a
          class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
          style="background-color: #3b5998"
          role="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          @click="submitGoogleHandler"
        >
          <!-- Gmail -->
          <IconGmail></IconGmail>
          Signup with Gmail
        </a>
      </div>
    </div>
  </TransitionRoot>
</template>
