<script setup lang="ts">
import Loading from "@/components/loading/loading.vue";
import { ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForgotPassStore } from "./forgot-pass.store";
import { ErrorCode } from "@/components/translate/error.translate";
import { $tsl } from "@/components/translate/content.translate";
import DefaultTopbar from "@/components/nav/default.topbar.vue";
import EmailForgotPass from "@/components/forgot-pass/email.forgot-pass.vue";
import SendingForgotPass from "@/components/forgot-pass/sending.forgot-pass.vue";
import ErrorForgotPass from "@/components/forgot-pass/error.forgot-pass.vue";

const router = useRouter();
const route = useRoute();
const forgotPassStore = useForgotPassStore();

enum STATE {
  "forgot-password" = "/forgot-password",
  "email" = "/forgot-password?step=email",
  "sending" = "/forgot-password?step=sending",
}

const component = ref();
const state = ref("");
const data = ref({ email: "" });
const errs = reactive({ email: "", msg: "" });

watch(route, (newValue, oldValue) => {
  state.value = route.query.step
    ? `/forgot-password?step=${route.query.step}`
    : STATE["forgot-password"];
});

watch(state, (newValue, oldValue) => {
  if (
    state.value === STATE["forgot-password"] ||
    state.value === STATE["email"]
  ) {
    component.value = EmailForgotPass.name;
    router.push(STATE["forgot-password"]);
  } else if (!data.value.email) {
    errs.msg = "Missing email address";
    component.value = ErrorForgotPass.name;
  } else if (state.value === STATE["sending"]) {
    forgotPassword()
  }
});

async function forgotPassword() {
  try {
    component.value = Loading.name;
    await forgotPassStore.forgotPassword(data.value.email);
    component.value = SendingForgotPass.name;
    router.push(STATE["sending"]);
  } catch (e: any) {
    console.error(e);
    errs.msg = ErrorCode(e.code) || e.code;
    component.value = ErrorForgotPass.name;
  }
}

component.value = EmailForgotPass.name;
state.value = route.query.step
  ? `/forgot-password?step=${route.query.step}`
  : STATE["forgot-password"];
</script>

<template>
  <div class="h-screen m-auto text-content">
    <div class="grid grid-flow-row md:gap-20">
      <DefaultTopbar></DefaultTopbar>

      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-[480px] min-w-xs md:w-8/12 lg:w-5/12">
          <div class="md:shadow px-8 py-16 md:px-14 md:py-16 rounded-xl">
            <div class="grid grid-flow-row gap-5">
              <Loading
                v-if="component === Loading.name"
                :msg="$tsl('Waiting a seconds ...')"
              ></Loading>

              <ErrorForgotPass
                v-if="component === ErrorForgotPass.name"
                :msg="errs.msg"
                @on-try-again="() => (state = STATE['forgot-password'])"
              ></ErrorForgotPass>

              <SendingForgotPass
                :email="data.email"
                v-if="component === SendingForgotPass.name"
                @on-signin="() => router.push('/signin')"
              ></SendingForgotPass>

              <EmailForgotPass
                v-if="component === EmailForgotPass.name"
                v-model:email="data.email"
                @on-submit="() => (state = STATE['sending'])"
              ></EmailForgotPass>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
