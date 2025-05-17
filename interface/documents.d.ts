interface DocumentLinks {
  related: string;
  self: string;
}

interface DocumentAttributes {
  filename: string;
  createdAt: string;
  updatedAt: string;
}

interface DocumentData {
  type: string;
  id: string;
  attributes: DocumentAttributes;
}

interface DocumentRelationships {
  links: DocumentLinks;
  data: DocumentData[];
}
