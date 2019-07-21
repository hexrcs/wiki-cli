import React, { useContext } from "react";
import { Box, Text } from "ink";
import InkBox from "ink-box";
import { Key } from "readline";
import { observer } from "mobx-react-lite";
import open from "open";

import { ENTER, ESC } from "../../../keys";
import { useKeypress } from "../../../hooks/useKeypress";
import { StoreContext, Store } from "../../../store";

export const Details = observer(() => {
  const store = useContext(StoreContext);
  useKeypress((_?: string, key?: Key) => handleKeypress(store, _, key));

  return (
    <Box flexDirection="column" marginY={1}>
      <InkBox borderStyle="double">
        <Text bold>{store.article.title}</Text>
      </InkBox>
      <Box textWrap="wrap" marginTop={1}>
        {store.article.summary}
      </Box>
    </Box>
  );
});

function handleKeypress(store: Store, _?: string, key?: Key) {
  if (!key) return;

  switch (key.sequence) {
    case ENTER:
      open(store.selectedURL);
      break;
    case ESC:
      store.toggleDetails();
      break;
  }

  if (key.name === "q") {
    store.toggleDetails();
  }
}
