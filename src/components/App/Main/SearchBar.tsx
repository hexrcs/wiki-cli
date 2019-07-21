import React, { useContext } from "react";
import { Text, Box, Color } from "ink";
import TextInput from "ink-text-input";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../../store";

export const SearchBar = observer(() => {
  const store = useContext(StoreContext);

  return (
    <Box marginY={1}>
      <Color blue>
        <Text bold>Keywords: </Text>
      </Color>
      <TextInput value={store.input} onChange={store.updateInputs} />
    </Box>
  );
});
