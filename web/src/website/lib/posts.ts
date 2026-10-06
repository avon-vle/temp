export type BlogPostMeta = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly category: string | null;
  readonly description: string | null;
  readonly draft: boolean;
};

export type BlogPost = BlogPostMeta & {
  readonly content: string;
};

type Frontmatter = {
  readonly title?: string;
  readonly date?: string;
  readonly category?: string;
  readonly description?: string;
  readonly draft?: string;
};

const postModules = import.meta.glob("../posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/u;

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseFrontmatter(raw: string): {
  readonly data: Frontmatter;
  readonly content: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/u.exec(raw);

  if (match === null) {
    return { content: raw, data: {} };
  }

  const frontmatterBlock = match[1] ?? "";
  const body = match[2] ?? "";
  const data: Record<string, string> = {};

  for (const line of frontmatterBlock.split(/\r?\n/u)) {
    const trimmed = line.trim();

    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf(":");

    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = stripQuotes(trimmed.slice(separator + 1).trim());

    if (key.length > 0) {
      data[key] = value;
    }
  }

  return {
    content: body.replace(/^\r?\n/u, ""),
    data: data as Frontmatter,
  };
}

function slugFromPath(path: string): string | null {
  const match = /\/([^/]+)\.md$/u.exec(path);
  const slug = match?.[1];

  if (slug === undefined || slug.startsWith("_")) {
    return null;
  }

  return slug;
}

function parsePost(path: string, raw: string): BlogPost | null {
  const slug = slugFromPath(path);

  if (slug === null) {
    return null;
  }

  const { content, data } = parseFrontmatter(raw);
  const title = data.title?.trim();
  const date = data.date?.trim();

  if (title === undefined || title.length === 0) {
    return null;
  }

  if (date === undefined || !ISO_DATE.test(date)) {
    return null;
  }

  const draftValue = data.draft?.trim().toLowerCase();
  const draft =
    draftValue === "true" || draftValue === "yes" || draftValue === "1";

  return {
    category: data.category?.trim() || null,
    content,
    date,
    description: data.description?.trim() || null,
    draft,
    slug,
    title,
  };
}

function comparePostsByDateDesc(a: BlogPostMeta, b: BlogPostMeta): number {
  if (a.date === b.date) {
    return a.slug.localeCompare(b.slug);
  }

  return a.date < b.date ? 1 : -1;
}

const allPosts: readonly BlogPost[] = Object.entries(postModules)
  .map(([path, raw]) => parsePost(path, raw))
  .filter((post): post is BlogPost => post !== null)
  .sort(comparePostsByDateDesc);

export function getPublishedPosts(): readonly BlogPost[] {
  return allPosts.filter((post) => !post.draft);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function formatPostDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);

  if (
    year === undefined ||
    month === undefined ||
    day === undefined ||
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day)
  ) {
    return isoDate;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(date);
}
