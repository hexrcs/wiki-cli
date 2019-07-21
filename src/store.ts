import { observable, computed, action } from "mobx";
import { SearchError, fetchSearchResults, Page, Article, fetchArticle } from "./api";
import { DEFAULT_LANGUAGE } from "./consts";
import { createContext } from "react";
import debounce from "lodash/debounce";

export class Store {
  // input
  @observable
  input: string = "";
  @action
  updateInputs = (value: string) => {
    this.input = value;
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
  @computed
  get selectedPageID(): number {
    return this.results[this.selectedIndex].pageid;
  }
  @computed
  get selectedURL(): string {
    if (this.selectedIndex >= 0 && this.results.length > this.selectedIndex) {
      return `https://${this.lang}.wikipedia.org/?curid=${this.selectedPageID}`;
    } else {
      return "";
    }
  }
  @computed
  get selectedTitle(): string {
    return this.results[this.selectedIndex].title;
  }

  // article
  @observable
  article: Article = { type: "Article", title: "", summary: "" };
  @action
  updateArticle = async () => {
    this.article.title = this.selectedTitle;
    this.article.summary = "Loading...";
    const article = await fetchArticle(this.selectedPageID);
    if (article.type === "SearchError") {
      this.article.summary = article.reason;
    } else {
      this.article.summary = article.summary;
    }
  };

  // results
  @observable
  results: Page[] = [];

  // isDetailsOpen
  @observable
  isDetailsOpen: boolean = false;
  @action
  toggleDetails = () => {
    if (this.isDetailsOpen) {
      this.isDetailsOpen = false;
    } else if (this.results.length > 0) {
      this.updateArticle();
      this.isDetailsOpen = true;
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
