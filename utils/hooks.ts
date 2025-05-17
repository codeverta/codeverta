import { useQueryClient } from "@tanstack/react-query";

export const useGetFetchQuery = (name: any) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(name);
};
