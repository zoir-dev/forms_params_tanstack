import http from "@/lib/http";
import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";

type UseGetOptions<T> = Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;

export function useGet<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
    options?: UseGetOptions<T>
): UseQueryResult<T, Error> {
    const lastUrl = params ? [url, params] : [url];
    const query = useQuery<T, Error>({
        queryKey: lastUrl,
        queryFn: async () => {
            const response = await http.get(url, {
                params,
            });
            return response.data as T;
        },
        retryDelay: 3000,
        retry: 3,
        placeholderData: keepPreviousData,
        ...options,
    });

    return query;
}
