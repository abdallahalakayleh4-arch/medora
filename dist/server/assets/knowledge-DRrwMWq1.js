import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AppShell } from "./AppShell-ChV9Eya4.js";
import "@tanstack/react-router";
import "lucide-react";
import "./router-DbyaQ_tD.js";
import "./use-medora-theme-BcdTr06G.js";
let knowledgeCache = null;
async function loadKnowledgeDatabase() {
  if (knowledgeCache) return knowledgeCache;
  const response = await fetch("/book_structured.json");
  if (!response.ok) {
    throw new Error("Failed to load knowledge database");
  }
  knowledgeCache = await response.json();
  return knowledgeCache;
}
function findFirstMatch(chapters, query) {
  const normalized = query.toLowerCase();
  for (const chapter of chapters) {
    if (chapter.content.toLowerCase().includes(normalized)) {
      return chapter;
    }
  }
  return null;
}
function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("Type at least 3 letters.");
  const onSearch = async (value) => {
    setQuery(value);
    const trimmed = value.trim();
    if (trimmed.length < 3) {
      setResult(null);
      setStatus("Type at least 3 letters.");
      return;
    }
    try {
      setStatus("Searching database...");
      const database = await loadKnowledgeDatabase();
      const found = findFirstMatch(database.chapters, trimmed);
      if (!found) {
        setResult(null);
        setStatus("No article found.");
        return;
      }
      setResult(found);
      setStatus("Match found.");
    } catch {
      setResult(null);
      setStatus("Failed to search database.");
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { title: "Clinical Search", subtitle: "Search the structured Medora knowledge database by disease, symptom, or treatment.", children: [
    /* @__PURE__ */ jsxs("section", { className: "medora-card", children: [
      /* @__PURE__ */ jsx("input", { className: "medora-input", value: query, onChange: (event) => onSearch(event.target.value), placeholder: "Search diseases, symptoms, or treatments" }),
      /* @__PURE__ */ jsx("p", { className: "medora-status", style: {
        marginTop: 10
      }, children: status })
    ] }),
    result && /* @__PURE__ */ jsxs("section", { className: "medora-card", style: {
      marginTop: 16
    }, children: [
      /* @__PURE__ */ jsxs("h3", { children: [
        "Chapter ",
        result.chapter
      ] }),
      /* @__PURE__ */ jsx("pre", { style: {
        whiteSpace: "pre-wrap",
        margin: 0
      }, children: result.content })
    ] })
  ] });
}
export {
  KnowledgePage as component
};
