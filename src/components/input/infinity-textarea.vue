<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps(["modelValue", "value"]);
const inputValue = ref(props.modelValue || props.value);
const inputRef = ref<HTMLTextAreaElement>();

const emits = defineEmits<{
  (event: "update:modelValue", payload: string): void;
  (event: "input", payload: Event): void;
  (event: "mouseleave", payload: MouseEvent): void;
  (event: "blur", payload: FocusEvent): void;
  (event: "focusout", payload: FocusEvent): void;
  (event: "focusin", payload: FocusEvent): void;
  (event: "focus", payload: FocusEvent): void;
  (event: "keyup.enter", payload: KeyboardEvent): void;
  (event: "keydown.enter", payload: KeyboardEvent): void;
  (event: "keypress.enter", payload: KeyboardEvent): void;
}>();

const handleInput = (e: any) => {
  emits("input", e);
  emits("update:modelValue", inputValue.value);
  autoGrow(e.target.scrollHeight);
};

function autoGrow(scrollHeight: number) {
  if (!inputRef.value?.style) return;
  inputRef.value.style.height = "auto";
  inputRef.value.style.height = `${scrollHeight}px`;
  inputRef.value.style.overflowY = `hidden`;
}

setTimeout(() => {
  autoGrow(inputRef.value?.scrollHeight || 24);
}, 100);
</script>

<template>
  <textarea
    ref="inputRef"
    rows="1"
    v-model="inputValue"
    @input="handleInput"
    @mouseleave="(e) => emits('mouseleave', e)"
    @blur="(e) => emits('blur', e)"
    @focusout="(e) => emits('focusout', e)"
    @focusin="(e) => emits('focusin', e)"
    @focus="(e) => emits('focus', e)"
    @keydown.enter.prevent="(e) => emits('keyup.enter', e)"
    @keyup.enter.prevent="(e) => emits('keyup.enter', e)"
    @keypress.enter="(e) => emits('keypress.enter', e)"
  ></textarea>
</template>
