interface Attributes {
  name: string;
  code: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ProductLinks {
  self: string;
}

interface ProductRelationships {
  documents: DocumentRelationships;
  "product-categories": any; // Type not provided in the data
  "product-variants": any; // Type not provided in the data
}

interface ProductData {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: ProductRelationships;
  links: ProductLinks;
}

interface IncludedLinks {
  related: string;
  self: string;
}

interface IncludedRelationships {
  documentable_type: any; // Type not provided in the data
  documentable_id: any; // Type not provided in the data
}
