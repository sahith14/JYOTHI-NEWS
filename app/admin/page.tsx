"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { allSectors, allYears } from "@/lib/cases";

type DraftArticle = {
  id: string;
  title: string;
  summary: string;
  sector: string;
  year: number;
};

const STORAGE_KEY = "jyothi-admin-drafts";

export default function AdminPage() {
  const [drafts, setDrafts] = useState<DraftArticle[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const rawDrafts = window.localStorage.getItem(STORAGE_KEY);
    if (!rawDrafts) {
      return [];
    }

    try {
      return JSON.parse(rawDrafts) as DraftArticle[];
    } catch {
      return [];
    }
  });
  const [statusMessage, setStatusMessage] = useState("");
  const latestYear = allYears[0] ?? new Date().getFullYear();

  function persist(nextDrafts: DraftArticle[]) {
    setDrafts(nextDrafts);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const id = String(form.get("id") ?? "").trim();
    const title = String(form.get("title") ?? "").trim();
    const summary = String(form.get("summary") ?? "").trim();
    const sector = String(form.get("sector") ?? "").trim();
    const year = Number(String(form.get("year") ?? ""));

    if (!id || !title || !summary || !sector || Number.isNaN(year)) {
      setStatusMessage("Please fill in all fields correctly.");
      return;
    }

    const nextDraft: DraftArticle = { id, title, summary, sector, year };
    const withoutDuplicate = drafts.filter((draft) => draft.id !== id);
    const nextDrafts = [nextDraft, ...withoutDuplicate];
    persist(nextDrafts);
    setStatusMessage(`Draft ${id} saved to local admin queue.`);
    event.currentTarget.reset();
  }

  function deleteDraft(id: string) {
    const nextDrafts = drafts.filter((draft) => draft.id !== id);
    persist(nextDrafts);
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-8 md:px-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-zinc-500">Admin</p>
          <h1 className="text-3xl font-bold">Article Admin Panel</h1>
          <p className="mt-2 text-zinc-600">Manage draft queue entries before sending them to your backend CMS.</p>
        </div>
        <Link href="/" className="rounded-lg border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100">
          Back to site
        </Link>
      </div>

      <section className="mb-6 rounded-xl border border-zinc-200 p-5">
        <h2 className="mb-4 text-lg font-semibold">Create / Update Draft</h2>
        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
          <input name="id" placeholder="article-id" className="rounded-lg border border-zinc-300 px-3 py-2" required />
          <input name="title" placeholder="Title" className="rounded-lg border border-zinc-300 px-3 py-2" required />
          <textarea
            name="summary"
            placeholder="Short summary"
            className="md:col-span-2 min-h-24 rounded-lg border border-zinc-300 px-3 py-2"
            required
          />
          <select name="sector" className="rounded-lg border border-zinc-300 px-3 py-2" defaultValue="" required>
            <option value="" disabled>
              Select sector
            </option>
            {allSectors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select name="year" className="rounded-lg border border-zinc-300 px-3 py-2" defaultValue={String(latestYear)} required>
            {allYears.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button type="submit" className="md:col-span-2 rounded-lg bg-black px-4 py-2 text-white hover:bg-zinc-800">
            Save Draft
          </button>
        </form>
        {statusMessage ? <p className="mt-3 text-sm text-zinc-600">{statusMessage}</p> : null}
      </section>

      <section className="rounded-xl border border-zinc-200 p-5">
        <h2 className="mb-4 text-lg font-semibold">Draft Queue ({drafts.length})</h2>
        {drafts.length === 0 ? (
          <p className="text-zinc-600">No drafts yet. Add one above.</p>
        ) : (
          <ul className="space-y-3">
            {drafts.map((draft) => (
              <li key={draft.id} className="rounded-lg border border-zinc-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{draft.title}</p>
                    <p className="text-sm text-zinc-500">ID: {draft.id}</p>
                    <p className="mt-1 text-sm text-zinc-700">{draft.summary}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {draft.sector} • {draft.year}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteDraft(draft.id)}
                    className="rounded border border-red-300 px-2 py-1 text-xs text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
