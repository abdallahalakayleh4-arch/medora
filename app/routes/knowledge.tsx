import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import source from "../../knowledge.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { usePageTitle } from "../lib/usePageTitle";

type Chapter = {
  chapter: number;
  content: string;
};

type MedicalDatabase = {
  chapters: Chapter[];
};

export const Route = createFileRoute("/knowledge")({
  component: KnowledgePage,
});

function KnowledgePage() {
  usePageTitle("Medora IQ | Clinical Search");

  const { styles, body } = useMemo(() => {
    const extracted = extractHtml(source);
    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
    };
  }, []);

  useEffect(() => {
    let medicalDB: MedicalDatabase | null = null;
    const loader = document.getElementById("loader") as HTMLElement | null;
    const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
    const resultsArea = document.getElementById("resultsArea") as HTMLElement | null;

    if (!loader || !searchInput || !resultsArea) {
      return undefined;
    }

    const loadDataIfNeeded = async () => {
      if (medicalDB) return;

      loader.style.display = "block";
      const response = await fetch("/book_structured.json");
      medicalDB = (await response.json()) as MedicalDatabase;
      loader.style.display = "none";
    };

    const handleInput = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const query = target.value.trim().toLowerCase();

      if (query.length < 3) {
        resultsArea.innerHTML = `
          <div class="no-results">
            <p>Type at least 3 letters.</p>
          </div>`;
        return;
      }

      await loadDataIfNeeded();

      const foundArticle = medicalDB?.chapters.find((chapter) =>
        chapter.content.toLowerCase().includes(query),
      );

      if (!foundArticle) {
        resultsArea.innerHTML = `
          <div class="no-results">
            <p>No article found.</p>
          </div>`;
        return;
      }

      resultsArea.innerHTML = `
        <div class="result-item">
          <span class="med-header">Chapter ${foundArticle.chapter}</span>
          <pre class="med-paragraph" style="white-space: pre-wrap;">${foundArticle.content}</pre>
        </div>`;
    };

    searchInput.addEventListener("input", handleInput);

    return () => {
      searchInput.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
