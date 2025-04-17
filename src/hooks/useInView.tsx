import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
};

export function useInView<T extends HTMLElement = HTMLElement>(
    options?: UseInViewOptions
): [React.RefObject<T>, boolean] {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                root: options?.root || null,
                rootMargin: options?.rootMargin || "0px",
                threshold: options?.threshold || 0,
            }
        );

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [ref.current, options?.root, options?.rootMargin, options?.threshold]);

    return [ref, inView];
}
