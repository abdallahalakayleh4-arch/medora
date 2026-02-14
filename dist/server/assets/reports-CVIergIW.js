import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AppShell } from "./AppShell-ChV9Eya4.js";
import "@tanstack/react-router";
import "lucide-react";
import "./router-DbyaQ_tD.js";
import "./use-medora-theme-BcdTr06G.js";
const REPORTS = [
  {
    id: "harvard",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png",
    subtitle: "HMX Online Learning",
    title: "Harvard Medical School",
    summary: "HMX Online Learning: Immunology, Physiology, and Genetics fundamentals.",
    content: "<h3>Program Overview</h3><p>Harvard HMX delivers foundational biomedical science content for medical learners.</p><h3>Highlights</h3><ul><li>Immunology fundamentals</li><li>Physiology principles</li><li>Genetics foundations</li></ul>",
    link: "https://learn.hms.harvard.edu"
  },
  {
    id: "stanford",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png",
    subtitle: "Health & Professional Education",
    title: "Stanford University",
    summary: "AI in healthcare and health education courses through Stanford Online.",
    content: "<h3>Stanford Online</h3><p>Courses in medicine, public health, and technology for clinicians.</p><h3>Highlights</h3><ul><li>Machine Learning in Medicine</li><li>Medical teaching certificates</li></ul>",
    link: "https://online.stanford.edu"
  },
  {
    id: "coursera",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1200px-Coursera-Logo_600x600.svg.png",
    subtitle: "Academic Partner Platform",
    title: "Coursera for Medical Students",
    summary: "Epidemiology, neuroscience, and public health courses from partner institutions.",
    content: "<h3>Overview</h3><p>Structured medical-adjacent online courses from top universities.</p><h3>Popular Courses</h3><ul><li>Epidemiology - Johns Hopkins</li><li>Medical Neuroscience - Duke</li></ul>",
    link: "https://www.coursera.org"
  }
];
function ReportsPage() {
  const [activeId, setActiveId] = useState(null);
  const activeReport = REPORTS.find((report) => report.id === activeId) ?? null;
  return /* @__PURE__ */ jsxs(AppShell, { title: "Global Medical Courses & Reports", subtitle: "Curated reports from world-leading medical institutions.", children: [
    /* @__PURE__ */ jsx("div", { className: "medora-grid medora-grid-3", children: REPORTS.map((report) => /* @__PURE__ */ jsxs("button", { className: "medora-card", onClick: () => setActiveId(report.id), style: {
      textAlign: "left",
      cursor: "pointer"
    }, children: [
      /* @__PURE__ */ jsx("img", { src: report.image, alt: report.title, style: {
        width: "100%",
        height: 180,
        objectFit: "contain",
        borderRadius: 12
      } }),
      /* @__PURE__ */ jsx("h3", { children: report.title }),
      /* @__PURE__ */ jsx("p", { children: report.summary })
    ] }, report.id)) }),
    activeReport && /* @__PURE__ */ jsx("div", { className: "medora-modal", onClick: () => setActiveId(null), children: /* @__PURE__ */ jsxs("div", { className: "medora-modal-box", onClick: (event) => event.stopPropagation(), children: [
      /* @__PURE__ */ jsxs("div", { className: "medora-inline", style: {
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsx("h3", { children: activeReport.title }),
        /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: () => setActiveId(null), children: "Back" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "medora-status", children: activeReport.subtitle }),
      /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
        __html: activeReport.content
      } }),
      /* @__PURE__ */ jsx("a", { className: "medora-btn medora-btn-primary", href: activeReport.link, target: "_blank", rel: "noreferrer", children: "Visit Official Institution" })
    ] }) })
  ] });
}
export {
  ReportsPage as component
};
