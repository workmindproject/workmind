<script lang="ts">
export default { name: "SuccessForgotPass" };
</script>

<script setup lang="ts">
import IconSuccess from "@/components/icons/IconSuccess.vue";
import { $tsl } from "@/components/translate/content.translate";
const props = defineProps();

const emits = defineEmits<{
  (event: "on-signin"): void;
}>();
</script>

<template>
  <div
    class="grid grid-flow-row gap-10 text-content dark:text-white justify-center"
  >
    <div class="grid grid-flow-row gap-3">
      <div class="w-3/12 rounded-full m-auto">
        <IconSuccess></IconSuccess>
      </div>
      <h1 class="text-2xl font-bold uppercase text-center">
        {{ $tsl("Successful") }}
      </h1>
    </div>

    <div class="text-center">
      <p class="">
        {{ $tsl("Your new password has been set. You can now sign in using the new password.") }}
      </p>

      <p class="">
        {{ $tsl("You can now sign in") }}
        <a href="/" class="text-secondary hover:text-primary">workmind.app</a>
      </p>
    </div>

    <button
      @click="() => emits('on-signin')"
      type="button"
      class="inline-block px-7 py-3 font-bold text-lg leading-snug uppercase rounded-full shadow-md bg-primary hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-full"
    >
      {{ $tsl("Sign In") }}
    </button>
  </div>
</template>
