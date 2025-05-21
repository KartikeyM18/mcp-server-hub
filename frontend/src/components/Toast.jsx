
import { Toast, ToastToggle } from "flowbite-react";

export function Toastcomponent({ message }) {
  return (
    <Toast>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </Toast>
  );
}
