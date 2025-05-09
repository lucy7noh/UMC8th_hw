import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER,
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam = undefined }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: undefined,
  });
}

export default useGetInfiniteLpList;
