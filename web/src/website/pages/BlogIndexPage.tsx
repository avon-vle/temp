import { BlogShell } from "../components/blog/BlogShell";
import { WebsiteLink } from "../components/WebsiteLink";
import { formatPostDate, getPublishedPosts } from "../lib/posts";
import { blogPostPath } from "../lib/routes";

export const BlogIndexPage = () => {
  const posts = getPublishedPosts();

  return (
    <BlogShell ariaLabel="Avon blog">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium tracking-wide text-stone-500">Blog</p>
        <h1 className="avon-blog-display mt-3 font-medium tracking-tight text-stone-950">
          News and updates
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
          Product notes, announcements, and writing from the Avon team.
        </p>
      </header>

      <div className="mx-auto mt-14 max-w-2xl sm:mt-16">
        {posts.length === 0 ? (
          <p className="text-center text-sm text-stone-500">
            No posts yet. Add a Markdown file under{" "}
            <code className="rounded bg-stone-100 px-1.5 py-0.5 text-[0.9em]">
              apps/web/src/website/posts/
            </code>
            .
          </p>
        ) : (
          <ul className="divide-y divide-stone-200 border-y border-stone-200">
            {posts.map((post) => (
              <li key={post.slug}>
                <WebsiteLink
                  className="group flex flex-col gap-2 py-7 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  href={blogPostPath(post.slug)}
                >
                  <div className="min-w-0">
                    {post.category !== null ? (
                      <p className="text-xs font-medium tracking-wide text-stone-500">
                        {post.category}
                      </p>
                    ) : null}
                    <h2 className="mt-1 text-lg font-medium tracking-tight text-stone-950 transition-colors group-hover:text-stone-700 sm:text-xl">
                      {post.title}
                    </h2>
                    {post.description !== null ? (
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {post.description}
                      </p>
                    ) : null}
                  </div>
                  <time
                    className="shrink-0 text-sm text-stone-500"
                    dateTime={post.date}
                  >
                    {formatPostDate(post.date)}
                  </time>
                </WebsiteLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </BlogShell>
  );
};
