import parseArgs from "minimist";
import React from "react";
import { render } from "ink";
import { Help } from "./components/Help";
import { App } from "./components/App";
import { DEFAULT_LANGUAGE } from "./consts";

main();

function main() {
  const argv: ParsedArgs = parseArgs(process.argv.slice(2), {
    boolean: ["help"],
    string: ["lang"],
    alias: { h: "help", l: "lang" },
  });
  const showHelp = argv.h;

  if (showHelp) {
    render(<Help />);
  } else {
    const hl = argv.lang || DEFAULT_LANGUAGE;
    const keywords = argv._.join(" ");
    render(<App keywords={keywords} hl={hl} />, { exitOnCtrlC: false });
  }
}

interface ParsedArgs {
  _: (string | number)[];
  help?: boolean;
  h?: boolean;
  lang?: string;
  l?: string;
}
