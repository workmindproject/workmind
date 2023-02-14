<script lang="ts">
export default { name: "EmailForgotPass" };
</script>
<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { $tsl } from "@/components/translate/content.translate";
import { ErrorCode } from "@/components/translate/error.translate";
import IconForgotPass from "@/components/icons/IconForgotPass.vue";

const props = defineProps<{ email: string }>();

const emit = defineEmits<{
  (event: "update:email", v: string): void;
  (event: "on-submit", v: string): void;
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
          <div class="w-3/12 rounded-full m-auto">
            <IconForgotPass></IconForgotPass>
          </div>
          <h1 class="text-2xl font-bold uppercase text-center">
            {{ $tsl("Forgot your password?") }}
          </h1>
          <div class="text-center">
            <p>
              {{ $tsl("Enter your registered email below") }}
            </p>
            <p>
              {{ $tsl("to receive the password reset instructions.") }}
            </p>
          </div>
        </div>

        <div class="grid grid-flow-row gap-3">
          <!-- Email input -->
          <div>
            <input
              type="email"
              id="email"
              :value="email"
              @input="(e: any) => emit('update:email', e.target.value)"
              class="block w-full p-4 text-content border rounded-xl bg-gray-50 sm:text-md focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
              :class="
                errs.email
                  ? 'border-red-600 dark:border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              "
              :placeholder="$tsl('Enter your email')"
              size="30"
              required
            />
            <span
              v-if="errs.email === 'empty'"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
              >{{ ErrorCode("Email is required") }}</span
            >
          </div>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="inline-block px-7 py-3 font-bold text-lg leading-snug uppercase rounded-full shadow-md bg-primary hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          {{ $tsl("Next") }}
        </button>
      </div>
    </TransitionRoot>

    <div class="text-center pt-10">
      <p>
        {{ $tsl("Already have an account?") }}
        <a
          href="/signin"
          class="text-secondary hover:text-secondary font-semibold"
          >{{ $tsl("Sign In") }}</a
        >
      </p>
    </div>
  </form>
</template>
