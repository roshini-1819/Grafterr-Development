import { useCallback, useEffect, useMemo, useState } from 'react';


function resolveItemsPerView(itemsPerView) {
  if (typeof window === 'undefined') return itemsPerView.desktop;
  const w = window.innerWidth;
  if (w < 640) return itemsPerView.mobile;
  if (w < 1024) return itemsPerView.tablet;
  return itemsPerView.desktop;
}


export function useCarousel(total, options = {}) {
  const {
    itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
    swipeThreshold = 50,
  } = options;

  const [perView, setPerView] = useState(() => resolveItemsPerView(itemsPerView));
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);

  const maxIndex = Math.max(0, total - perView);
  const pageCount = maxIndex + 1;

  
  useEffect(() => {
    const handleResize = () => {
      const next = resolveItemsPerView(itemsPerView);
      setPerView((prev) => (prev === next ? prev : next));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, total - perView)));
  }, [perView, total]);

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const goTo = useCallback(
    (next) => {
      setIndex(() => Math.min(Math.max(next, 0), Math.max(0, total - perView)));
    },
    [total, perView]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  const onTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].clientX);
    setDragDeltaX(0);
  }, []);

  const onTouchMove = useCallback(
    (e) => {
      if (touchStartX === null) return;
      setDragDeltaX(e.touches[0].clientX - touchStartX);
    },
    [touchStartX]
  );

  const onTouchEnd = useCallback(() => {
    if (touchStartX === null) return;
    if (dragDeltaX <= -swipeThreshold) next();
    else if (dragDeltaX >= swipeThreshold) prev();
    setTouchStartX(null);
    setDragDeltaX(0);
  }, [touchStartX, dragDeltaX, swipeThreshold, next, prev]);

  const offsetPercent = useMemo(
    () => (index * 100) / perView,
    [index, perView]
  );

  return {
    index,
    perView,
    maxIndex,
    pageCount,
    canPrev,
    canNext,
    offsetPercent,
    isDragging: touchStartX !== null,
    dragDeltaX,
    prev,
    next,
    goTo,
    touchHandlers: { onTouchStart, onTouchMove, onTouchEnd },
  };
}

export default useCarousel;
