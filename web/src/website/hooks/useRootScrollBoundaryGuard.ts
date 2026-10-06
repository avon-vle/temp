import { useEffect } from "react";

const BOUNDARY_TOLERANCE_PX = 1;
const MOMENTUM_CLAMP_MAX_FRAMES = 90;

const getScrollingElement = () => document.scrollingElement;

const getMaxRootScroll = () => {
  const scrollingElement = getScrollingElement();

  if (!scrollingElement) {
    return 0;
  }

  return Math.max(
    0,
    scrollingElement.scrollHeight - scrollingElement.clientHeight,
  );
};

const clampRootScroll = () => {
  const scrollingElement = getScrollingElement();

  if (!scrollingElement) {
    return false;
  }

  const maxScroll = getMaxRootScroll();
  let clamped = false;

  if (scrollingElement.scrollTop > maxScroll) {
    scrollingElement.scrollTop = maxScroll;
    clamped = true;
  } else if (scrollingElement.scrollTop < 0) {
    scrollingElement.scrollTop = 0;
    clamped = true;
  }

  return clamped;
};

const isRootAtBottom = () => {
  const scrollingElement = getScrollingElement();

  if (!scrollingElement) {
    return true;
  }

  return (
    scrollingElement.scrollTop >= getMaxRootScroll() - BOUNDARY_TOLERANCE_PX
  );
};

const canScrollRoot = (deltaY: number) => {
  const scrollingElement = getScrollingElement();

  if (!scrollingElement) {
    return false;
  }

  const maxScroll = getMaxRootScroll();

  if (maxScroll <= BOUNDARY_TOLERANCE_PX) {
    return false;
  }

  if (deltaY < 0) {
    return scrollingElement.scrollTop > BOUNDARY_TOLERANCE_PX;
  }

  if (deltaY > 0) {
    return scrollingElement.scrollTop < maxScroll - BOUNDARY_TOLERANCE_PX;
  }

  return true;
};

const canScrollNestedElement = (target: EventTarget | null, deltaY: number) => {
  if (!(target instanceof Element)) {
    return false;
  }

  for (
    let element: Element | null = target;
    element;
    element = element.parentElement
  ) {
    if (element === document.body || element === document.documentElement) {
      return false;
    }

    const style = window.getComputedStyle(element);
    const scrollableY =
      style.overflowY === "auto" ||
      style.overflowY === "scroll" ||
      style.overflowY === "overlay";

    if (!scrollableY || element.scrollHeight <= element.clientHeight) {
      continue;
    }

    if (deltaY < 0 && element.scrollTop > BOUNDARY_TOLERANCE_PX) {
      return true;
    }

    if (
      deltaY > 0 &&
      element.scrollTop <
        element.scrollHeight - element.clientHeight - BOUNDARY_TOLERANCE_PX
    ) {
      return true;
    }
  }

  return false;
};

const shouldPreventBottomBoundaryScroll = (
  target: EventTarget | null,
  deltaY: number,
) => {
  if (deltaY <= 0 || canScrollNestedElement(target, deltaY)) {
    return false;
  }

  return !canScrollRoot(deltaY) || isRootAtBottom();
};

export const useRootScrollBoundaryGuard = () => {
  useEffect(() => {
    let touchStartY: number | null = null;
    let momentumClampRaf: number | null = null;
    let momentumClampFrames = 0;

    const stopMomentumClamp = () => {
      if (momentumClampRaf !== null) {
        cancelAnimationFrame(momentumClampRaf);
        momentumClampRaf = null;
      }

      momentumClampFrames = 0;
      clampRootScroll();
    };

    const startMomentumClamp = () => {
      if (momentumClampRaf !== null) {
        momentumClampFrames = 0;
        return;
      }

      const chase = () => {
        clampRootScroll();
        momentumClampFrames += 1;

        if (momentumClampFrames < MOMENTUM_CLAMP_MAX_FRAMES) {
          momentumClampRaf = requestAnimationFrame(chase);
          return;
        }

        momentumClampRaf = null;
        momentumClampFrames = 0;
      };

      momentumClampRaf = requestAnimationFrame(chase);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || !event.cancelable) {
        return;
      }

      if (!shouldPreventBottomBoundaryScroll(event.target, event.deltaY)) {
        return;
      }

      event.preventDefault();
      clampRootScroll();

      if (event.deltaY > 0) {
        startMomentumClamp();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY;

      if (touchStartY === null || touchY === undefined || !event.cancelable) {
        return;
      }

      const deltaY = touchStartY - touchY;

      if (!shouldPreventBottomBoundaryScroll(event.target, deltaY)) {
        return;
      }

      event.preventDefault();
      clampRootScroll();
      startMomentumClamp();
    };

    const handleTouchEnd = () => {
      touchStartY = null;

      if (isRootAtBottom()) {
        startMomentumClamp();
      }
    };

    const handleScroll = () => {
      const clamped = clampRootScroll();

      if (clamped || isRootAtBottom()) {
        startMomentumClamp();
      }
    };

    document.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchstart", handleTouchStart, {
      capture: true,
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchend", handleTouchEnd, {
      capture: true,
      passive: true,
    });
    document.addEventListener("touchcancel", handleTouchEnd, {
      capture: true,
      passive: true,
    });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      stopMomentumClamp();
      document.removeEventListener("wheel", handleWheel, { capture: true });
      document.removeEventListener("touchstart", handleTouchStart, {
        capture: true,
      });
      document.removeEventListener("touchmove", handleTouchMove, {
        capture: true,
      });
      document.removeEventListener("touchend", handleTouchEnd, {
        capture: true,
      });
      document.removeEventListener("touchcancel", handleTouchEnd, {
        capture: true,
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
