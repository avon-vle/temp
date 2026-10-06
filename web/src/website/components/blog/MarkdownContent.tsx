import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { isInternalWebsitePath } from "../../lib/routes";
import { WebsiteLink } from "../WebsiteLink";

const components: Components = {
  a: ({ href, children }) => {
    if (href === undefined || href.length === 0) {
      return <span>{children}</span>;
    }

    if (isInternalWebsitePath(href)) {
      return (
        <WebsiteLink className="avon-blog-link" href={href}>
          {children}
        </WebsiteLink>
      );
    }

    return (
      <a
        className="avon-blog-link"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  },
};

export const MarkdownContent = ({ content }: { readonly content: string }) => (
  <div className="avon-blog-prose">
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  </div>
);
