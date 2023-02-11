<script lang="ts">
export default { name: "ErrorVerifyCard" };
</script>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";

const props = defineProps<{
  msg?: string;
}>();

const emit = defineEmits<{
  (event: "on-try-again"): void;
}>();

function submitTryAgain() {
  emit("on-try-again");
}
</script>

<template>
  <!-- <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div> -->
  <div class="grid grid-flow-row gap-5">
    <div
      class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-xl bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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

    <button
      type="submit"
      class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      @click="submitTryAgain"
    >
      Try again
    </button>
  </div>
</template>
