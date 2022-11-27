import { component$, PropFunction, useStore, useStylesScoped$ } from '@builder.io/qwik';

export interface PasswordFormProps {
    // onValue: (eventName: string, value: unknown) => void
    email?: string;
    password?: string;
    onValue$: PropFunction<(eventName: string, value: unknown) => unknown>;
}

export default component$<PasswordFormProps>((props: PasswordFormProps) => {
    // useStylesScoped$(styles);
    const store = useStore({ password: props.password, email: props.email })
    return (
        <form>
            {/* <!-- Email input --> */}
            <div class="mb-6">
                <p class="mt-2 text-center text-sm text-gray-600">
                    Đăng nhập bằng tài khoản
                </p>
                <input
                    type="email"
                    id="email"
                    required
                    class="form-control text-center block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-grey bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    disabled
                    value={store.email}
                />
                {/* <p class="mt-2 text-center text-sm text-gray-600">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"></a>
                </p>
                <button
                    type="button"
                    class="px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick$={(e, v) => {
                        // if (typeof props.onValue$ === 'function') props.onValue$('value', store.password);
                    }}
                >

                </button> */}
            </div>
            {/* <!-- Password input --> */}
            <div class="mb-6">
                <input
                    type="password"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    minLength={6}
                    onInput$={(e: Event) => store.password = (e.target as HTMLInputElement).value}
                />
            </div>

            <div class="flex justify-between items-center mb-6">
                <a
                    href="#!"
                    class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >Forgot password?</a>
            </div>

            {/* <!-- Submit button --> */}
            <button
                id="password"
                type="button"
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick$={(e, v) => {
                    if (typeof props.onValue$ === 'function') props.onValue$('value', store.password);
                }}
            >
                signin
            </button>
        </form>
    );
});
