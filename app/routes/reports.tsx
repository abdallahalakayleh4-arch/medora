import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import source from "../../reports.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { usePageTitle } from "../lib/usePageTitle";

const reports = {
  harvard: {
    logo: "[https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png](https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png)",
    subtitle: "HMX Online Learning",
    title: "Harvard Medical School",
    content: `
      <div class="report-content">
        <h3>1. Program Overview</h3>
        <p>The <strong>HMX Online Learning</strong> program from <strong>Harvard Medical School</strong> provides in-depth foundational training in biomedical sciences.</p>

        <h3>2. Immunology Fundamentals</h3>
        <p>This course explores innate and adaptive immune responses, immune system regulation, and dysfunction.</p>

        <h3>3. Physiology Fundamentals</h3>
        <p>Covers core principles of homeostasis, cardiovascular and respiratory regulation, fluid balance and acid–base physiology.</p>
      </div>
    `,
    link: "[https://learn.hms.harvard.edu](https://learn.hms.harvard.edu)",
  },
  stanford: {
    logo: "[https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png)",
    subtitle: "Health & Professional Education",
    title: "Stanford University",
    content: `
      <div class="report-content">
        <h3>1. Stanford Online</h3>
        <p>Stanford Online is the main hub for free and paid online courses in health, healthcare systems, and public health.</p>

        <h3>2. Center for Health Education</h3>
        <p>Offers professional certificates in topics like Machine Learning in Medicine and Medical Teaching.</p>
      </div>
    `,
    link: "[https://online.stanford.edu](https://online.stanford.edu)",
  },
  coursera: {
    logo: "[https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1200px-Coursera-Logo_600x600.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1200px-Coursera-Logo_600x600.svg.png)",
    subtitle: "Academic Partner Platform",
    title: "Coursera for Medical Students",
    content: `
      <div class="report-content">
        <p>Coursera partners with leading universities to offer structured courses useful for medical students.</p>
        <h3>Popular Courses</h3>
        <ul>
          <li><strong>Epidemiology</strong> – Johns Hopkins University</li>
          <li><strong>Medical Neuroscience</strong> – Duke University</li>
        </ul>
      </div>
    `,
    link: "[https://www.coursera.org](https://www.coursera.org)",
  },
} as const;

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  usePageTitle("Medora | Global Medical Courses & Reports");

  const { styles, body } = useMemo(() => {
    const extracted = extractHtml(source);
    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
    };
  }, []);

  useEffect(() => {
    const modal = document.getElementById("reportModal") as HTMLElement | null;
    const bodyEl = document.getElementById("reportBody") as HTMLElement | null;

    if (!modal || !bodyEl) {
      return undefined;
    }

    const openReport = (id: keyof typeof reports) => {
      const data = reports[id];
      if (!data) return;

      bodyEl.innerHTML = `
        <div class="report-main-header">
          <img src="${data.logo}" class="report-main-logo" alt="Logo">
          <div class="report-title-area">
            <h4>${data.subtitle}</h4>
            <h1>${data.title}</h1>
          </div>
        </div>
        ${data.content}
        <div class="report-footer-actions">
          <a href="${data.link}" target="_blank" class="btn-primary">Visit Official Institution <i class="fas fa-external-link-alt"></i></a>
        </div>
      `;

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    };

    const closeReport = () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeReport();
    };

    window.openReport = (id: string) => openReport(id as keyof typeof reports);
    window.closeReport = closeReport;
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.openReport = undefined;
      window.closeReport = undefined;
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
