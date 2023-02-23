<script lang="ts">
export default {
  name: "TasksTopbar",
};
</script>

<script setup lang="ts">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { $tsl } from "@/components/translate/content.translate";
import IconWeeklyPlaner from "@/components/icons/IconWeeklyPlaner.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconTask from "@/components/icons/IconTask.vue";
import IconNotification from "@/components/icons/IconNotification.vue";
import IconSetting from "@/components/icons/IconSetting.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconAddSquare from "@/components/icons/IconAddSquare.vue";
import { ref } from "vue";
import IconChevron from "../icons/IconChevron.vue";
import IconCalendarDaily from "../icons/IconCalendarDaily.vue";

const props = defineProps<{
  view: "Today Tasks" | "Tasks integration" | "My booking" | "Calendar";
}>();
const emits = defineEmits<{
  (event: "on-view", view: string): void;
}>();

const selectedView = ref("");
selectedView.value = props.view;
</script>

<template>
  <nav
    class="h-fit bg-white dark:bg-gray-900 px-2 sm:px-4 py-2.5 shadow rounded"
  >
    <div
      class="container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"
    >
      <div class="ml-4 items-center">
        <!-- Search -->
        <div class="rounded-xl">
          <form>
            <label
              for="search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <IconSearch class="w-5 h-5"></IconSearch>
              </div>
              <input
                type="search"
                id="search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                placeholder="Search"
                required
              />
              <!-- <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button> -->
            </div>
          </form>
        </div>
      </div>
      <div class="grow"></div>
      <div class="ml-auto flex items-center">
        <div class="ml-4 flow-root lg:ml-6">
          <a
            href="#"
            class="group -m-2 flex items-center p-2"
            data-tooltip-target="tooltip-bottom"
            data-tooltip-placement="bottom"
          >
            <IconAddSquare
              class="h-6 w-6 text-gray-400 group-hover:text-gray-500"
            ></IconAddSquare>
            <span class="sr-only">add</span>
          </a>
        </div>

        <div class="ml-4 lg:ml-6">
          <Listbox v-model="selectedView">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 px-3 text-base text-center sm:text-sm shadow outline-dashed outline-secondary focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
              >
                <div class="grid grid-flow-col gap-3">
                  <IconCalendarDaily
                    type="updown"
                    class="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  ></IconCalendarDaily>

                  <span class="block truncate text-base">{{
                    selectedView
                  }}</span>

                  <IconChevron
                    type="updown"
                    class="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  ></IconChevron>
                </div>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    key="Today Tasks"
                    value="Today Tasks"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                      @click="() => emits('on-view', selectedView)"
                    >
                      <slot name="catalog.main"></slot>
                      <!-- <span>Today Tasks</span>
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <IconTask class="h-6 w-6 text-secondary" aria-hidden="true"></IconTask>
                        </span> -->
                    </li>
                  </ListboxOption>

                  <!-- <ListboxOption
                    v-slot="{ active, selected }"
                    key="Tasks integration"
                    value="Tasks integration"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                      @click="() => emits('on-view', selectedView)"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                          'text-base',
                        ]"
                        >Tasks integration</span
                      >
                      <span
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <IconWeeklyPlaner
                          class="h-6 w-6 text-content"
                          aria-hidden="true"
                        ></IconWeeklyPlaner>
                      </span>
                    </li>
                  </ListboxOption>

                  <ListboxOption
                    v-slot="{ active, selected }"
                    key="My booking"
                    value="My booking"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                      @click="() => emits('on-view', selectedView)"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                          'text-base',
                        ]"
                        >My booking</span
                      >
                      <span
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <IconCalendarDaily
                          class="h-6 w-6 text-content"
                          aria-hidden="true"
                        ></IconCalendarDaily>
                      </span>
                    </li>
                  </ListboxOption>

                  <ListboxOption
                    v-slot="{ active, selected }"
                    key="Calendar"
                    value="Calendar"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                      @click="() => emits('on-view', selectedView)"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                          'text-base',
                        ]"
                        >Calendar</span
                      >
                      <span
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <IconCalendar
                          class="h-6 w-6 text-content"
                          aria-hidden="true"
                        ></IconCalendar>
                      </span>
                    </li>
                  </ListboxOption> -->
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>

        <div class="ml-4 lg:ml-6">
          <a href="#" class="group -m-2 flex items-center p-2">
            <IconNotification
              class="h-6 w-6 text-gray-400 group-hover:text-gray-500"
            ></IconNotification>
            <span
              class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
              >0</span
            >
            <span class="sr-only">Notification</span>
          </a>
        </div>
        <div class="ml-4 lg:ml-6">
          <a href="#" class="group -m-2 flex items-center p-2">
            <IconSetting
              class="h-6 w-6 text-gray-400 group-hover:text-gray-500"
            ></IconSetting>
            <span
              class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
              >0</span
            >
            <span class="sr-only">Setting</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
