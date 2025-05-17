interface Meta {
  page: {
    currentPage: number;
    from: number;
    lastPage: number;
    perPage: number;
    to: number;
    total: number;
  };
}

interface Links {
  first: string;
  last: string;
  next: string;
}

interface DataResponse<Resource> {
  meta: Meta;
  jsonapi: Jsonapi;
  links: Links;
  data: Resource;
  included: any;
}
