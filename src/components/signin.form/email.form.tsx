import { component$, PropFunction, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.css?inline';

export interface EmailFormProps {
    rememberMe?: boolean;
    value?: string;
    onValue$: PropFunction<(eventName: string, value: unknown) => unknown>;
}

export default component$<EmailFormProps>((props: EmailFormProps) => {
    // useStylesScoped$(styles);
    const store = useStore({ email: props.value, rememberMe: props.rememberMe || false })
    return (
        <form>
            {/* <!-- Email input --> */}
            <div class="mb-6">
                <input
                    type="email"
                    id="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Missing domain name. Please include domain name"
                    size={30}
                    required
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    onInput$={(e: Event) => store.email = (e.target as HTMLInputElement).value}
                />
            </div>

            <div class="flex justify-between items-center mb-6">
                <div class="form-group form-check">
                    <input
                        type="checkbox"
                        class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        id="exampleCheck3"
                        checked={store.rememberMe}
                        onInput$={(e: Event) => store.rememberMe = (e.target as HTMLInputElement).checked}
                    />
                    <label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
                    >Remember me
                    </label>
                </div>

            </div>

            {/* <!-- Submit button --> */}
            <button
                type='button'
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick$={() => {
                    if (typeof props.onValue$ === 'function') props.onValue$('value', store.email);
                }}
            >
                Next
            </button>

            <div
                class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
                <p class="text-center font-semibold mx-4 mb-0">OR</p>
            </div>

            <a
                class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                style="background-color: #3b5998"
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
            >
                {/* <!-- Gmail --> */}
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="w-3.5 h-3.5 mr-2">
                    {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                Continue with Gmail
            </a>
            {/* <!-- Twitter --> */}
            {/* <a
        class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
        style="background-color: #55acee"
        href="#!"
        role="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="w-3.5 h-3.5 mr-2"
        >
            <path
                fill="currentColor"
                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
            /></svg>Continue with Twitter
    </a> */}
        </form>
    );
});
