import { component$, Slot, useSignal } from "@builder.io/qwik";

export interface IndexProps {
  count?: number;
}

export default component$<IndexProps>((props) => {
  const count = useSignal(0);
  return (
    <>
      <div class="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8"></div>
      <div class="fixed top-0 left-0 right-0">
        <nav aria-label="Top" class="h-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <Slot name="left"/>
            <Slot name="center"/>
            <Slot name="right"/>
           </div>
          </div>
        </nav>
      </div>
    </>

  );
});
