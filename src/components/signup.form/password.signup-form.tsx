import { component$, PropFunction, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export interface PasswordSignupFormProps {
    email?: string;
    password?: string;
    onValue$: PropFunction<(eventName: string, value: unknown) => unknown>;
}

export default component$<PasswordSignupFormProps>((props: PasswordSignupFormProps) => {
    // useStylesScoped$(styles);
    const store = useStore({ password: props.password, email: props.email })
    return (
        <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            {/* <!-- Email input --> */}
            <div class="mb-6">
                {/* <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label> */}
                <input
                    type="password"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    minLength={6}
                    onInput$={(e: Event) => store.password = (e.target as HTMLInputElement).value}
                />
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
                Sign Up
            </button>
        </form>
    );
});
