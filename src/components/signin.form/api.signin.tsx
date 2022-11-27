import { component$, PropFunction, Resource, useResource$, useStore, useStylesScoped$ } from '@builder.io/qwik';

export interface SigninData {
    email: string;
    password: string;
}

export interface SigninApiProps extends SigninData {
    onValid$: PropFunction<(value: unknown) => unknown>;
    onInvalid$: PropFunction<(value: unknown) => unknown>;
}


export async function signinByEmailApi(email: string, password: string, controller?: AbortController) {
    console.log('FETCH', '')
    const resp = await fetch('', {
        signal: controller?.signal, method: 'POST', body: JSON.stringify({
            email, password
        })
    });
    console.log('FETCH', 'resolved');
    const jsonData = await resp.json();
    return jsonData.results || Promise.reject(jsonData);
}

export default component$<SigninApiProps>((props: SigninApiProps) => {
    // useStylesScoped$(styles);
    const store = useStore({ password: props.password, email: props.email })
    const signinResource = useResource$<SigninData>(({ track, cleanup }) => {
        track(() => store.email)
        const ctl = new AbortController();
        cleanup(() => ctl.abort())
        return signinByEmailApi(store.email, store.password, ctl);
    })
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
            </div>

            {/* <!-- Loading button --> */}
            <button disabled type="button" class="inline-block py-2.5 px-5 mr-2 text-sm text-center font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 items-center w-full">
                <svg role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                </svg>
                <Resource
                    value={signinResource}
                    onPending={() => <>Chờ xác thực ...</>}
                    onRejected={(e) => {
                        if (typeof props.onInvalid$ === 'function') props.onInvalid$(e)
                        return <></>
                    }}
                    onResolved={(accountData) => {
                        if (typeof props.onValid$ === 'function') props.onValid$(accountData)
                        return <>Xác thực thành công</>
                    }}
                ></Resource>
            </button>

        </form>
    );
});
