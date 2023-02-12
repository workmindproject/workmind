<script lang="ts">
export default { name: "VerifySignupForm" };
</script>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { $tsl } from "../translate/content.translate";

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
      <div class="grid grid-flow-row gap-3 text-center">
        <h1 class="text-4xl font-bold">{{ $tsl("Verify your email") }}</h1>
        <div>
          <p>{{ $tsl("We just sent a 6-digit code to") }}</p>
          <a
            :href="`https://mail.google.com/mail/u/${props.email}/#inbox`"
            class="text-secondary hover:text-primary"
            >{{ props.email }}</a
          >
          <p>{{ $tsl("Please enter the verification code below.") }}</p>
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
        <p>{{ $tsl("Didn't receive an email? Check your spam folder") }}</p>
        <p>{{ $tsl("or resend code in") }} 28s.</p>
      </div>
    </div>
  </TransitionRoot>
</template>
