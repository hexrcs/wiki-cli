import { observable, computed, action } from "mobx";
import { SearchError, fetchSearchResults, Page } from "./api";
import { DEFAULT_LANGUAGE } from "./consts";
import { createContext } from "react";
import debounce from "lodash/debounce";

export class Store {
  // input
  @observable
  input: string = "";
  @action
  updateInputs = (keywords: string) => {
    this.input = keywords;
    this.debouncedSearch();
  };
  @action
  debouncedSearch = debounce(async () => {
    if (!this.input.length) {
      this.results = [];
      return;
    }
    const data = await fetchSearchResults(this.input);
    if (data.type === "Results") {
      this.error = null;
      this.results = data.results;
    } else {
      this.error = data;
      this.results = [];
    }
    this.selectedIndex = 0;
  }, 200);

  // selectedIndex
  @observable
  selectedIndex: number = 0;
  @action
  selectNext = () => {
    const index = this.selectedIndex + 1;
    if (index >= 0 && this.results.length > index) {
      this.selectedIndex = index;
    }
  };
  @action
  selectPrev = () => {
    const index = this.selectedIndex - 1;
    if (index >= 0 && this.results.length > index) {
      this.selectedIndex = index;
    }
  };

  // results
  @observable
  results: Page[] = [];
  @computed
  get selectedURL(): string {
    if (this.selectedIndex >= 0 && this.results.length > this.selectedIndex) {
      const { pageid } = this.results[this.selectedIndex];
      return `https://${this.lang}.wikipedia.org/?curid=${pageid}`;
    } else {
      return "";
    }
  }

  // isDetailsOpen
  @observable
  isDetailsOpen: boolean = false;
  @action
  toggleDetails = () => {
    if (this.results.length > 0) {
      this.isDetailsOpen = !this.isDetailsOpen;
    }
  };

  @observable
  isCleanUpTime: boolean = false;

  @observable
  lang = DEFAULT_LANGUAGE;

  @observable
  error: SearchError | null = null;
}

export const store = new Store();
export const StoreContext = createContext(store);
