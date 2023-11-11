"use client";

import { createPortal } from "react-dom";
import {
  PropsWithChildren,
  Ref,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type DropdownContextProps = {
  triggerRef: Ref<HTMLButtonElement>;
  childrenRef: Ref<HTMLDivElement>;
  position: Position | null;
  open: boolean;
  onToggleModal: () => void;
};

const DropdownContext = createContext({} as DropdownContextProps);

type Position = {
  x: number;
  y: number;
};

export function DropdownTrigger({ children }: PropsWithChildren) {
  const { triggerRef, open, onToggleModal } = useContext(DropdownContext);
  return (
    <button
      className={`text-sm btn ${open && "active"}`}
      ref={triggerRef}
      onClick={onToggleModal}
    >
      {children}
    </button>
  );
}

export function DropdownContent({ children }: PropsWithChildren) {
  const { childrenRef, position, open } = useContext(DropdownContext);

  if (!open) return null;

  return createPortal(
    <div
      ref={childrenRef}
      className="fixed z-50 top-0 left-0 min-w-10 bg-zinc-400 shadow-lg border border-black"
      style={{
        transform: `matrix(1, 0, 0, 1, ${position?.x}, ${position?.y})`,
      }}
    >
      <span className="absolute -top-2 right-4 h-0 w-0 border-x-12 border-x-transparent border-b-12 border-b-zinc-400" />
      {children}
    </div>,
    document.body
  );
}

export function DropdownRoot({ children }: PropsWithChildren) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position | null>(null);
  const [open, setOpen] = useState(false);

  function onToggleModal() {
    setOpen((prev) => !prev);
  }

  useLayoutEffect(() => {
    function getDropdownPosition() {
      if (triggerRef?.current && childrenRef?.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const childrenRect = childrenRef.current.getBoundingClientRect();

        console.log(triggerRect, childrenRect);

        setPosition({
          x: triggerRect.right - childrenRect.width + 10,
          y: childrenRect.height - triggerRect.height - 6,
        });
      }
    }

    getDropdownPosition();

    window.addEventListener("resize", getDropdownPosition);
    return () => window.removeEventListener("resize", getDropdownPosition);
  }, [open]);

  console.log(position);

  return (
    <DropdownContext.Provider
      value={{ triggerRef, childrenRef, position, open, onToggleModal }}
    >
      {children}
    </DropdownContext.Provider>
  );
}
