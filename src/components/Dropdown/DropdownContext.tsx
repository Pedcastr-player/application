import {
  Ref,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ReactComponentProps } from "@/types";

type DropdownContextProps = {
  triggerRef: Ref<HTMLDivElement>;
  childrenRef: Ref<HTMLDivElement>;
  position: Position | null;
};

const DropdownContext = createContext({} as DropdownContextProps);

type Position = {
  x: number;
  y: number;
};

export function DropdownContextProvider({ children }: ReactComponentProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position | null>(null);

  useLayoutEffect(() => {
    function getDropdownPosition() {
      if (triggerRef?.current && childrenRef?.current) {
        const childrenRect = childrenRef.current.getBoundingClientRect();

        setPosition({
          x:
            triggerRef.current.offsetLeft +
            triggerRef.current.offsetWidth -
            childrenRect.width +
            12,
          y: triggerRef.current.offsetTop + childrenRect.height - 12,
        });
      }
    }

    getDropdownPosition();

    window.addEventListener("resize", getDropdownPosition);
    return () => window.removeEventListener("resize", getDropdownPosition);
  }, []);

  return (
    <DropdownContext.Provider value={{ triggerRef, childrenRef, position }}>
      {children}
    </DropdownContext.Provider>
  );
}

export function useDropdownContext() {
  return useContext(DropdownContext);
}
