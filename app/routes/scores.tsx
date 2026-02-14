import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import source from "../../scores.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { useAuthGuard } from "../lib/useAuthGuard";
import { usePageTitle } from "../lib/usePageTitle";

type ScoreEntry = {
  name: string;
  keywords: string[];
  html: string;
};

export const Route = createFileRoute("/scores")({
  component: ScoresPage,
});

function ScoresPage() {
  usePageTitle("Medora | Medical Scores Library");
  useAuthGuard();

  const { styles, body, scores } = useMemo(() => {
    const extracted = extractHtml(source);
    const scoresMatch = source.match(/const scores = (\[[\s\S]*?\n\]);/);
    const scoresData = scoresMatch
      ? (new Function(`return ${scoresMatch[1]};`)() as ScoreEntry[])
      : [];

    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
      scores: scoresData,
    };
  }, []);

  useEffect(() => {
    const search = document.getElementById("search") as HTMLInputElement | null;
    const modal = document.getElementById("modal") as HTMLElement | null;
    const content = document.getElementById("content") as HTMLElement | null;
    const suggestions = document.getElementById("suggestions") as HTMLElement | null;

    if (!search || !modal || !content || !suggestions) {
      return undefined;
    }

    const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

    const openModal = (score: ScoreEntry) => {
      content.innerHTML = `<h2>${score.name}</h2>${score.html}`;
      modal.style.display = "flex";
    };

    const closeModal = () => {
      modal.style.display = "none";
    };

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const query = normalize(target.value);

      suggestions.innerHTML = "";
      if (!query) {
        suggestions.style.display = "none";
        return;
      }

      const matches = scores.filter((score) => {
        return normalize(score.name).includes(query) || normalize(score.keywords.join(" ")).includes(query);
      });

      if (!matches.length) {
        suggestions.style.display = "none";
        return;
      }

      suggestions.style.display = "block";
      matches.forEach((score) => {
        const suggestion = document.createElement("div");
        suggestion.className = "suggestion";
        suggestion.textContent = score.name;
        suggestion.onclick = () => {
          openModal(score);
          suggestions.style.display = "none";
        };
        suggestions.appendChild(suggestion);
      });
    };

    window.closeModal = closeModal;
    search.addEventListener("input", handleInput);

    return () => {
      window.closeModal = undefined;
      search.removeEventListener("input", handleInput);
    };
  }, [scores]);

  return (
    <>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
