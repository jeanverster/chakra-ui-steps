import { createRef, useLayoutEffect, useMemo, useState } from "react";

type LazyRenderProps = {
  threshold?: number;
  rootMargin?: string;
  onVisible?: () => void;
  children: React.ReactNode;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  return isBrowser() ? <>{children}</> : null;
};

const LazyRender = ({
  children,
  threshold,
  rootMargin,
  onVisible,
}: LazyRenderProps) => {
  const ref = useMemo(() => createRef<HTMLDivElement>(), []);

  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const options = {
      rootMargin: rootMargin ?? "0px",
      threshold: threshold ?? 1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();

          if (onVisible) {
            onVisible();
          }
        }
      });
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, ref, onVisible]);

  return <div ref={ref}>{isVisible ? children : null}</div>;
};

export default LazyRender;
