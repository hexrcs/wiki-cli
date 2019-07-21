import React, { useContext } from "react";
import { Text, Box } from "ink";
import { Key } from "readline";
import { StoreContext, Store } from "../../store";
import { useKeypress } from "../../hooks/useKeypress";
import { CTRL_C } from "../../keys";

export const Footer = () => {
  const store = useContext(StoreContext);
  useKeypress((_?: string, key?: Key) => handleKeypress(store, _, key));

  let hint;
  if (store.isDetailsOpen) {
    hint = `Press ENTER to open article in browser`;
  } else if (store.results.length > 0) {
    hint = `Press ENTER to read article summary`;
  } else {
    hint = `Welcome to wiki-cli!`;
  }

  return (
    <Box marginY={1} marginX={4}>
      <Text bold>{hint}</Text>
    </Box>
  );
};

function handleKeypress(store: Store, _?: string, key?: Key) {
  if (!key) return;

  if (key.sequence == CTRL_C) {
    store.isCleanUpTime = true;
    process.exit(0);
  }
}
