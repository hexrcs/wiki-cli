import React, { useContext } from "react";
import { Text, Box, Color } from "ink";
import { observer } from "mobx-react-lite";

import { Page } from "../../../api";
import { StoreContext } from "../../../store";

export const ResultsList = observer(() => {
  const store = useContext(StoreContext);

  return (
    <Box flexDirection={"column"}>
      {store.results.map((result, i) => {
        return <ResultCard result={result} i={i} key={i} isSelected={store.selectedIndex === i} />;
      })}
    </Box>
  );
});

const ResultCard = (props: { result: Page; i: number; isSelected: boolean }) => {
  return (
    <Box height={3}>
      <Box width={2} marginX={1} flexDirection={"row-reverse"}>
        {props.isSelected ? (
          <Color green>
            <Text bold>>> </Text>
          </Color>
        ) : (
          <Color green>
            <Text bold>{props.i + 1}. </Text>
          </Color>
        )}
      </Box>
      <Box flexDirection="column">
        {props.isSelected ? (
          <Color bgGreen white>
            <Text bold>{props.result.title} </Text>
          </Color>
        ) : (
          <Color green>
            <Text bold>{props.result.title} </Text>
          </Color>
        )}
        <Box textWrap={"wrap"}>{props.result.description} </Box>
      </Box>
    </Box>
  );
};
