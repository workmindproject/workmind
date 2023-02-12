<script setup lang="ts">
import { ErrorCode } from "@/components/translate/error.translate";
import { $tsl } from "@/components/translate/content.translate";
import IconLogo from "@/components/icons/IconLogo.vue";
import { TransitionRoot } from "@headlessui/vue";
import { reactive, ref, watch } from "vue";
import router from "..";
import { useSigninStore } from "./signin.store";

const signinStore = useSigninStore();
const errs = reactive({ msg: "", email: "", password: "" });
const emailRef = ref("");
const passwordRef = ref("");

watch(emailRef, () => {
  if (!emailRef.value) errs.email = ErrorCode("Email is required");
  else errs.email = "";
});

watch(passwordRef, () => {
  if (!passwordRef.value) errs.password = ErrorCode("Password is required");
  else errs.password = "";
});

async function submitHandler() {
  try {
    if (errs.email) return;
    if (errs.password) return;
    await signinStore.signinPassword(emailRef.value, passwordRef.value);
    router.push("/");
  } catch (e: any) {
    console.error(e);
    errs.msg = ErrorCode(e.code) || e.code;
  }
}
</script>

<template>
  <div class="h-screen m-auto text-content">
    <div class="grid grid-flow-row md:gap-20">
      <nav
        class="h-fit bg-white dark:bg-gray-900 px-2 sm:px-4 py-2.5 shadow rounded"
      >
        <div
          class="container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"
        >
          <a href="/" class="flex items-center">
            <IconLogo></IconLogo>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden text-content hover:bg-primary dark:hover:bg-primary dark:focus:bg-primary dark:text-gray-400"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">{{ $tsl("Open main menu") }} </span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul
              class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              <li>
                <a
                  href="https://workmind.app/features"
                  class="block py-2 pl-3 pr-4 font-bold text-content bg-primary hover:bg-primary rounded md:bg-transparent md:hover:bg-transparent md:hover:text-secondary md:p-0 dark:text-white"
                  aria-current="page"
                  >{{ $tsl("Features") }}</a
                >
              </li>
              <li>
                <a
                  href="https://workmind.app/pricing"
                  class="block py-2 pl-3 pr-4 font-bold text-content hover:bg-primary rounded md:bg-transparent md:hover:bg-transparent md:hover:text-secondary md:p-0 dark:text-white"
                  >{{ $tsl("Pricing") }}</a
                >
              </li>
              <li>
                <a
                  href="https://workmind.app/contact"
                  class="block py-2 pl-3 pr-4 font-bold text-content hover:bg-primary rounded md:bg-transparent md:hover:bg-transparent md:hover:text-secondary md:p-0 dark:text-white"
                  >{{ $tsl("Contact") }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-screen-lg md:w-8/12 lg:w-5/12">
          <div class="shadow px-14 py-16 rounded-xl">
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
                      <h1 class="text-content text-4xl font-bold">
                        {{ $tsl("Welcome") }}
                      </h1>
                    </div>

                    <p class="text-content">
                      {{ $tsl("Enter your email and password to sign in.") }}
                    </p>
                  </div>

                  <div class="grid grid-flow-row gap-3">
                    <!-- Email input -->
                    <div>
                      <input
                        type="email"
                        id="email"
                        v-model="emailRef"
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
                        v-if="errs.email"
                        class="mt-2 text-sm text-red-600 dark:text-red-500"
                        >{{ errs.email }}</span
                      >
                    </div>

                    <!-- Password input -->
                    <div>
                      <input
                        v-model="passwordRef"
                        type="password"
                        class="block w-full p-4 text-content border rounded-xl bg-gray-50 sm:text-md focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                        :class="
                          errs.password
                            ? 'border-red-600 dark:border-red-500'
                            : 'border-gray-300 dark:border-gray-600'
                        "
                        :placeholder="$tsl('Enter your password')"
                        minLength="{6}"
                      />
                      <span
                        v-if="errs.password"
                        class="mt-2 text-sm text-red-600 dark:text-red-500"
                        >{{ errs.password }}</span
                      >
                    </div>

                    <!-- Forgot password link -->
                    <div class="flex justify-end items-center">
                      <a
                        href="/forgot-password"
                        class="text-secondary hover:text-primary focus:text-primary duration-200 transition ease-in-out"
                      >
                        {{ $tsl("Forgot password?") }}
                      </a>
                    </div>
                  </div>

                  <div>
                    <span
                      v-if="errs.msg"
                      class="mt-2 text-sm text-red-600 dark:text-red-500"
                      >{{ errs.msg }}</span
                    >

                    <!-- Submit button -->
                    <button
                      type="submit"
                      class="inline-block px-7 py-3 font-bold text-lg leading-snug uppercase rounded-full shadow-md bg-primary hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-full"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      {{ $tsl("Sign In") }}
                    </button>
                  </div>
                </div>
              </TransitionRoot>
            </form>

            <div class="text-center pt-10">
              <p>
                {{ $tsl("You don't have any account?") }}
                <a
                  href="/signup"
                  class="text-secondary hover:text-primary focus:text-primary duration-200 transition ease-in-out"
                  >{{ $tsl("Sign Up") }}</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
