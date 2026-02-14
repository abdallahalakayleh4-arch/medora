import { createRootRoute, HeadContent, Scripts, redirect, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
const appCss = "/assets/styles-T91iBkXV.css";
const Route$9 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Medora"
      }
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "TSS_CLIENT_OUTPUT_DIR": "dist/client", "TSS_DEV_SERVER": "false", "TSS_ROUTER_BASEPATH": "", "TSS_SERVER_FN_BASE": "/_serverFn/" };
const REQUIRED_KEYS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID"
];
function getFirebaseConfig() {
  const missing = REQUIRED_KEYS.filter((key) => !__vite_import_meta_env__[key]);
  if (missing.length > 0) {
    throw new Error(`Missing Firebase env vars: ${missing.join(", ")}`);
  }
  return {
    apiKey: void 0,
    authDomain: void 0,
    projectId: void 0,
    storageBucket: void 0,
    messagingSenderId: void 0,
    appId: void 0
  };
}
const SESSION_KEY = "medora-auth-session";
const listeners = /* @__PURE__ */ new Set();
function getStoredSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function setStoredSession(session) {
  if (typeof window === "undefined") return;
  if (session) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}
function toAuthUser(session) {
  if (!session) return null;
  return {
    uid: session.uid,
    email: session.email,
    displayName: session.displayName
  };
}
function notifyAuthSubscribers() {
  const user = getCurrentUser();
  listeners.forEach((listener) => listener(user));
}
async function authRequest(endpoint, email, password) {
  const { apiKey } = getFirebaseConfig();
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  );
  const data = await response.json();
  if (!response.ok || !data.localId || !data.idToken) {
    const message = data.error?.message ?? "Authentication failed";
    throw new Error(message);
  }
  const session = {
    uid: data.localId,
    email: data.email ?? null,
    displayName: data.displayName ?? null,
    idToken: data.idToken,
    refreshToken: data.refreshToken ?? null
  };
  setStoredSession(session);
  notifyAuthSubscribers();
  return toAuthUser(session);
}
function observeAuth(callback) {
  listeners.add(callback);
  callback(getCurrentUser());
  return () => {
    listeners.delete(callback);
  };
}
function getCurrentUser() {
  return toAuthUser(getStoredSession());
}
async function getCurrentUserAsync() {
  return getCurrentUser();
}
async function login(email, password) {
  return authRequest("signInWithPassword", email, password);
}
async function signup(email, password) {
  return authRequest("signUp", email, password);
}
async function logout() {
  setStoredSession(null);
  notifyAuthSubscribers();
}
function getAuthToken() {
  return getStoredSession()?.idToken ?? null;
}
async function requireAuth() {
  if (typeof window === "undefined") return;
  const user = await getCurrentUserAsync();
  if (!user) {
    throw redirect({
      to: "/login"
    });
  }
}
async function redirectIfAuthenticated() {
  if (typeof window === "undefined") return;
  const user = await getCurrentUserAsync();
  if (user) {
    throw redirect({
      to: "/dashboard"
    });
  }
}
const $$splitComponentImporter$8 = () => import("./todo-DpLV4txE.js");
const Route$8 = createFileRoute("/todo")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./timer-CFVLA3xo.js");
const Route$7 = createFileRoute("/timer")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./scores-Cpoxzbig.js");
const Route$6 = createFileRoute("/scores")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./reports-CVIergIW.js");
const Route$5 = createFileRoute("/reports")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./login-BHS2WOwr.js");
const Route$4 = createFileRoute("/login")({
  beforeLoad: async () => {
    await redirectIfAuthenticated();
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./knowledge-DRrwMWq1.js");
const Route$3 = createFileRoute("/knowledge")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard-Be1kZEau.js");
const Route$2 = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./calculators-DhZz2v6a.js");
const Route$1 = createFileRoute("/calculators")({
  beforeLoad: async () => {
    await requireAuth();
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DUqTc0kI.js");
const Route = createFileRoute("/")({
  beforeLoad: async () => {
    await redirectIfAuthenticated();
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TodoRoute = Route$8.update({
  id: "/todo",
  path: "/todo",
  getParentRoute: () => Route$9
});
const TimerRoute = Route$7.update({
  id: "/timer",
  path: "/timer",
  getParentRoute: () => Route$9
});
const ScoresRoute = Route$6.update({
  id: "/scores",
  path: "/scores",
  getParentRoute: () => Route$9
});
const ReportsRoute = Route$5.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$9
});
const LoginRoute = Route$4.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$9
});
const KnowledgeRoute = Route$3.update({
  id: "/knowledge",
  path: "/knowledge",
  getParentRoute: () => Route$9
});
const DashboardRoute = Route$2.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$9
});
const CalculatorsRoute = Route$1.update({
  id: "/calculators",
  path: "/calculators",
  getParentRoute: () => Route$9
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const rootRouteChildren = {
  IndexRoute,
  CalculatorsRoute,
  DashboardRoute,
  KnowledgeRoute,
  LoginRoute,
  ReportsRoute,
  ScoresRoute,
  TimerRoute,
  TodoRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  logout as a,
  getAuthToken as b,
  getFirebaseConfig as c,
  getCurrentUserAsync as g,
  login as l,
  observeAuth as o,
  router as r,
  signup as s
};
