import React, { useContext } from "react";
import { Text, Box, Color, useInput } from "ink";
import { observer } from "mobx-react-lite";
import { StoreContext, Store } from "../../store";

export const Footer = observer(() => {
  const store = useContext(StoreContext);
  useInput((input, key) => {
    if (!key) return;

    if (input === "c") {
      store.isCleanUpTime = true;
      process.exit(0);
    }
  });

  let hint;
  if (store.isDetailsOpen) {
    hint = `Press ENTER to open article in browser, ESC or Q to return to search`;
  } else if (store.results.length > 0) {
    hint = `Press ENTER to read article summary`;
  } else {
    hint = ` `;
  }

  return (
    <Box marginY={1}>
      <Color gray>
        <Text bold>{hint}</Text>
      </Color>
    </Box>
  );
});
