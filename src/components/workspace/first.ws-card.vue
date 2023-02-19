<script lang="ts">
export default { name: "FirstWsCard" };
</script>
<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { $tsl } from "@/components/translate/content.translate";
import { ErrorCode } from "@/components/translate/error.translate";
import IconYourName from "@/components/icons/IconYourName.vue";

const props = defineProps<{ name: string }>();

const emit = defineEmits<{
  (event: "update:name", v: string): void;
  (event: "on-submit", v: string): void;
}>();

const errs = reactive({ name: "" });

watch(props, async (newValue, oldValue) => {
  if (!props.name) errs.name = "empty";
  else errs.name = "";
});

function submitHandler() {
  if (errs.name) return;
  emit("on-submit", props.name || "");
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <TransitionRoot
      appear
      show
      enter="transform transition duration-[400ms] ease-in-out"
      enter-from="translate-x-1/4 opacity-0"
      enter-to="translate-x-0 opacity-100"
      leave="transform duration-200 transition ease-in-out"
      leave-from="translate-x-1/4 opacity-100"
      leave-to="translate-x-full opacity-0"
    >
      <div class="grid grid-flow-row gap-10">
        <div class="grid grid-flow-row gap-3">
          <div class="w-3/12 rounded-full m-auto">
            <IconYourName></IconYourName>
          </div>
          <h1 class="text-2xl font-bold uppercase text-center">
            {{ $tsl("Welcome to Workmind") }}
          </h1>
          <p class="text-center">
            {{
              $tsl(
                "Work productively with to-do-list, time tracking, calendar, and work focus."
              )
            }}
          </p>
        </div>

        <div class="grid grid-flow-row gap-3">
          <p class="font-bold uppercase text-center">
            {{ $tsl("ENTER YOUR NAME TO START") }}
          </p>

          <!-- Email input -->
          <div>
            <input
              type="text"
              id="yourname"
              :value="name"
              @input="(e: any) => emit('update:name', e.target.value)"
              class="block w-full p-4 text-content border rounded-xl bg-gray-50 sm:text-md focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
              :class="
                errs.name
                  ? 'border-red-600 dark:border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              "
              :placeholder="$tsl('Enter your name')"
              size="30"
              required
            />
            <span
              v-if="errs.name === 'empty'"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
              >{{ ErrorCode("Name is required") }}</span
            >
          </div>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="inline-block px-7 py-3 font-bold text-lg leading-snug uppercase rounded-full shadow-md bg-primary hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          {{ $tsl("Let's go") }}
        </button>
      </div>
    </TransitionRoot>
  </form>
</template>
