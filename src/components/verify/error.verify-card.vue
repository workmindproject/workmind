<script lang="ts">
export default { name: "ErrorVerifyCard" };
</script>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import IconInfo from "../icons/IconInfo.vue";
import { $tsl } from "../translate/content.translate";

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
  <div class="grid grid-flow-row gap-10">
    <div class="text-center">
      <h1 class="text-2xl font-bold">
        {{ $tsl("Verify your email") }}
      </h1>
    </div>

    <div
      class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-xl bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <IconInfo></IconInfo>
      <span class="sr-only">{{ $tsl("Info") }}</span>
      <div>
        {{ props.msg }}
      </div>
    </div>

    <button
      type="button"
      class="inline-block px-7 py-3 font-bold text-lg leading-snug uppercase rounded-full shadow-md bg-primary hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-full"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      @click="submitTryAgain"
    >
      {{ $tsl("Try again") }}
    </button>
  </div>
</template>
