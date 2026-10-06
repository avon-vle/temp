import { BlogShell } from "../components/blog/BlogShell";
import { MarkdownContent } from "../components/blog/MarkdownContent";
import { WebsiteLink } from "../components/WebsiteLink";
import { formatPostDate, getPostBySlug } from "../lib/posts";
import { blogPath } from "../lib/routes";

export const BlogPostPage = ({ slug }: { readonly slug: string }) => {
  const post = getPostBySlug(slug);

  if (post === undefined) {
    return (
      <BlogShell ariaLabel="Post not found">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-stone-500">
            Blog
          </p>
          <h1 className="avon-blog-display mt-3 font-medium tracking-tight text-stone-950">
            Post not found
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600">
            That post does not exist or is still a draft.
          </p>
          <WebsiteLink
            className="mt-8 inline-flex text-sm font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-950 hover:decoration-stone-500"
            href={blogPath}
          >
            Back to blog
          </WebsiteLink>
        </div>
      </BlogShell>
    );
  }

  return (
    <BlogShell ariaLabel={post.title}>
      <article className="mx-auto max-w-2xl">
        <header className="text-center">
          {post.category !== null ? (
            <p className="text-sm font-medium tracking-wide text-stone-500">
              {post.category}
            </p>
          ) : null}
          <h1
            className={`avon-blog-display font-medium tracking-tight text-stone-950 ${
              post.category !== null ? "mt-4" : ""
            }`}
          >
            {post.title}
          </h1>
          <time
            className="mt-5 block text-sm text-stone-500"
            dateTime={post.date}
          >
            {formatPostDate(post.date)}
          </time>
        </header>

        <div className="mt-12 sm:mt-14">
          <MarkdownContent content={post.content} />
        </div>

        <footer className="mt-14 border-t border-stone-200 pt-8 sm:mt-16">
          <WebsiteLink
            className="text-sm font-medium text-stone-600 no-underline transition-colors hover:text-stone-950"
            href={blogPath}
          >
            ← All posts
          </WebsiteLink>
        </footer>
      </article>
    </BlogShell>
  );
};
