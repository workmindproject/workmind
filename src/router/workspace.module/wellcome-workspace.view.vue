<script setup lang="ts">
import IconStart from "@/components/icons/IconStart.vue";
import Loading from "@/components/loading/loading.vue";
import HomeTopbar from "@/components/nav/home.topbar.vue";
import TasksTopbar from "@/components/tasks/tasks.topbar.vue";
import { $tsl } from "@/components/translate/content.translate";
import FirstWsCard from "@/components/workspace/first.ws-card.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWorkspaceStore } from "./workspace.store";

const router = useRouter();
const workspaceStore = useWorkspaceStore();
const workspace = ref({ name: "" });
const component = ref("");

async function createWorkspace() {
  try {
    component.value = Loading.name;
    const newWs = await workspaceStore.create(workspace.value);
    router.push(`/${newWs.key}`);
  } catch (e: any) {
    console.error(e);
    // errs.msg = ErrorCode(e.code) || e.code;
    // component.value = ErrorSignupForm.name;
  }
}

async function checkFirstWorkspace() {
  try {
    component.value = Loading.name;
    const rs = await workspaceStore.find([]);
    const firstWs = rs.length === 0 ? null : rs[0];
    if (!firstWs) component.value = FirstWsCard.name;
    else router.push(`/${firstWs.key}`);
  } catch (e: any) {
    console.error(e);
    // errs.msg = ErrorCode(e.code) || e.code;
    // component.value = ErrorSignupForm.name;
  }
}

checkFirstWorkspace();
</script>

<template>
  <div class="h-screen m-auto text-content">
    <div class="grid grid-flow-row md:gap-20">
      <HomeTopbar></HomeTopbar>
      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-[480px] min-w-xs md:w-8/12 lg:w-5/12">
          <div class="md:shadow px-8 py-16 md:px-14 md:py-16 rounded-xl">
            <div class="grid grid-flow-row gap-5">
              <Loading
                v-if="component === Loading.name"
                :msg="$tsl('Waiting a seconds ...')"
              ></Loading>

              <FirstWsCard
                v-if="component === FirstWsCard.name"
                v-model:name="workspace.name"
                @on-submit="() => createWorkspace()"
              ></FirstWsCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
