import { component$ } from "@builder.io/qwik";
import Greeting from "~/components/greeting";
import SearchForm from "~/components/search.form";
import TaskList from "~/components/tasks/task-list";
import Topbar from "~/components/topbar";

export default component$(() => {
    return <>
        {/* <!-- Sidebars button --> */}
        {/* <div class="fixed flex items-center space-x-4 top-5 right-10 lg:hidden">
            <button
   @click="isSidebarOpen = true; $nextTick(() => { $refs.sidebar.focus() })"
   class="p-1 text-indigo-400 transition-colors duration-200 rounded-md bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:ring"
 >
            <button
                class="p-1 text-indigo-400 transition-colors duration-200 rounded-md bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:ring"
            >
                <span class="sr-only">Toggle main manu</span>
                <span aria-hidden="true">
                    <svg
                        x-show="!isSidebarOpen"
                        class="w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg
                        x-show="isSidebarOpen"
                        class="w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </button>
        </div> */}

        <>
            {/* <!-- Main content --> */}
            <body class="antialiased bg-slate-200 text-slate-700">
                <div class="bg-white p-8 rounded-xl shadow shadow-slate-300">
                    <div id="tasks-title" class="mb-3">
                        <div class="flex flex-row justify-between items-center">
                            <div>
                                <h1 class="text-3xl font-medium">Tasks list</h1>
                            </div>
                            <div class="inline-flex space-x-2 items-center">
                                <a href="#" class="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="text-sm font-medium hidden md:block">Urgent</span>
                                </a>
                                <a href="#" class="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center hover:bg-slate-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <span class="text-sm hidden md:block">Latest</span>
                                </a>
                            </div>
                        </div>
                        <Greeting></Greeting>
                    </div>
                    <div class="max-w-lg mb-3 rounded-xl">
                        <SearchForm></SearchForm>
                    </div>
                    <TaskList></TaskList>
                    <p class="text-xs text-slate-500 text-center">Last updated 12 minutes ago</p>
                </div>
            </body>
        </>
    </>
})