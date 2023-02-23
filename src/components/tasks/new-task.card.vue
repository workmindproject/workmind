<script lang="ts">
export default { name: "NewTaskCard" };
</script>
<script setup lang="ts">
import InfinityTextarea from "@/components/input/infinity-textarea.vue";
import IconClear from "@/components/icons/IconClear.vue";
import { $tsl } from "@/components/translate/content.translate";
import { ref } from "vue";

const props = defineProps<{ id: string }>();
const title = ref<string>("");
const id = ref<string>(props.id);

const emits = defineEmits<{
  (event: "on-keyupenter", payload: { id: string; title: string }): void;
  (event: "on-focusout", payload: { id: string; title: string }): void;
  (event: "on-clear"): void;
}>();

function clearHandler() {
  title.value = "";
  emits("on-clear");
}

function onKeyupEnterHandler() {
  emits("on-keyupenter", { id: id.value, title: title.value });
}

function onFocusoutHandler() {
  emits("on-focusout", { id: id.value, title: title.value });
}

function reset() {
  title.value = "";
  id.value = "";
}

defineExpose({
  reset,
});
</script>

<template>
  <div class="grid grid-flow-row gap-3">
    <div class="grid grid-flow-col gap-3 items-center justify-start">
      <div class="self-start">
        <input
          :id="`newtask-cb-${id}`"
          aria-describedby="helper-checkbox-text"
          type="checkbox"
          disabled
          class="w-6 h-6 text-success bg-gray-100 border-dashed border-2 border-secondary focus:border-dashed rounded-full focus:ring-transparent dark:focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
        />
      </div>

      <div class="grid grid-flow-row gap-3">
        <div class="relative w-full">
          <InfinityTextarea
            :id="`newtask-title-${id}`"
            v-model="title"
            class="resize-none block p-0 w-96 text-medium text-gray-900 rounded-lg bg-transparent border-transparent focus:ring-transparent focus:border-transparent dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
            :placeholder="$tsl('Enter a new todo')"
            rows="1"
            @keyup.enter="onKeyupEnterHandler"
            @focusout="onFocusoutHandler"
          ></InfinityTextarea>
          <button
            type="button"
            class="absolute right-0 bottom-0 ml-3 transition delay-150 hover:scale-150 duration-300 empty:translate-x-2 empty:opacity-0"
            @click="clearHandler"
          >
            <IconClear
              v-if="title"
              class="w-5 text-content dark:text-gray-400"
            ></IconClear>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
