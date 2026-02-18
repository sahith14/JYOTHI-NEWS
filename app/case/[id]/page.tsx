import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleById } from "@/lib/cases";

type CasePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: "Article Not Found | Jyothi News",
      description: "The requested article does not exist.",
    };
  }

  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      type: "article",
      images: [{ url: article.heroImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.title,
      description: article.seo.description,
      images: [article.heroImage],
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-8 md:px-10">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
        ← Back to all case studies
      </Link>

      <article className="mt-4">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          <span>{article.year}</span>
          <span>•</span>
          <span>{article.sector}</span>
          <span>•</span>
          <span>{article.publishedAt}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">{article.title}</h1>
        <p className="mt-3 text-lg text-zinc-700">{article.summary}</p>
        <p className="mt-2 text-sm text-zinc-500">By {article.author}</p>

        <div className="relative mt-6 h-60 w-full overflow-hidden rounded-xl md:h-96">
          <Image src={article.heroImage} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" />
        </div>

        <div className="mt-6 space-y-4 text-zinc-800">
          {article.body.map((paragraph, index) => (
            <p key={index} className="leading-8">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
