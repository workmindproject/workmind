import { component$, Slot } from '@builder.io/qwik';

// Layout 
// Ref: https://tailwindcomponents.com/component/responsive-mini-one-columns-sidebar

export default component$(() => {
    return (
        <>
            {/* <div
          x-data="setup()"
          x-init="$refs.loading.classList.add('hidden');"
          :class="{ 'dark': isDark }"
          @resize.window="watchScreen()"
        > */}
            <div >

                <div class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
                    {/* <!-- Loading screen --> */}
                    {/* <div
 x-ref="loading"
 class="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-indigo-800"
>
 Loading.....
</div> */}

                    {/* <!-- Sidebar --> */}
                    {/* <!-- Backdrop --> */}
                    {/* <div
 x-show="isSidebarOpen"
 @click="isSidebarOpen = false"
 class="fixed inset-0 z-10 bg-indigo-800 lg:hidden"
 style="opacity: 0.5"
 aria-hidden="true"
></div> */}
                    <div

                        class="fixed inset-0 z-10 bg-indigo-800 lg:hidden"
                        style="opacity: 0.5"
                        aria-hidden="true"
                    ></div>

                    {/* <aside
 x-show="isSidebarOpen"
 x-transition:enter="transition-all transform duration-300 ease-in-out"
 x-transition:enter-start="-translate-x-full opacity-0"
 x-transition:enter-end="translate-x-0 opacity-100"
 x-transition:leave="transition-all transform duration-300 ease-in-out"
 x-transition:leave-start="translate-x-0 opacity-100"
 x-transition:leave-end="-translate-x-full opacity-0"
 x-ref="sidebar"
 @keydown.escape="window.innerWidth <= 1024 ? isSidebarOpen = false : ''"
 tabindex="-1"
 class="fixed inset-y-0 z-10 flex flex-shrink-0 overflow-hidden bg-white border-r lg:static dark:border-indigo-800 dark:bg-darker focus:outline-none"
></div> */}
                    <aside
                        x-show="isSidebarOpen"
                        x-transition:enter="transition-all transform duration-300 ease-in-out"
                        x-transition:enter-start="-translate-x-full opacity-0"
                        x-transition:enter-end="translate-x-0 opacity-100"
                        x-transition:leave="transition-all transform duration-300 ease-in-out"
                        x-transition:leave-start="translate-x-0 opacity-100"
                        x-transition:leave-end="-translate-x-full opacity-0"
                        x-ref="sidebar"
                        tabIndex={-1}
                        class="fixed inset-y-0 z-10 flex flex-shrink-0 overflow-hidden bg-white border-r lg:static dark:border-indigo-800 dark:bg-darker focus:outline-none"
                    >
                        {/* <!-- Mini column --> */}
                        <div class="flex flex-col flex-shrink-0 h-full px-2 py-4 border-r dark:border-indigo-800">
                            {/* <!-- Brand --> */}
                            <div class="flex-shrink-0">
                                <a
                                    href="#"
                                    class="inline-block text-xl font-bold tracking-wider text-indigo-700 uppercase dark:text-light"
                                >
                                    K-WD
                                </a>
                            </div>
                            <div class="flex flex-col items-center justify-center flex-1 space-y-4">
                                {/* <!-- Notification button --> */}
                                {/* <button
       @click="openNotificationsPanel"
       class="p-2 text-indigo-400 transition-colors duration-200 rounded-full bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
     > */}
                                <button
                                    class="p-2 text-indigo-400 transition-colors duration-200 rounded-full bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
                                >
                                    <span class="sr-only">Open Notification panel</span>
                                    <svg
                                        class="w-7 h-7"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                </button>

                                {/* <!-- Search button --> */}
                                {/* <button
       @click="openSearchPanel"
       class="p-2 text-indigo-400 transition-colors duration-200 rounded-full bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
     > */}
                                <button
                                    class="p-2 text-indigo-400 transition-colors duration-200 rounded-full bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
                                >
                                    <span class="sr-only">Open search panel</span>
                                    <svg
                                        class="w-7 h-7"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>

                                {/* <!-- Settings button --> */}
                                {/* <button
       @click="openSettingsPanel"
       class="p-2 text-indigo-400 transition-colors duration-200 rounded-full bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
     > */}
                                <button
                                    class="p-2 text-indigo-400 transition-colors duration-200 rounded-full bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
                                >
                                    <span class="sr-only">Open settings panel</span>
                                    <svg
                                        class="w-7 h-7"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {/* <!-- Sidebar links --> */}
                        <nav aria-label="Main" class="flex-1 w-64 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
                            {/* <!-- Dashboards links --> */}
                            <div x-data="{ isActive: false, open: false}">
                                {/* <!-- active & hover classes 'bg-indigo-100 dark:bg-indigo-600' --> */}
                              
                            </div>
                        </nav>
                    </aside>
                    <Slot />
                </div>
            </div>
        </>
    );
});
