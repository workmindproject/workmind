<script setup lang="ts">
import IconStart from "@/components/icons/IconStart.vue";
import InfinityTextarea from "@/components/input/infinity-textarea.vue";
import Loading from "@/components/loading/loading.vue";
import NewTaskCard from "@/components/tasks/new-task.card.vue";
import TaskCard from "@/components/tasks/task.card.vue";
import TasksTopbar from "@/components/tasks/tasks.topbar.vue";
import { usePageStore } from "@/stores/page.store";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTasksStore, type TaskDto } from "./task.store";

const route = useRoute();
const router = useRouter();
const taskStore = useTasksStore();
const pageStore = usePageStore();
const parentPath = route.path.split("/today")[0];
const tasks = taskStore.tasks;
const newTaskId = ref("");
const loadingRef = ref({ newTask: false });
const newTaskRef = ref();

function onViewTopbarHandler(view: string) {
  console.log("onViewHandler", view);
}

function initNewTask() {
  newTaskId.value = taskStore.initId();
}

async function createNewTask(task: { id: string; title: string }) {
  try {
    if (!task.title || !task.id) return;
    loadingRef.value.newTask = true;
    await taskStore.create({
      id: task.id,
      title: task.title,
      workspace: pageStore.workspace.key,
    });
    loadingRef.value.newTask = false;
    newTaskRef.value.reset();
  } catch (e: any) {
    console.error(e);
    loadingRef.value.newTask = false;
    // errs.msg = ErrorCode(e.code) || e.code;
    // component.value = ErrorSignupForm.name;
  }
}

taskStore.find([], undefined, undefined, 10);
initNewTask();
</script>

<template>
  <div class="h-screen m-auto text-content">
    <div class="grid grid-flow-row md:gap-20">
      <TasksTopbar
        view="Today Tasks"
        @on-view="onViewTopbarHandler"
      ></TasksTopbar>

      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-[480px] min-w-xs md:w-8/12 lg:w-5/12">
          <div class="">
            <div class="grid grid-flow-row gap-5">
              <div class="flex items-center justify-between mb-4">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Today Tasks
                </h5>
                <a
                  href="#"
                  class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  View {{ tasks.length }} completed
                </a>
              </div>
              <div>
                <ul role="list" class="grid grid-flow-row gap-3m-auto divide-y mb-64">
                  <li
                    v-for="t in tasks"
                    :key="t.id"
                    class="max-w-lg p-3 rounded-lg bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700"
                  >
                    <TaskCard
                      v-model:title="t.title"
                      v-model:workspace="t.workspace"
                    ></TaskCard>
                  </li>
                  <li
                    :key="newTaskId"
                    class="max-w-lg p-3 rounded-lg bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700"
                  >
                    <Loading :active="loadingRef?.newTask" size="sm"></Loading>
                    <NewTaskCard
                      v-if="!loadingRef?.newTask"
                      :id="newTaskId"
                      ref="newTaskRef"
                      @on-keyupenter="createNewTask"
                    ></NewTaskCard>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
