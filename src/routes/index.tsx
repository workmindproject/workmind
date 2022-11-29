import { component$ } from '@builder.io/qwik';
import { DocumentHead, useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const nav = useNavigate();
  return (
    <div class="flex justify-center min-h-screen">
      <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
        <div class="w-full">
          <div class="grid grid-cols-1 mt-8 md:grid-cols-1">
            <div class="mb-6">
              <button
                type='button'
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick$={() => {
                  nav.path = '/signin'
                }}
              >
                Go to Signin page
              </button>
            </div>
            <div class="mb-6">
              <button
                type='button'
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick$={() => {
                  nav.path = 'signup'
                }}
              >
                Go to Signup page
              </button>
            </div>

            <div class="mb-6">
              <button
                type='button'
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick$={() => {
                  nav.path = 'home'
                }}
              >
                Go to home page
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
