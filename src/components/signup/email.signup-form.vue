<script lang="ts">
export default { name: "EmailSignupForm" };
</script>
<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { TransitionRoot } from "@headlessui/vue";

const props = defineProps<{ email: string }>();

const emit = defineEmits<{
  (event: "update:email", v: string): void;
  (event: "on-submit", v: string): void;
  (event: "on-signup-google", v: string): void;
}>();

const errs = reactive({ email: "" });

watch(props, async (newValue, oldValue) => {
  if (!props.email) errs.email = "empty";
  else errs.email = "";
});

function submitHandler() {
  if (errs.email) return;
  emit("on-submit", props.email || "");
}

function submitGoogleHandler() {
  emit("on-signup-google", props.email || "");
}
</script>

<template>
  <form @submit.prevent="submitHandler">
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
          <div>
            <h1 class="text-5xl font-bold">Looks like</h1>
            <h1 class="text-5xl font-bold">you are new!</h1>
          </div>

          <p class="text-gray-800">
            Please enter your email address and password to sign up.
          </p>
        </div>

        <div class="grid grid-flow-row gap-3">
          <!-- Email input -->
          <div>
            <input
              type="email"
              id="email"
              :value="email"
              @input="(e: any) => emit('update:email', e.target.value)"
              class="block w-full p-4 text-gray-900 border border-gray-300 rounded-xl bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              size="30"
              required
            />
            <span
              v-if="errs.email === 'empty'"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
              >Email is required</span
            >
          </div>

          <!-- <div
          class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
        >
          <p class="text-center font-semibold mx-4 mb-0">OR</p>
        </div>

        <a
          class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
          style="background-color: #3b5998"
          href="#!"
          role="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          @click="submitGoogleHandler"
        >
          <IconGmail></IconGmail>
          Signup with Gmail
        </a> -->
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Next
        </button>
      </div>
    </TransitionRoot>

    <div class="text-center pt-10">
      <p>
        Already have an account?
        <a href="/signin" class="text-blue-500 font-semibold">Signin</a>
      </p>
    </div>
  </form>
</template>
