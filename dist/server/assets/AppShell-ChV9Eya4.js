import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Moon, Sun, LogOut } from "lucide-react";
import { o as observeAuth, a as logout } from "./router-DbyaQ_tD.js";
import { u as useMedoraTheme } from "./use-medora-theme-BcdTr06G.js";
function AppShell({ title, subtitle, children }) {
  const navigate = useNavigate();
  const { theme, onToggleTheme } = useMedoraTheme();
  const [emailLabel, setEmailLabel] = useState("Med Student");
  useEffect(() => {
    return observeAuth((user) => {
      if (user?.email) {
        setEmailLabel(user.email.split("@")[0]);
      }
    });
  }, []);
  const onLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "medora-page", children: [
    /* @__PURE__ */ jsxs("header", { className: "medora-top-nav", children: [
      /* @__PURE__ */ jsxs("div", { className: "medora-brand", children: [
        /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "medora-logo", "aria-label": "Medora home", children: "M" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { children: "MEDORA" }),
          /* @__PURE__ */ jsx("p", { children: title })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "medora-nav-links", children: [
        /* @__PURE__ */ jsx(Link, { to: "/dashboard", activeProps: { className: "active" }, children: "Dashboard" }),
        /* @__PURE__ */ jsx(Link, { to: "/reports", activeProps: { className: "active" }, children: "Reports" }),
        /* @__PURE__ */ jsx(Link, { to: "/scores", activeProps: { className: "active" }, children: "Scores" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "medora-nav-actions", children: [
        /* @__PURE__ */ jsxs("button", { className: "medora-btn medora-btn-secondary", onClick: onToggleTheme, children: [
          theme === "morning" ? /* @__PURE__ */ jsx(Moon, { size: 16 }) : /* @__PURE__ */ jsx(Sun, { size: 16 }),
          theme === "morning" ? "ICU mode" : "Morning mode"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "medora-user-chip", children: [
          "@",
          emailLabel
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "medora-btn medora-btn-danger", onClick: onLogout, children: [
          /* @__PURE__ */ jsx(LogOut, { size: 16 }),
          "Logout"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "medora-main", children: [
      /* @__PURE__ */ jsxs("section", { className: "medora-hero", children: [
        /* @__PURE__ */ jsx("h2", { children: title }),
        /* @__PURE__ */ jsx("p", { children: subtitle })
      ] }),
      children
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "medora-bottom-nav", children: [
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", activeProps: { className: "active" }, children: "Dashboard" }),
      /* @__PURE__ */ jsx(Link, { to: "/todo", activeProps: { className: "active" }, children: "To-Do" }),
      /* @__PURE__ */ jsx(Link, { to: "/timer", activeProps: { className: "active" }, children: "Timer" }),
      /* @__PURE__ */ jsx(Link, { to: "/scores", activeProps: { className: "active" }, children: "Scores" })
    ] })
  ] });
}
export {
  AppShell as A
};
