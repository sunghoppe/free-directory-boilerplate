import { notFound } from "next/navigation";
import { allAuthors, allPosts } from "contentlayer/generated";

import { Mdx } from "@/components/content/mdx-components";

import "@/styles/mdx.css";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { env } from "@/env.mjs";
import { absoluteUrl, cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { DashboardTableOfContents } from "@/components/shared/toc";
import { getTableOfContents } from "@/lib/toc";
import { i18n } from "@/languages.js";
import { AllBlogConfigs } from "@/config/blog";

interface PostPageProps {
  params: {
    lang: string;
    slug: string[];
  }
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;
  console.log('post url', url);
  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", post.title);
  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.flatMap((post) => 
    i18n.languages.map((locale) => ({
      lang: locale.id,
      slug: post.slugAsParams.split("/"),
    }))
  );
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang } = params;
  const blogConfig = AllBlogConfigs[lang];
  const post = await getPostFromParams(params);
  if (!post) {
    return notFound();
  }

  const toc = await getTableOfContents(post.body.raw);
  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article className="container relative max-w-4xl py-6 lg:py-10">
      <Link
        href={`/${lang}/blog`}
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        {blogConfig.backToList}
      </Link>
      <div>
        <h1 className="mt-2 inline-block text-balance font-heading text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center justify-between">
          {authors?.length ? (
            <div className="flex space-x-4">
              {authors.map((author) =>
                author ? (
                  <Link
                    key={author._id}
                    href={`https://x.com/${author.twitter}`}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <Image
                      src={author.avatar}
                      alt={author.title}
                      width={42}
                      height={42}
                      className="rounded-full bg-white"
                    />
                    <div className="flex-1 text-left leading-tight space-y-1">
                      <p className="font-medium">{author.title}</p>
                      <p className="text-[12px] text-muted-foreground">
                        @{author.twitter}
                      </p>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          ) : null}

          {post.date && (
            <time
              dateTime={post.date}
              className="block text-sm text-muted-foreground"
            >
              {formatDate(post.date)}
            </time>
          )}
        </div>
      </div>

      <Mdx code={post.body.code} />
      
      <hr className="mt-12" />

      <div className="flex justify-center py-6 lg:py-10">
        <Link href={`/${lang}/blog`} className={cn(buttonVariants({ variant: "secondary" }))}>
          <Icons.chevronLeft className="mr-2 size-4" />
          {blogConfig.backToList}
        </Link>
      </div>

      <div className="hidden text-sm lg:block">
        <div className="sticky top-24 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </article>
  )
}
