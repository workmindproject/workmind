import { component$, useSignal } from "@builder.io/qwik";

export interface IndexProps {
  count?: number;
}

export default component$<IndexProps>((props) => {
  const count = useSignal(0);
  return (
    <p class="text-slate-500">Hello, here are your latest tasks</p>
  );
});
