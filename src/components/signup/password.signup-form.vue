<script lang="ts">
export default { name: "PasswordSignupForm", components: { IconEye } };
</script>
<script setup lang="ts">
import { TransitionRoot } from "@headlessui/vue";
import { ref, reactive, watch } from "vue";
import IconEye from "../icons/IconEye.vue";
import { $tsl } from "../translate/content.translate";
import { ErrorCode } from "../translate/error.translate";

const props = defineProps<{
  password?: string;
  email?: string;
}>();

const passwordRec = reactive({ value: "", isPlain: false });
const password2Rec = reactive({ value: "", isPlain: false });

const emit = defineEmits<{
  (event: "update:email", v: string): void;
  (event: "update:password", v: string): void;
  (event: "on-submit", v: { email: string; password: string }): void;
  (event: "on-edit-email"): void;
}>();

const errs = reactive({ email: "", password: "", password2: "" });

watch(props, (newValue, oldValue) => {
  if (!props.email) errs.email = "empty";
  else errs.email = "";
  if (!props.password) errs.password = "empty";
  else errs.password = "";
  if (password2Rec.value && props.password !== password2Rec.value)
    errs.password2 = "diff-password";
  else errs.password2 = "";
});

watch(password2Rec, (newValue, oldValue) => {
  if (!password2Rec.value) errs.password2 = "empty";
  else if (props.password !== password2Rec.value)
    errs.password2 = "diff-password";
  else errs.password2 = "";
});

function submitHandler() {
  if (errs.email) return;
  if (errs.password) return;
  if (errs.password2) return;

  emit("on-submit", {
    email: props.email || "",
    password: props.password || "",
  });
}

function submitEditEmail() {
  emit("on-edit-email");
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
        <!-- Email input -->
        <div class="grid grid-flow-row gap-3">
          <h1 class="text-xl text-center text-bold">
            {{ $tsl("Hi,") }}
          </h1>
          <div class="grid grid-flow-row justify-center">
            <input
              type="text"
              :value="email"
              @focus="() => submitEditEmail()"
              class="block w-64 px-3 py-2 text-content border text-center border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email"
              required
              tabindex="-1"
            />
          </div>
        </div>

        <div class="grid grid-flow-row gap-3">
          <!-- Password input -->
          <div>
            <div class="relative">
              <input
                :type="passwordRec.isPlain ? 'text' : 'password'"
                :value="password"
                @input="(e: any) => emit('update:password', e.target.value)"
                class="block w-full p-4 text-content border rounded-xl bg-gray-50 sm:text-md focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                :class="
                  errs.password
                    ? 'border-red-600 dark:border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                "
                :placeholder="$tsl('Enter your password')"
                minLength="{6}"
                required
                autocomplete="off"
              />
              <button
                type="button"
                class="text-content absolute right-2.5 bottom-2.5 focus:ring-4 font-medium rounded-lg text-sm px-2 py-2"
                @click="passwordRec.isPlain = !passwordRec.isPlain"
              >
                <IconEye
                  class="w-5 text-gray-500 dark:text-gray-400"
                  :open="!passwordRec.isPlain"
                ></IconEye>
              </button>
            </div>
            <span
              v-if="errs.password === 'empty'"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
              >{{ ErrorCode("Password is required") }}</span
            >
          </div>

          <div>
            <div class="relative">
              <input
                :type="password2Rec.isPlain ? 'text' : 'password'"
                v-model="password2Rec.value"
                class="block w-full p-4 text-content border rounded-xl bg-gray-50 sm:text-md focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                :class="
                  errs.password2
                    ? 'border-red-600 dark:border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                "
                :placeholder="$tsl('Confirm password')"
                minLength="{6}"
                required
                autocomplete="off"
              />
              <button
                type="button"
                class="text-content absolute right-2.5 bottom-2.5 focus:ring-4 font-medium rounded-lg text-sm px-2 py-2"
                @click="password2Rec.isPlain = !password2Rec.isPlain"
              >
                <IconEye
                  class="w-5 text-gray-500 dark:text-gray-400"
                  :open="!password2Rec.isPlain"
                ></IconEye>
              </button>
            </div>

            <span
              v-if="errs.password2 === 'empty'"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
              >{{ ErrorCode("Password is required") }}</span
            >
            <span
              v-if="errs.password2 === 'diff-password'"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
              >{{ ErrorCode("Please make sure password match") }}</span
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
  </form>
</template>
