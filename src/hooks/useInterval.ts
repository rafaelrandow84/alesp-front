import { useEffect, useRef } from "react";

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
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
      id.current = setInterval(tick, delay);

      return () => {
        stop();
      };
    }
  }, [delay]);

  function stop() {
    clearInterval(id.current);
  }
  return stop;
}
