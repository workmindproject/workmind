<script lang="ts">
export default { name: "ErrorForgotPass" };
</script>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { $tsl } from "@/components/translate/content.translate";
import IconInfo from "../icons/IconInfo.vue";
import IconAlert from "../icons/IconAlert.vue";

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
      <div class="text-center">
        <h1 class="text-2xl font-bold">
          {{ $tsl("Reset password") }}
        </h1>
      </div>

      <div
        class="flex p-4 text-sm text-red-800 border border-red-300 rounded-xl bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <IconInfo></IconInfo>
        <span class="sr-only">{{ $tsl("Info") }}</span>
        <div>
          {{ props.msg }}
        </div>
      </div>

      <div class="grid grid-flow-row gap-3">
        <button
          type="submit"
          class="inline-block w-full px-7 py-3 bg-primary text-context font-bold text-lg leading-snug uppercase rounded-full shadow hover:bg-secondary focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          @click="submitTryAgain"
        >
          {{ $tsl("Try again") }}
        </button>

        <!-- <div
          class="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
        >
          <p class="text-center font-semibold mx-4 mb-0">
            {{ $tsl("OR Sign up with") }}
          </p>
        </div>

        <div class="flex justify-center items-center">
          <a
            class="w-fit px-7 py-3 text-lg text-secondary hover:text-primary rounded-full shadow border border-secondary hover:border-primary focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            @click="submitGoogleHandler"
          >
            <div class="flex justify-center items-center gap-3">
              <IconGmail></IconGmail>
              <p class="text-sm">{{ $tsl("Google") }}</p>
            </div>
          </a>
        </div> -->
      </div>
    </div>
  </TransitionRoot>
</template>
