<script setup lang="ts">
import EmailSignupForm from "@/components/signup/email.signup-form.vue";
import ErrorSignupForm from "@/components/signup/error.signup-form.vue";
import PasswordSignupForm from "@/components/signup/password.signup-form.vue";
import VerifySignupForm from "@/components/signup/verify.signup-form.vue";
import Loading from "@/components/loading/loading.vue";
import { ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSignupStore } from "./signup.store";
import { ErrorCode } from "@/components/error-code/errors";

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
    component.value = EmailSignupForm.__hmrId;
    router.push(STATE["signup"]);
  } else if (!data.value.email) {
    errs.msg = "Missing email address";
    component.value = ErrorSignupForm.__hmrId;
  } else if (state.value === STATE["password"]) {
    component.value = PasswordSignupForm.__hmrId;
    router.push(STATE["password"]);
  } else if (state.value === STATE["verify"]) {
    createUser();
  }
});

async function createUser() {
  try {
    component.value = Loading.__hmrId;
    await signupStore.createUser(data.value.email, data.value.password);
    component.value = VerifySignupForm.__hmrId;
    router.push(STATE["verify"]);
  } catch (e: any) {
    console.error(e);
    errs.msg = ErrorCode(e.code) || e.code;
    component.value = ErrorSignupForm.__hmrId;
  }
}

component.value = EmailSignupForm.__hmrId;
state.value = route.query.step
  ? `/signup?step=${route.query.step}`
  : STATE["signup"];
</script>

<template>
  <div class="container h-screen max-w-screen-xl m-auto">
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <!-- <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="w-full"
          alt="Phone image"
        />
      </div> -->

      <div class="md:w-8/12 lg:w-5/12">
        <div class="shadow px-14 py-16 rounded-xl">
          <div class="grid grid-flow-row gap-5">
            <Loading v-if="component === Loading.__hmrId"></Loading>

            <ErrorSignupForm
              v-if="component === ErrorSignupForm.__hmrId"
              :msg="errs.msg"
              @on-try-again="() => (state = STATE['signup'])"
              @on-signup-google="
                () => {
                  // router.push(SIGNUP_STATE['api']);
                }
              "
            ></ErrorSignupForm>

            <VerifySignupForm
              v-if="component === VerifySignupForm.__hmrId"
              @on-signin="() => router.push('/signin')"
            ></VerifySignupForm>

            <EmailSignupForm
              v-if="component === EmailSignupForm.__hmrId"
              v-model:email="data.email"
              @on-submit="() => (state = STATE['password'])"
              @on-signup-google="
                () => {
                  // router.push(SIGNUP_STATE['api']);
                }
              "
            ></EmailSignupForm>

            <PasswordSignupForm
              v-if="component === PasswordSignupForm.__hmrId"
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
</template>
