import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { l as login, s as signup, a as logout } from "./router-DbyaQ_tD.js";
import { u as useMedoraTheme } from "./use-medora-theme-BcdTr06G.js";
function LoginPage() {
  const navigate = useNavigate();
  const {
    theme,
    onToggleTheme
  } = useMedoraTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const runAction = async (action) => {
    try {
      if (action === "login") {
        await login(email, password);
        navigate({
          to: "/dashboard"
        });
      } else if (action === "signup") {
        await signup(email, password);
        navigate({
          to: "/dashboard"
        });
      } else {
        await logout();
        setStatus("Logged out");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unexpected error");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "medora-center-page", children: /* @__PURE__ */ jsxs("div", { className: "medora-auth-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "medora-inline", style: {
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsx("h1", { children: "Medora Login" }),
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: onToggleTheme, children: theme === "morning" ? "ICU mode" : "Morning mode" })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Authenticate with Firebase to access your workspace." }),
    /* @__PURE__ */ jsxs("div", { className: "medora-stack", children: [
      /* @__PURE__ */ jsx("input", { className: "medora-input", type: "email", value: email, onChange: (event) => setEmail(event.target.value), placeholder: "Email" }),
      /* @__PURE__ */ jsx("input", { className: "medora-input", type: "password", value: password, onChange: (event) => setPassword(event.target.value), placeholder: "Password" }),
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-primary", onClick: () => runAction("login"), children: "Login" }),
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: () => runAction("signup"), children: "Create Account" }),
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: () => runAction("logout"), children: "Logout" }),
      /* @__PURE__ */ jsx("p", { className: "medora-status", children: status })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
