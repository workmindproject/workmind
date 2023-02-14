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
import DefaultTopbar from "@/components/nav/default.topbar.vue";

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
      <DefaultTopbar></DefaultTopbar>
      
      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-[480px] min-w-xs md:w-8/12 lg:w-5/12">
          <div class="md:shadow px-8 py-16 md:px-14 md:py-16 rounded-xl">
            <div class="grid grid-flow-row gap-5">
              <Loading v-if="component === Loading.name" :msg="$tsl('Waiting a seconds ...')"></Loading>

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
