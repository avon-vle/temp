import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useWebsiteNavigation } from "../context/WebsiteNavigationContext";
import { isInternalWebsitePath } from "../lib/routes";

export const WebsiteLink = forwardRef<
  HTMLAnchorElement,
  {
    readonly children: ReactNode;
    readonly href: string;
  } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">
>(function WebsiteLink({ children, href, onClick, ...props }, ref) {
  const { navigate } = useWebsiteNavigation();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || !isInternalWebsitePath(href)) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} ref={ref} {...props}>
      {children}
    </a>
  );
});
