import { useEffect, useState } from "react";

interface ResourceI {
  id: string;
  type: string;
  attributes: any;
  links: any;
  relationships: any;
}

interface RootI {
  data: any;
  included: any;
  jsonapi: any;
  links: any;
  meta: any;
}

export const useLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  return loaded;
};

export const toCurrency = (number: number): String => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const getRelationship = (
  root: RootI,
  resource: ResourceI,
  relation: string,
  relationType?: string
): any => {
  return root.included.find(
    (include: any) =>
      include.id === resource.relationships[relation].data.id &&
      include.type === (relationType ? relationType : relation)
  );
};

export const getRelationships = (
  root: RootI,
  resource: ResourceI,
  relation: string
): any => {
  return resource.relationships[relation].data.map(
    (it: { id: string; type: string }) => {
      return root.included.find(
        (include: any) => include.id === it.id && include.type === it.type
      );
    }
  );
};
