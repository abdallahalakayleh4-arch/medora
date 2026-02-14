import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { A as AppShell } from "./AppShell-ChV9Eya4.js";
import { g as getCurrentUserAsync } from "./router-DbyaQ_tD.js";
import { s as subscribeTodos } from "./firestore-CqlAScbJ.js";
import "lucide-react";
import "./use-medora-theme-BcdTr06G.js";
function DashboardPage() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    let unsub;
    getCurrentUserAsync().then((user) => {
      if (!user) return;
      unsub = subscribeTodos(user.uid, (items) => {
        setTodos(items.slice(0, 3));
      });
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);
  const todoPreview = useMemo(() => {
    if (todos.length === 0) return /* @__PURE__ */ jsx("p", { children: "No tasks yet." });
    return /* @__PURE__ */ jsx("ul", { className: "medora-list", children: todos.map((todo) => /* @__PURE__ */ jsx("li", { className: "medora-list-item", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("b", { children: todo.completed ? "✓" : "○" }),
      " ",
      todo.text
    ] }) }, todo.id)) });
  }, [todos]);
  return /* @__PURE__ */ jsx(AppShell, { title: "Doctor in Progress", subtitle: "Your centralized clinical hub for productivity, calculations, and evidence-based knowledge.", children: /* @__PURE__ */ jsxs("div", { className: "medora-grid medora-grid-3", children: [
    /* @__PURE__ */ jsx(FeatureCard, { to: "/todo", title: "To-Do Performance", description: "Sync rounds, lectures, and daily goals with priorities.", children: todoPreview }),
    /* @__PURE__ */ jsx(FeatureCard, { to: "/timer", title: "Deep Study Timer", description: "Pomodoro sessions for high-intensity medical focus.", children: /* @__PURE__ */ jsx("div", { className: "medora-progress", children: "25:00" }) }),
    /* @__PURE__ */ jsx(FeatureCard, { to: "/scores", title: "Medical Scores", description: "Quick reference for validated clinical scores.", children: /* @__PURE__ */ jsxs("div", { className: "medora-inline", children: [
      /* @__PURE__ */ jsx("span", { className: "medora-user-chip", children: "GCS" }),
      /* @__PURE__ */ jsx("span", { className: "medora-user-chip", children: "APGAR" }),
      /* @__PURE__ */ jsx("span", { className: "medora-user-chip", children: "CURB-65" })
    ] }) }),
    /* @__PURE__ */ jsx(FeatureCard, { to: "/calculators", title: "Med Calculators", description: "Precise calculators for core clinical equations.", children: /* @__PURE__ */ jsx("p", { className: "medora-code", children: "BMI, eGFR, MAP, MELD, NIHSS" }) }),
    /* @__PURE__ */ jsx(FeatureCard, { to: "/reports", title: "Global Certifications", description: "Training reports from top institutions.", children: /* @__PURE__ */ jsx("p", { children: "Harvard, Stanford, Coursera reports included." }) }),
    /* @__PURE__ */ jsx(FeatureCard, { to: "/knowledge", title: "Medora Knowledge", description: "Search the structured clinical knowledge base.", children: /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-primary", children: "Access Knowledge" }) })
  ] }) });
}
function FeatureCard({
  to,
  title,
  description,
  children
}) {
  return /* @__PURE__ */ jsxs(Link, { to, className: "medora-card", style: {
    textDecoration: "none"
  }, children: [
    /* @__PURE__ */ jsx("h3", { children: title }),
    /* @__PURE__ */ jsx("p", { children: description }),
    children
  ] });
}
export {
  DashboardPage as component
};
