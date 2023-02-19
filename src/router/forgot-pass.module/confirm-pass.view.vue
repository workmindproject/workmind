<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "@/components/loading/loading.vue";
import { ErrorCode } from "@/components/translate/error.translate";
import HomeTopbar from "@/components/nav/home.topbar.vue";
import { $tsl } from "@/components/translate/content.translate";
import { useForgotPassStore } from "./forgot-pass.store";
import PasswordForgotPass from "@/components/forgot-pass/password.forgot-pass.vue";
import ErrorForgotPass from "@/components/forgot-pass/error.forgot-pass.vue";
import SuccessForgotPass from "@/components/forgot-pass/success.forgot-pass.vue";

const router = useRouter();
const route = useRoute();
const forgotPassStore = useForgotPassStore();

enum STATE {
  "root" = "/confirm-password",
  "password" = "/confirm-password?step=password",
  "reset-password" = "/confirm-password?step=reset-password",
}

const data = ref({ password: "" });
const state = ref("");
const mode: string = String(route.query.mode) || "";
const actionCode: string = String(route.query.oobCode) || "";
const continueUrl: string = String(route.query.continueUrl) || "";
const lang: string = String(route.query.lang) || "en";

const component = ref();
const errs = reactive({ msg: "" });

watch(route, (newValue, oldValue) => {
  state.value = route.query.step
    ? `/confirm-password?step=${route.query.step}`
    : STATE["root"];
});

watch(route, (newValue, oldValue) => {
  state.value = route.query.step
    ? `/confirm-password?step=${route.query.step}`
    : STATE["root"];
});

watch(state, (newValue, oldValue) => {
  if (state.value === STATE["root"] || state.value === STATE["password"]) {
    component.value = PasswordForgotPass.name;
    router.push(STATE["password"]);
  } else if (!data.value.password) {
    errs.msg = "Missing password";
    component.value = Error.name;
  } else if (state.value === STATE["reset-password"]) {
    confirmPassword();
  }
});

async function confirmPassword() {
  try {
    component.value = Loading.name;
    await forgotPassStore.confirmPassword(actionCode, data.value.password);
    component.value = SuccessForgotPass.name;
  } catch (e: any) {
    console.error(e);
    errs.msg = ErrorCode(e.code) || e.code;
    component.value = ErrorForgotPass.name;
  }
}

component.value = PasswordForgotPass.name;
</script>

<template>
  <div class="h-screen m-auto text-content">
    <div class="grid grid-flow-row md:gap-20">
      <HomeTopbar></HomeTopbar>

      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-[480px] min-w-xs md:w-8/12 lg:w-5/12">
          <div class="md:shadow px-8 py-16 md:px-14 md:py-16 rounded-xl">
            <div class="grid grid-flow-row gap-10">
              <Loading v-if="component === Loading.name"></Loading>

              <ErrorForgotPass
                v-if="component === ErrorForgotPass.name"
                :msg="errs.msg"
                @on-try-again="() => (state = STATE['root'])"
              ></ErrorForgotPass>

              <PasswordForgotPass
                v-if="component === PasswordForgotPass.name"
                v-model:password="data.password"
                @on-submit="() => (state = STATE['reset-password'])"
              ></PasswordForgotPass>

              <SuccessForgotPass
                v-if="component === SuccessForgotPass.name"
                @on-signin="
                  () => router.push({ path: '/signin', query: { lang } })
                "
              ></SuccessForgotPass>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
