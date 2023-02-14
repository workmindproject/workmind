<script lang="ts">
export default { name: "SendingForgotPass" };
</script>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { $tsl } from "../translate/content.translate";
import IconSendingEmail from "../icons/IconSendingEmail.vue";

const props = defineProps<{
  email: string;
}>();

const emit = defineEmits<{
  (event: "on-signin"): void;
}>();

function submitSignup() {
  emit("on-signin");
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
      <div class="grid grid-flow-row gap-3">
        <div class="w-3/12 rounded-full m-auto">
          <IconSendingEmail></IconSendingEmail>
        </div>
        <h1 class="text-2xl font-bold uppercase text-center">
          {{ $tsl("email sent!") }}
        </h1>
        <div class="text-center">
          <p>
            {{ $tsl("Please check your inbox and click") }}
          </p>
          <p>
            {{ $tsl("the included link to reset your password.") }}
          </p>
        </div>
      </div>

      <div>
        <button
          type="button"
          class="inline-block px-7 py-3 font-bold text-lg leading-snug uppercase rounded-full shadow-md bg-primary hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          @click="submitSignup"
        >
          {{ $tsl("Sign In") }}
        </button>
      </div>

      <div class="text-center opacity-80">
        <p>{{ $tsl("Didn't receive an email?") }}</p>
        <p>
          {{ $tsl("Check your spam folder or") }}
          <a href="mail://">{{ $tsl("contact us") }}</a>
        </p>
      </div>
    </div>
  </TransitionRoot>
</template>
