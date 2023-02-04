
<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import IconGmail from '../icons/IconGmail.vue';

const props = defineProps<{
    rememberMe?: boolean;
    email?: string;
}>();

const emit = defineEmits<{
    (event: 'update:email', v: string): void
    (event: 'update:remember-me', v: boolean): void
    (event: 'on-email', v: string): void
}>();

function submitHandler() {
    emit('on-email', props.email || '')
}
</script>

<template>
    <form>
        <!-- Email input -->
        <div class="mb-6">
            <input :value="email" @input="(e: any) => emit('update:email', e.target.value)" type="email" id="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Missing domain name. Please include domain name"
                size={30} required
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address" />
        </div>

        <!-- Remember me checkbox -->
        <div class="flex justify-between items-center mb-6">
            <div class="form-group form-check">
                <input :value="rememberMe" @click="(e: any) => emit('update:remember-me', e.target.checked)"
                    type="checkbox"
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck3" />
                <label class="form-check-label inline-block text-gray-800" for="exampleCheck2">
                    Remember me
                </label>
            </div>

        </div>

        <!-- Submit button -->
        <button type='button'
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true" data-mdb-ripple-color="light" @click="submitHandler">
            Next
        </button>

        <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p class="text-center font-semibold mx-4 mb-0">OR</p>
        </div>

        <a class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
            style="background-color: #3b5998" href="#!" role="button" data-mdb-ripple="true"
            data-mdb-ripple-color="light">
            <!-- Gmail -->
            <IconGmail></IconGmail>>
            Continue with Gmail
        </a>
    </form>
</template>