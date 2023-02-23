<script lang="ts">
export default { name: "TaskCard" };
</script>
<script setup lang="ts">
import IconStart from "@/components/icons/IconStart.vue";
import IconClear from "@/components/icons/IconClear.vue";
import InfinityTextarea from "@/components/input/infinity-textarea.vue";

const props = defineProps<{
  title: string;
  note?: string;
  labels?: string[];
  workspace?: string;
  targetAt?: Date;
  createdAt?: Date;
  closedAt?: Date;
}>();

const emits = defineEmits<{
  (event: "update:title", v: string): void;
  (event: "update:note", v: string): void;
  (event: "update:labels", v: string[]): void;
  (event: "update:workspace", v: string): void;
  (event: "update:targetAt", v: string): void;
  (event: "update:closedAt", v: string): void;
}>();

function clearHandler() {
  emits("update:title", "");
  // emits("on-clear");
}
</script>

<template>
  <div class="grid grid-flow-row gap-3">
    <div class="grid grid-flow-col gap-1 text-xs justify-start">
      <span class="whitespace-nowrap text-primary font-bold rounded-full">
        #{{ props.workspace }}</span
      >
    </div>

    <div class="grid grid-flow-col gap-3 items-center justify-start">
      <div class="self-start">
        <input
          id="helper-checkbox"
          aria-describedby="helper-checkbox-text"
          type="checkbox"
          value=""
          class="w-6 h-6 text-success bg-white border-dashed border-2 border-secondary focus:border-dashed rounded-full focus:ring-transparent dark:focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
        />
      </div>

      <div class="self-start grid grid-flow-row gap-3">
        <div class="relative w-full">
          <InfinityTextarea
            id="title"
            :value="title"
            @input="(e: any) => emits('update:title', e.target.value)"
            class="resize-none block p-0 w-96 text-medium text-gray-900 rounded-lg bg-transparent border-transparent focus:ring-transparent focus:border-transparent dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
            placeholder="Write your thoughts here..."
            rows="1"
          ></InfinityTextarea>
          <button
            type="button"
            class="absolute right-0 bottom-0 ml-3 hover:opacity-100 transition delay-150 hover:scale-150 duration-300 empty:translate-x-2 empty:opacity-0"
            @click="clearHandler"
          >
            <IconClear
              v-if="title"
              class="w-5 text-content dark:text-gray-400"
            ></IconClear>
          </button>
        </div>

        <div class="grid grid-flow-col gap-1 text-xs text-center justify-start">
          <span
            v-for="label in labels"
            class="whitespace-nowrap bg-red-100 text-red-800 font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
            >{{ label }}</span
          >
        </div>
      </div>

      <div
        class="transition delay-150 hover:scale-150 duration-300 empty:translate-x-2 empty:opacity-0"
      >
        <div
          class="self-start grid grid-flow-row gap-1 justify-items-center justify-self-end"
        >
          <button
            type="button"
            class="w-7 text-white text-center rounded-full p-2 inline-flex bg-secondary hover:bg-primary focus:ring-transparent dark:bg-secondary dark:hover:bg-primary"
          >
            <IconStart class="w-7"></IconStart>
            <span class="sr-only">Icon description</span>
          </button>
          <span
            class="bg-gray-200 text-content text-xs px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-white"
          >
            48m
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
