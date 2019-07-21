import React, { useContext } from "react";
import { Box } from "ink";
import { Key } from "readline";
import { ENTER, ARROW_DOWN, ARROW_UP } from "../../../keys";

import { useKeypress } from "../../../hooks/useKeypress";
import { StoreContext, Store } from "../../../store";
import { ResultsList } from "../Main/ResultsList";
import { SearchBar } from "../Main/SearchBar";

export const Main = () => {
  const store = useContext(StoreContext);
  useKeypress((_?: string, key?: Key) => handleKeypress(store, _, key));

  return (
    <Box flexDirection={"column"}>
      <SearchBar />
      <ResultsList />
    </Box>
  );
};

function handleKeypress(store: Store, _?: string, key?: Key) {
  if (!key) return;

  switch (key.sequence) {
    case ARROW_UP:
      store.selectPrev();
      break;
    case ARROW_DOWN:
      store.selectNext();
      break;
    case ENTER:
      store.toggleDetails();
      break;
  }
}
