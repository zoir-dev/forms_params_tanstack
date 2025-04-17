import http from "@/lib/http";
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";
import { Ref, useEffect, useState } from "react";
import { AxiosProgressEvent } from "axios";
import { useInView } from "./useInView";

type UseGetOptions<T> = Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;

export function useInfiniteGet<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
    options?: UseGetOptions<T>
): UseQueryResult<T, Error> & {
    downloadProgress: number;
    ref: Ref<HTMLElement>;
    hasNextPage?: boolean;
} {
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [ref, inView] = useInView();
    const queryClient = useQueryClient();

    const lastUrl = params ? [url, { ...params, page_tabs: undefined }] : [url];
    const [page, setPage] = useState(
        () =>
            (queryClient.getQueryData(lastUrl) as { current_page: number })
                ?.current_page || 1
    );

    const query = useQuery<T, Error>({
        queryKey: lastUrl,
        queryFn: async () => {
            const response = await http.get(url, {
                params: params ? { ...params, page } : { page },
                onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setDownloadProgress(percentCompleted);
                    }
                },
            });

            const previousData = queryClient.getQueryData<{ results: T[] }>(
                lastUrl
            );

            return {
                ...response.data,
                current_page: page,
                results: previousData
                    ? [...previousData.results, ...response.data.results]
                    : response.data.results,
            };
        },
        ...options,
        retryDelay: 5000,
        retry: 3,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (
            inView &&
            page <
                ((query.data as T & { total_pages: number })
                    ?.total_pages as number) &&
            !query.isFetching
        ) {
            setPage(page + 1);
        }
    }, [inView]);

    useEffect(() => {
        if (
            page > 1 &&
            !query.isFetching &&
            page !== (query.data as T & { current_page: number })?.current_page
        ) {
            query.refetch();
        }
    }, [page]);

    return {
        ...query,
        ref,
        downloadProgress,
        hasNextPage:
            page <
            (((query.data as T & { total_pages: number })
                ?.total_pages as number) ?? 1),
    };
}
