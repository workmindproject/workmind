<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SuccessVerifyCard from "@/components/verify/success.verify-card.vue";
import ErrorVerifyCard from "@/components/verify/error.verify-card.vue";
import Loading from "@/components/loading/loading.vue";
import { useVerifyStore } from "./verify.store";
import { ErrorCode } from "@/components/error-code/errors";

const router = useRouter();
const route = useRoute();
const verifyStore = useVerifyStore();

const mode: string = String(route.query.mode) || "";
const actionCode: string = String(route.query.oobCode) || "";
const continueUrl: string = String(route.query.continueUrl) || "";
const lang: string = String(route.query.lang) || "en";

const component = ref();
const errs = reactive({ msg: "" });

async function verifyHandler() {
  try {
    component.value = Loading.name;
    await verifyStore.verifyLink(actionCode);
    component.value = SuccessVerifyCard.name;
  } catch (e: any) {
    console.error(e);
    errs.msg = ErrorCode(e.code) || e.code;
    component.value = ErrorVerifyCard.name;
  }
}
component.value = Loading.name;

setTimeout(() => {
  verifyHandler();
}, 3000);
</script>

<template>
  <div class="container h-screen max-w-screen-xl m-auto">
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <div
          tabindex="-1"
          aria-hidden="true"
          class="justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <Loading v-if="component === Loading.name"></Loading>

            <SuccessVerifyCard
              v-if="component === SuccessVerifyCard.name"
              @on-signin="
                () => router.push({ path: '/signin', query: { lang } })
              "
            ></SuccessVerifyCard>

            <ErrorVerifyCard
              v-if="component === ErrorVerifyCard.name"
              :msg="errs.msg"
              @on-try-again="() => router.push('/signup')"
            ></ErrorVerifyCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
