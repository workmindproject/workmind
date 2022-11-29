import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Greeting from "~/components/greeting";
import SearchForm from "~/components/search.form";
import TaskList from "~/components/tasks/task-list";
import Topbar from "~/components/topbar";

export default component$(() => {
    const nav = useNavigate();
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
            <Topbar>
                {/* <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. --> */}
                <button
                    q:slot="left"
                    type="button"
                    class="rounded-md p-2 lg:hidden"
                    onClick$={() => {
                        window.location.href = '/profiles';
                    }}
                >
                    {/* <span class="sr-only">Open menu</span> */}
                    {/* <!-- Heroicon name: outline/bars-3 --> */}
                    <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>

                {/* <!-- Logo --> */}
                <div q:slot="left" class="ml-4 flex lg:hidden">
                    <a href="/profiles"> Menus </a>
                </div>

                <div q:slot="center" class="grow"></div>

                <div q:slot="right" class="ml-auto flex items-center">
                    {/* <!-- Search --> */}
                    <div class="flex lg:ml-6">
                        <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Search</span>
                            {/* <!-- Heroicon name: outline/magnifying-glass --> */}
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* <!-- Cart --> */}
                    <div class="ml-4 flow-root lg:ml-6">
                        <a href="#" class="group -m-2 flex items-center p-2">
                            {/* <!-- Heroicon name: outline/shopping-bag --> */}
                            <svg
                                class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                            <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                            <span class="sr-only">items in cart, view bag</span>
                        </a>
                    </div>
                </div>
            </Topbar>
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