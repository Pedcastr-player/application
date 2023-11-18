import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";

type CallbackFunctionProps = (() => void) | (() => Promise<void>);

type Props = {
  callback: CallbackFunctionProps;
  timeout?: number;
};

export default function useDebounce({ callback, timeout = 1000 }: Props) {
  const ref = useRef<CallbackFunctionProps | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, timeout);
  }, [timeout]);

  return debouncedCallback;
}
