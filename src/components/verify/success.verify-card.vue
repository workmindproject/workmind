<script lang="ts">
export default { name: "SuccessVerifyCard" };
</script>
<script setup lang="ts">
const props = defineProps();

const emits = defineEmits<{
  (event: "on-signin"): void;
}>();
</script>

<template>
  <div
    class="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
  >
    <div class="grid grid-flow-row gap-5">
      <div
        class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5"
      >
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-green-500 dark:text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Success</span>
      </div>

      <p
        class="mb-4 text-lg uppercase font-semibold text-gray-900 dark:text-white"
      >
        Verification complete
      </p>
      <div>
        <p class="mb-4 font-semibold text-gray-800 dark:text-white">
          Congratulation! Your mail has been verified.
        </p>

        <p class="mb-4 font-semibold text-gray-800 dark:text-white">
          Your next step is to login
        </p>
      </div>
      <button
        @click="() => emits('on-signin')"
        data-modal-toggle="successModal"
        type="button"
        class="w-full py-2 px-3 uppercase font-medium text-center text-white rounded-lg btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
      >
        Login
      </button>
    </div>
  </div>
</template>
