import { useEffect, useState, type RefObject } from "react";

const EDITOR_MOCK_HEIGHT_PX = 288;
const MAX_EDITOR_SCALE = 1.34;
const MIN_EDITOR_SCALE = 0.9;

export const useEditorPreviewScale = (
  ref: RefObject<HTMLDivElement | null>,
) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const update = () => {
      const { height } = element.getBoundingClientRect();

      if (height <= 0) {
        return;
      }

      const heightScale = height / EDITOR_MOCK_HEIGHT_PX;

      setScale(
        Math.min(Math.max(heightScale, MIN_EDITOR_SCALE), MAX_EDITOR_SCALE),
      );
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return scale;
};
