import { useEffect, useContext } from "react";
import { StdinContext } from "ink";
import { Key } from "readline";

// PR of the official useKeypress hook is still under review so rolling my own

/**
 * Hook that calls a callback with whatever key has been pressed.
 *
 * @param keypressHandler The callback to be called on key press.
 */
export function useKeypress(keypressHandler: (str?: string, key?: Key) => void) {
  const { stdin, setRawMode } = useContext(StdinContext);
  useEffect(() => {
    setRawMode && setRawMode(true);
    stdin.on("keypress", keypressHandler);
    return () => {
      stdin.off("keypress", keypressHandler);
      setRawMode && setRawMode(false);
    };
  }, [stdin, setRawMode]);
}
