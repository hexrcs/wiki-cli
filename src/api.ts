import got from "got";
import wtf from "wtf_wikipedia";

import { store } from "./store";

export const fetchArticle = async (title: string | number): Promise<Article | SearchError> => {
  let doc;
  try {
    doc = await wtf.fetch(title, store.lang);
    if (!doc) {
      return {
        type: "SearchError",
        reason: "Error fetching article.",
      };
    }
  } catch {
    return {
      type: "SearchError",
      reason: "Error fetching article.",
    };
  }

  let summary;
  if (doc.isDisambiguation()) {
    summary = "This is a disambiguation page.";
  } else if (doc.isRedirect()) {
    summary = "This is a redirection page.";
  } else {
    summary = doc.sections()[0].text();
  }

  return { type: "Article", title: doc.title(), summary };
};

export const fetchSearchResults = async (query: string): Promise<SearchResults | SearchError> => {
  let response;

  try {
    response = await got(
      `https://${store.lang}.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&prop=pageprops%7Cdescription&redirects=&ppprop=displaytitle&gpssearch=${query}&gpsnamespace=0&gpslimit=6`
    );
  } catch {
    return {
      type: "SearchError",
      reason: "Error fetching search results.",
    };
  }

  const rawResults = JSON.parse(response.body) as RawResults;
  if (!rawResults.query || !rawResults.query.pages) {
    return {
      type: "SearchError",
      reason: "No search results.",
    };
  }

  // extract and sort pages by index
  const pages = Object.values(rawResults.query.pages).sort((a, b) => a.index - b.index);
  return {
    type: "Results",
    results: pages,
  };
};

export interface Article {
  type: "Article";
  title: string;
  summary: string;
}

export interface SearchResults {
  type: "Results";
  results: Page[];
}

export interface SearchError {
  type: "SearchError";
  reason: string;
}

interface RawResults {
  batchcomplete?: string;
  continue?: object;
  query?: {
    redirects?: {
      index: number;
      from: string;
      to: string;
    }[];
    pages?: {
      [id: string]: Page;
    };
  };
}

export interface Page {
  pageid: number;
  ns?: number;
  title: string;
  index: number;
  description: string;
  descriptionsource?: string;
}
