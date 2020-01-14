import React, { useContext } from "react";
import { Box, useInput } from "ink";
import { StoreContext } from "../../../store";
import { ResultsList } from "../Main/ResultsList";
import { SearchBar } from "../Main/SearchBar";

export const Main = () => {
  const store = useContext(StoreContext);
  useInput((_, key) => {
    if (!key) return;

    if (key.upArrow) {
      store.selectPrev();
    } else if (key.downArrow) {
      store.selectNext();
    } else if (key.return) {
      store.toggleDetails();
    }
  });

  return (
    <Box flexDirection={"column"}>
      <SearchBar />
      <ResultsList />
    </Box>
  );
};
