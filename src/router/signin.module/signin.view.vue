<script setup lang="ts">
import { ErrorCode } from "@/components/error-code/errors";
import { TransitionRoot } from "@headlessui/vue";
import { reactive, ref, watch } from "vue";
import router from "..";
import { useSigninStore } from "./signin.store";
import { useAuthStore } from "@/stores/auth.store";

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
  <div class="container h-screen max-w-screen-xl m-auto">
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <div class="md:w-8/12 lg:w-5/12">
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
                    <h1 class="text-5xl font-bold">Welcome</h1>
                  </div>

                  <p class="text-gray-800">
                    Enter your email and password to sign in.
                  </p>
                </div>

                <div class="grid grid-flow-row gap-3">
                  <!-- Email input -->
                  <div>
                    <input
                      type="email"
                      id="email"
                      v-model="emailRef"
                      class="block w-full p-4 text-gray-900 border border-gray-300 rounded-xl bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your email"
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
                      class="block w-full p-4 text-gray-900 border border-gray-300 rounded-xl bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Password"
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
                      href="#!"
                      class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                    >
                      Forgot password?
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
                    class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Signin
                  </button>
                </div>
              </div>
            </TransitionRoot>
          </form>

          <div class="text-center pt-10">
            <p>
              You don't have any account?
              <a href="/signup" class="text-blue-500 font-semibold">Signup</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
