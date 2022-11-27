import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";
import EmailForm from "~/components/signin.form/email.form";
import PasswordForm from "~/components/signin.form/password.form";
import ApiSignin from "~/components/signin.form/api.signin";

export enum SIGNIN_STATE {
    'email',
    'password',
    'api'
}

export default component$(() => {
    // useStylesScoped$(styles);
    const nav = useNavigate();

    const store = useStore({ step: SIGNIN_STATE['email'], email: '', password: '' })

    return (
        <div class="container px-6 py-12 h-full">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        class="w-full"
                        alt="Phone image"
                    />
                </div>
                <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                    {
                        store.step === SIGNIN_STATE['email']
                            ? <EmailForm onValue$={(e, v) => {
                                store.step = SIGNIN_STATE['password'];
                                store.email = v as string;
                            }} />
                            : store.step === SIGNIN_STATE['password']
                                ? <PasswordForm email={store.email} onValue$={(e, v) => {
                                    store.password = v as string;
                                    store.step = SIGNIN_STATE['api'];
                                }} />
                                : store.step === SIGNIN_STATE['api']
                                    ? <ApiSignin email={store.email} password={store.password}
                                        onValid$={(v) => {
                                            store.password = v as string;
                                            store.step = SIGNIN_STATE['api'];
                                        }}
                                        onInvalid$={(v) => {
                                            store.password = v as string;
                                            store.step = SIGNIN_STATE['api'];
                                            nav.path = '/account';
                                        }}></ApiSignin>
                                    : <></>

                    }
                </div>
                <div class="flex justify-center items-center mt-6">
                    <a
                        href="/signup"
                        target="_blank"
                        class="inline-flex items-center text-gray-700 font-medium text-xs text-center " >
                        <span class="ml-2" >
                            You don't have any account?
                            <a href="signup" class="text-xs ml-2 text-blue-500 font-semibold" >
                                Signup here
                            </a>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: 'Login'
}