const w: any = window;
w.popStateDetected = false;

export function usePopState() {
  window.onpopstate = () => {
    w.popStateDetected = true;
  };
}
