import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function LandingPage() {
  return /* @__PURE__ */ jsx("div", { className: "medora-center-page", children: /* @__PURE__ */ jsxs("div", { className: "medora-landing-card", children: [
    /* @__PURE__ */ jsx("h1", { children: "Medora" }),
    /* @__PURE__ */ jsx("p", { children: "Medical Student Productivity Hub" }),
    /* @__PURE__ */ jsx("div", { className: "medora-stack", children: /* @__PURE__ */ jsx(Link, { className: "medora-btn medora-btn-primary", to: "/login", children: "Login / Sign Up" }) })
  ] }) });
}
export {
  LandingPage as component
};
