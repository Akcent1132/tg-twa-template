import { RefObject, useEffect, useMemo } from 'react';
import { useVisible } from './useVisible';


type EndlessScrollOptions = {
    ref: RefObject<HTMLElement>;
    isLoading: boolean;
    hasMore: boolean;
    loadMore?: (() => void | undefined);
    threshold?: number;
};

export function useEndlessScroll({ threshold, ref, isLoading, loadMore, hasMore }: EndlessScrollOptions) {
    const options = useMemo<IntersectionObserverInit>(() => {
        return {
            rootMargin: `0px 0px ${threshold || 0}px 0px`,
        };
    }, [threshold]);

    const needLoadMore = useVisible(ref, options) || false;

    useEffect(() => {
        if (!hasMore) return;
        if (isLoading) return;

        // if (needLoadMore) {
            loadMore();
        // }
    }, [needLoadMore, loadMore, hasMore, isLoading]);
}
