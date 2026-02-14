import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import source from "../../dashboard.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { useAuthGuard } from "../lib/useAuthGuard";
import { usePageTitle } from "../lib/usePageTitle";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  usePageTitle("Medora | The Future of Medical Learning");
  useAuthGuard();

  const { styles, body } = useMemo(() => {
    const extracted = extractHtml(source);
    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", "morning");

    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");

    const updateTheme = (nextTheme: "morning" | "icu") => {
      document.body.setAttribute("data-theme", nextTheme);
      if (themeIcon) {
        themeIcon.className = nextTheme === "icu" ? "fas fa-moon" : "fas fa-sun";
      }
      if (themeText) {
        themeText.textContent = nextTheme === "icu" ? "ICU Night Mode" : "Morning Mode";
      }
      localStorage.setItem("medora-theme", nextTheme);
    };

    window.toggleTheme = () => {
      const currentTheme = document.body.getAttribute("data-theme") === "icu" ? "icu" : "morning";
      updateTheme(currentTheme === "icu" ? "morning" : "icu");
    };

    if (localStorage.getItem("medora-theme") === "icu") {
      updateTheme("icu");
    }

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".med-card"));
    const hoverHandlers = cards.map((card) => {
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const onLeave = () => {
        card.style.transform = "perspective(1000px) translateY(0) rotateX(0) rotateY(0)";
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      return { card, onMove, onLeave };
    });

    const loadDashboardTodos = () => {
      const previewContainer = document.getElementById("dashboard-todo-preview");
      if (!previewContainer) {
        return;
      }

      const todos = JSON.parse(localStorage.getItem("medora-todos") || "[]") as Array<{
        text: string;
        completed: boolean;
      }>;

      previewContainer.innerHTML = "";

      if (todos.length === 0) {
        previewContainer.innerHTML =
          "<div style='font-size:13px;color:var(--text-muted)'>No tasks yet</div>";
        return;
      }

      todos.slice(0, 3).forEach((todo) => {
        const item = document.createElement("div");
        item.className = "todo-item";
        item.innerHTML = `
          <i class="${todo.completed ? "fas fa-check-circle" : "far fa-circle"}"
             style="color: ${todo.completed ? "var(--accent)" : "var(--text-muted)"}"></i>
          ${todo.text}
        `;
        previewContainer.appendChild(item);
      });
    };

    loadDashboardTodos();

    return () => {
      window.toggleTheme = undefined;
      hoverHandlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
      document.body.removeAttribute("data-theme");
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
