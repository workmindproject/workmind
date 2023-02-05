
<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const props = defineProps<{
    password?: string;
    email?: string;
}>();

const emit = defineEmits<{
    (event: 'update:email', v: string): void
    (event: 'update:password', v: string): void
    (event: 'on-submit', v: { email: string, password: string }): void
}>();

function submitHandler() {
    emit('on-submit', { email: props.email || '', password: props.password || '' })
}
</script>

<template>
    <form>
        <!-- Email input -->
        <div class="mb-6">
            <p class="mt-2 text-center text-sm text-gray-600">
                Đăng nhập bằng tài khoản
            </p>
            <input :value="email" type="email" id="email" required
                class="form-control text-center block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-grey bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address" disabled />
        </div>

        <!-- Password input -->
        <div class="mb-6">
            <input :value="password" @input="(e: any) => emit('update:password', e.target.value)" type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password" minLength={6} />
        </div>

        <!-- Forgot password link -->
        <div class="flex justify-between items-center mb-6">
            <a href="#!"
                class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">
                Forgot password?
            </a>
        </div>

        <!-- Submit button -->
        <button id="password" type="button"
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true" data-mdb-ripple-color="light" @click="submitHandler">
            signin
        </button>
    </form>
</template>
