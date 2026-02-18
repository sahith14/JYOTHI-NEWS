import Link from "next/link";
import { allSectors, allYears, filterArticles } from "@/lib/cases";

type HomePageProps = {
  searchParams: Promise<{
    q?: string;
    year?: string;
    sector?: string;
  }>;
};

function FilterPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-sm transition ${
        active ? "border-black bg-black text-white" : "border-zinc-300 hover:border-zinc-500"
      }`}
    >
      {label}
    </Link>
  );
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const year = params.year ? Number(params.year) : undefined;
  const sector = params.sector;

  const visibleArticles = filterArticles({
    query,
    year: Number.isNaN(year) ? undefined : year,
    sector,
  });

  const resetHref = "/";

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-8 md:px-10">
      <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-zinc-500">Jyothi News</p>
          <h1 className="text-3xl font-bold md:text-4xl">Case Studies</h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Explore all reports with dynamic filters, category navigation, and dedicated article pages.
          </p>
        </div>
        <Link href="/admin" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100">
          Open Admin Panel
        </Link>
      </header>

      <section className="mb-6 rounded-xl border border-zinc-200 p-4 md:p-5">
        <form className="grid gap-3 md:grid-cols-4">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search by title, tag, author..."
            className="md:col-span-2 rounded-lg border border-zinc-300 px-3 py-2"
          />
          <select name="year" defaultValue={params.year ?? ""} className="rounded-lg border border-zinc-300 px-3 py-2">
            <option value="">All years</option>
            {allYears.map((itemYear) => (
              <option key={itemYear} value={itemYear}>
                {itemYear}
              </option>
            ))}
          </select>
          <select
            name="sector"
            defaultValue={sector ?? ""}
            className="rounded-lg border border-zinc-300 px-3 py-2"
          >
            <option value="">All sectors</option>
            {allSectors.map((itemSector) => (
              <option key={itemSector} value={itemSector}>
                {itemSector}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-lg bg-black px-4 py-2 text-white hover:bg-zinc-800">
            Apply Filters
          </button>
          <Link href={resetHref} className="rounded-lg border border-zinc-300 px-4 py-2 text-center hover:bg-zinc-100">
            Reset
          </Link>
        </form>
      </section>

      <section className="mb-7">
        <h2 className="mb-3 text-lg font-semibold">Category Navigation</h2>
        <div className="flex flex-wrap gap-2">
          <FilterPill href="/" label="All" active={!sector} />
          {allSectors.map((itemSector) => {
            const href = `/?${new URLSearchParams({
              ...(query ? { q: query } : {}),
              ...(params.year ? { year: params.year } : {}),
              sector: itemSector,
            }).toString()}`;
            return <FilterPill key={itemSector} href={href} label={itemSector} active={sector === itemSector} />;
          })}
        </div>
        </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{visibleArticles.length} articles found</h2>
        {visibleArticles.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 p-4 text-zinc-600">
            No matches found. Try changing search text or filters.
          </p>
        ) : (
          visibleArticles.map((article) => (
            <article key={article.id} className="rounded-xl border border-zinc-200 p-4 shadow-sm">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span>{article.year}</span>
                <span>•</span>
                <span>{article.sector}</span>
                <span>•</span>
                <span>By {article.author}</span>
              </div>
              <h3 className="text-xl font-semibold">
                <Link href={`/case/${article.id}`} className="hover:underline">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2 text-zinc-700">{article.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
