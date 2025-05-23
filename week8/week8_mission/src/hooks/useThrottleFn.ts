import { useRef } from "react";

function useThrottleFn<T extends (...args: any[]) => void>(callback: T, delay: number): T {
  const lastCall = useRef(0);

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  };

  return throttled as T;
}

export default useThrottleFn;
