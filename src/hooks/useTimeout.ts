import { useEffect, useRef } from "react";

export default function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();
  const id = useRef<NodeJS.Timeout>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      id.current = setTimeout(tick, delay);

      return () => {
        stop();
      };
    }
  }, [delay]);

  function stop() {
    clearTimeout(id.current);
  }
  return stop;
}
