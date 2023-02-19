<script setup>
import IconStart from "@/components/icons/IconStart.vue";
import Loading from "@/components/loading/loading.vue";
import TasksTopbar from "@/components/tasks/tasks.topbar.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const parentPath = route.path.split('/today')[0];

</script>

<template>
  <div class="h-screen m-auto text-content">
    <div class="grid grid-flow-row md:gap-20">
      <TasksTopbar></TasksTopbar>
      <div class="flex justify-center items-center flex-wrap">
        <div class="max-w-[480px] min-w-xs md:w-8/12 lg:w-5/12">
          <div class="">
            <div class="grid grid-flow-row gap-5">
              <div class="flex items-center justify-between mb-4">
                <h5
                  class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                  Latest Customers
                </h5>
                <a
                  href="#"
                  class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  View all
                </a>
              </div>
              <div class="flow-root">
                <ul
                  role="list"
                  class="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li class="py-3 sm:py-4">
                    <div
                      class="max-w-md p-6 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div class="grid grid-flow-row gap-3">
                        <!-- <svg
                        class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                          clip-rule="evenodd"
                        ></path>
                        <path
                          d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
                        ></path>
                      </svg> -->
                        <div class="grid grid-flow-col gap-1 text-xs">
                          <span
                            class="whitespace-nowrap self-start text-blue-800 font-bold rounded-full dark:bg-blue-900 dark:text-blue-300"
                            ># Productive</span
                          >
                          <div
                            class="grid grid-flow-col gap-1 text-xs text-center content-start"
                          >
                            <span
                              class="whitespace-nowrap bg-red-100 text-red-800 font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                              >Red</span
                            >
                            <span
                              class="whitespace-nowrap bg-green-100 text-green-800 font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                              >Green</span
                            >
                            <span
                              class="whitespace-nowrap bg-yellow-100 text-yellow-800 font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
                              >Yellow</span
                            >
                          </div>

                          <div
                            class="grid grid-flow-col gap-1 text-xs text-center justify-end"
                          >
                            <span
                              class="self-start bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                            >
                              48m
                            </span>
                            <button
                              type="button"
                              class="w-7 text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none rounded-full text-sm p-2 text-center inline-flex items-center dark:bg-secondary dark:hover:bg-primary"
                            >
                              <IconStart class="w-7"></IconStart>
                              <span class="sr-only">Icon description</span>
                            </button>
                          </div>
                        </div>

                        <div class="flex">
                          <div class="flex items-center h-5">
                            <input
                              id="helper-checkbox"
                              aria-describedby="helper-checkbox-text"
                              type="checkbox"
                              value=""
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                          </div>
                          <div class="ml-2">
                            <label
                              for="helper-checkbox"
                              class="font-medium text-gray-900 dark:text-gray-300"
                              >Free shipping via Flowbite</label
                            >
                            <p
                              id="helper-checkbox-text"
                              class="font-normal text-gray-500 dark:text-gray-300"
                            >
                              For orders shipped from $25 in books or $29 in
                              other categories
                            </p>
                          </div>
                        </div>

                        <a
                          href="#"
                          class="inline-flex items-center text-blue-600 hover:underline"
                        >
                          See our guideline
                          <svg
                            class="w-5 h-5 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                            ></path>
                            <path
                              d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
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
