import type { TAPIQuery } from "@/shared/types/api/TAPI-query";

export function appendQueryParams(url: URL, query: TAPIQuery) {
  for (const key in query) {
    if (query[key] === undefined) {
      continue;
    }

    if (Array.isArray(query[key])) {
      url.searchParams.append(key, query[key].join(","));
      continue;
    }

    url.searchParams.append(key, query[key].toString());
  }
}
