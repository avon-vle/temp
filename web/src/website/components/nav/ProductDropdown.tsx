import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown } from "lucide";
import { navProductItems } from "../../content/data";
import { useWebsiteTheme } from "../../context/WebsiteThemeContext";
import { renderLucideNodes } from "../../lib/icons";
import {
  navTheme,
  productDropdownPreviewTheme,
  productDropdownThemeClass,
  type NavTone,
} from "../../lib/navTheme";
import { FeatureVisual } from "../FeatureVisual";
import { WebsiteLink } from "../WebsiteLink";

const menuInsetClassName = "p-2";

const highlightClassName =
  "pointer-events-none absolute inset-x-1 rounded-lg bg-[var(--avon-dropdown-highlight)] transition-[top,height,opacity] duration-[250ms] ease-out motion-reduce:transition-none";

const dropdownPanelClassName = (
  dropdownThemeClass: string,
  floating: boolean,
) =>
  `avon-product-dropdown ${dropdownThemeClass} ${
    floating ? "avon-product-dropdown--floating" : ""
  } overflow-hidden rounded-lg border border-[var(--avon-dropdown-border)] bg-[var(--avon-dropdown-bg)] shadow-[var(--avon-dropdown-shadow)]`;

const dropdownPanelOpenClassName = "opacity-100";

const dropdownPanelClosedClassName = "opacity-0";

const dropdownPanelMotionClassName =
  "transition-opacity duration-200 ease-in-out motion-reduce:transition-none";

const DROPDOWN_MOTION_MS = 200;

export const ProductDropdown = ({
  tone = "hero",
}: {
  readonly tone?: NavTone;
}) => {
  const { resolvedTheme } = useWebsiteTheme();
  const theme = navTheme(tone, resolvedTheme);
  const dropdownThemeClass = productDropdownThemeClass(resolvedTheme);
  const previewTheme = productDropdownPreviewTheme(resolvedTheme);
  const navLinkClassName = `text-sm font-medium no-underline transition-colors ${theme.trigger}`;
  const floating = tone === "solid";
  const dropdownOffsetClassName = floating ? "pt-5" : "pt-3";
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [previewMotion, setPreviewMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [highlight, setHighlight] = useState({
    height: 0,
    opacity: 0,
    top: 0,
  });
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const updateHighlight = useCallback((index: number) => {
    const item = itemRefs.current[index];
    const list = listRef.current;

    if (!item || !list) {
      return;
    }

    setHighlight({
      height: item.offsetHeight,
      opacity: 1,
      top: item.offsetTop,
    });
  }, []);

  const focusItem = useCallback(
    (index: number) => {
      setActiveIndex(index);
      updateHighlight(index);
    },
    [updateHighlight],
  );

  const showDropdown = useCallback(() => {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }

    setOpen(true);

    previewTimerRef.current = setTimeout(() => {
      setPreviewMotion(true);
      previewTimerRef.current = null;
    }, DROPDOWN_MOTION_MS);
  }, []);

  const hideDropdown = useCallback(() => {
    setOpen(false);
    setPreviewMotion(false);

    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
      }
    },
    [],
  );

  useLayoutEffect(() => {
    if (!open) {
      setHighlight((current) => ({ ...current, opacity: 0 }));
      return;
    }

    updateHighlight(activeIndex);
  }, [activeIndex, open, updateHighlight]);

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          hideDropdown();
        }
      }}
      onFocus={showDropdown}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 border-0 bg-transparent p-0 ${navLinkClassName} ${open ? theme.triggerOpen : ""}`}
        type="button"
      >
        Product
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 opacity-80"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {renderLucideNodes(ChevronDown)}
        </svg>
      </button>

      <div
        aria-hidden={!open}
        className={`absolute left-0 top-full z-50 w-[min(40rem,calc(100vw-2rem))] ${dropdownOffsetClassName} ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`${dropdownPanelMotionClassName} ${
            open ? dropdownPanelOpenClassName : dropdownPanelClosedClassName
          }`}
        >
          <div
            className={dropdownPanelClassName(dropdownThemeClass, floating)}
            id={menuId}
            role="menu"
          >
            <div className="grid sm:min-h-[15.5rem] sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:items-stretch">
              <div
                className={`relative border-b border-[var(--avon-dropdown-border)] ${menuInsetClassName} sm:border-b-0 sm:border-r`}
                ref={listRef}
              >
                <div
                  aria-hidden="true"
                  className={highlightClassName}
                  style={{
                    height: highlight.height,
                    opacity: highlight.opacity,
                    top: highlight.top,
                  }}
                />
                {navProductItems.map((item, index) => (
                  <WebsiteLink
                    className="relative z-10 block rounded-lg px-3 py-2.5 no-underline outline-none transition-colors focus-visible:text-[var(--avon-dropdown-focus-text)]"
                    href={item.href}
                    key={item.title}
                    onClick={hideDropdown}
                    onFocus={() => {
                      focusItem(index);
                    }}
                    onMouseEnter={() => {
                      focusItem(index);
                    }}
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    role="menuitem"
                  >
                    <span className="block text-sm font-medium text-[var(--avon-dropdown-title)]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-4 text-[var(--avon-dropdown-desc)]">
                      {item.description}
                    </span>
                  </WebsiteLink>
                ))}
              </div>

              <div className="relative min-h-[11rem] bg-[var(--avon-dropdown-preview-bg)] sm:min-h-[15.5rem]">
                {navProductItems.map((item, index) => (
                  <div
                    aria-hidden={index !== activeIndex}
                    className={`absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-[var(--avon-dropdown-preview-panel-bg)] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                      index === activeIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                    key={item.kind}
                  >
                    <FeatureVisual
                      animate={previewMotion && index === activeIndex}
                      kind={item.kind}
                      previewTheme={previewTheme}
                      variant="nav"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
