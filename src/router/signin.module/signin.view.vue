<script setup lang="ts">
import { ErrorCode } from "@/components/translate/error.translate";
import { $tsl } from "@/components/translate/content.translate";
import { TransitionRoot } from "@headlessui/vue";
import { reactive, ref, watch } from "vue";
import router from "..";
import { useSigninStore } from "./signin.store";
import DefaultTopbar from "@/components/nav/default.topbar.vue";
import IconEye from "@/components/icons/IconEye.vue";

const signinStore = useSigninStore();
const errs = reactive({ msg: "", email: "", password: "" });
const emailRef = ref("");
const passwordRec = reactive({ value: "", isPlain: false });

watch(emailRef, () => {
  if (!emailRef.value) errs.email = ErrorCode("Email is required");
  else errs.email = "";
});

watch(passwordRec, () => {
  if (!passwordRec.value) errs.password = ErrorCode("Password is required");
  else errs.password = "";
});

async function submitHandler() {
  try {
    if (errs.email) return;
    if (errs.password) return;
    await signinStore.signinPassword(emailRef.value, passwordRec.value);
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
      <DefaultTopbar></DefaultTopbar>

      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-[480px] min-w-xs md:w-8/12 lg:w-5/12">
          <div class="md:shadow px-8 py-16 md:px-14 md:py-16 rounded-xl">
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
                      <div class="relative">
                        <input
                          v-model="passwordRec.value"
                          :type="passwordRec.isPlain ? 'text' : 'password'"
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
