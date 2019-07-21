import React, { useContext, useEffect } from "react";
import { Box } from "ink";
import { observer } from "mobx-react-lite";

import { StoreContext } from "../../store";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { Details } from "./Details";

export const App = observer((props: { keywords: string; hl: string }) => {
  const store = useContext(StoreContext);
  useEffect(() => {
    store.lang = props.hl;
  }, []);

  if (store.isCleanUpTime) {
    return <Box marginY={1}>Have a nice day! :D</Box>;
  } else {
    return (
      <Box flexDirection={"column"}>
        {!store.isDetailsOpen ? <Main /> : <Details />}
        <Footer />
      </Box>
    );
  }
});
