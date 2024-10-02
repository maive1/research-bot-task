export interface Article {
  id: string;
  displayName: string;
  publicationYear: number;
  citedByCount: number;
  worksCount: number;
  externalId: string;
  isOa: boolean;
  summary: string;
  authors: Array<string>;
}

export interface OpenAcces {
  isOa: boolean;
  oaStatus: string;
  oaUrl: string;
  anyRespositoryHastFullText: boolean;
}

export interface PrimaryLocation {
  isOa: boolean;
  landingPageUrl: string;
}

export interface Authorship {
  rawAuthorName: string;
}

export interface ResultsOpenAlex {
  id: string;
  doi: string;
  title: string;
  displayName: number;
  publicationYear: number;
  citedByCount: string;
  openAccess: OpenAcces;
  primaryLocation: PrimaryLocation;
  authorships: Array<Authorship>;
}

export interface OpenAlexResponse {
  meta: {
    count: number;
    dbResponseTimeMs: number;
    page: number;
    perPage: number;
    groupsCount: number;
  };
  results: Array<ResultsOpenAlex>;
}
