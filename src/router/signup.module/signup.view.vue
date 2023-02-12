<script setup lang="ts">
import EmailSignupForm from "@/components/signup/email.signup-form.vue";
import ErrorSignupForm from "@/components/signup/error.signup-form.vue";
import PasswordSignupForm from "@/components/signup/password.signup-form.vue";
import VerifySignupForm from "@/components/signup/verify.signup-form.vue";
import IconLogo from "@/components/icons/IconLogo.vue";
import Loading from "@/components/loading/loading.vue";
import { ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSignupStore } from "./signup.store";
import { ErrorCode } from "@/components/translate/error.translate";
import { $tsl } from "@/components/translate/content.translate";

const router = useRouter();
const route = useRoute();
const signupStore = useSignupStore();

enum STATE {
  "signup" = "/signup",
  "email" = "/signup?step=email",
  "password" = "/signup?step=password",
  "verify" = "/signup?step=verify",
}

const component = ref();
const state = ref("");
const data = ref({ email: "", password: "" });
const errs = reactive({ email: "", verify: "", msg: "" });

watch(route, (newValue, oldValue) => {
  state.value = route.query.step
    ? `/signup?step=${route.query.step}`
    : STATE["signup"];
});

watch(state, (newValue, oldValue) => {
  if (state.value === STATE["signup"] || state.value === STATE["email"]) {
    component.value = EmailSignupForm.name;
    router.push(STATE["signup"]);
  } else if (!data.value.email) {
    errs.msg = "Missing email address";
    component.value = ErrorSignupForm.name;
  } else if (state.value === STATE["password"]) {
    component.value = PasswordSignupForm.name;
    router.push(STATE["password"]);
  } else if (state.value === STATE["verify"]) {
    createUser();
  }
});

async function createUser() {
  try {
    component.value = Loading.name;
    await signupStore.createUser(data.value.email, data.value.password);
    component.value = VerifySignupForm.name;
    router.push(STATE["verify"]);
  } catch (e: any) {
    console.error(e);
    errs.msg = ErrorCode(e.code) || e.code;
    component.value = ErrorSignupForm.name;
  }
}

component.value = EmailSignupForm.name;
state.value = route.query.step
  ? `/signup?step=${route.query.step}`
  : STATE["signup"];
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
            <div class="grid grid-flow-row gap-5">
              <Loading v-if="component === Loading.name"></Loading>

              <ErrorSignupForm
                v-if="component === ErrorSignupForm.name"
                :msg="errs.msg"
                @on-try-again="() => (state = STATE['signup'])"
                @on-signup-google="
                  () => {
                    // router.push(SIGNUP_STATE['api']);
                  }
                "
              ></ErrorSignupForm>

              <VerifySignupForm
                :email="data.email"
                v-if="component === VerifySignupForm.name"
                @on-signin="() => router.push('/signin')"
              ></VerifySignupForm>

              <EmailSignupForm
                v-if="component === EmailSignupForm.name"
                v-model:email="data.email"
                @on-submit="() => (state = STATE['password'])"
                @on-signup-google="
                  () => {
                    // router.push(SIGNUP_STATE['api']);
                  }
                "
              ></EmailSignupForm>

              <PasswordSignupForm
                v-if="component === PasswordSignupForm.name"
                v-model:email="data.email"
                v-model:password="data.password"
                @on-submit="() => (state = STATE['verify'])"
                @on-edit-email="() => (state = STATE['signup'])"
              ></PasswordSignupForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
