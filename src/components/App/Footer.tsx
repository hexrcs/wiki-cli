import React, { useContext } from "react";
import { Text, Box, Color } from "ink";
import { Key } from "readline";
import { observer } from "mobx-react-lite";
import { StoreContext, Store } from "../../store";
import { useKeypress } from "../../hooks/useKeypress";
import { CTRL_C } from "../../keys";

export const Footer = observer(() => {
  const store = useContext(StoreContext);
  useKeypress((_?: string, key?: Key) => handleKeypress(store, _, key));

  let hint;
  if (store.isDetailsOpen) {
    hint = `Press ENTER to open article in browser, ESC or Q to return to search`;
  } else if (store.results.length > 0) {
    hint = `Press ENTER to read article summary`;
  } else {
    hint = ``;
  }

  return (
    <Box marginY={1}>
      <Color gray>
        <Text bold>{hint}</Text>
      </Color>
    </Box>
  );
});

function handleKeypress(store: Store, _?: string, key?: Key) {
  if (!key) return;

  if (key.sequence === CTRL_C) {
    store.isCleanUpTime = true;
    process.exit(0);
  }
}
