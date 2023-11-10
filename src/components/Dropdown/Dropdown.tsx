"use client";

import { createPortal } from "react-dom";
import { ReactComponentProps } from "@/types";
import { DropdownContextProvider, useDropdownContext } from "./DropdownContext";

export function DropdownTrigger({ children }: ReactComponentProps) {
  const { triggerRef } = useDropdownContext();
  return <div ref={triggerRef}>{children}</div>;
}

export function DropdownContent({ children }: ReactComponentProps) {
  const { childrenRef, position } = useDropdownContext();

  return createPortal(
    <div
      ref={childrenRef}
      className="fixed z-50 top-0 left-0 min-w-10"
      style={{
        transform: `matrix(1, 0, 0, 1, ${position?.x}, ${position?.y})`,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

export function DropdownRoot({ children }: ReactComponentProps) {
  return <DropdownContextProvider>{children}</DropdownContextProvider>;
}
