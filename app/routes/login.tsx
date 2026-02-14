import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import source from "../../login.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { auth } from "../lib/firebase";
import { usePageTitle } from "../lib/usePageTitle";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  usePageTitle("Medora | Login");
  const navigate = useNavigate();

  const { styles, body } = useMemo(() => {
    const extracted = extractHtml(source);
    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
    };
  }, []);

  useEffect(() => {
    const email = document.getElementById("email") as HTMLInputElement | null;
    const password = document.getElementById("password") as HTMLInputElement | null;
    const status = document.getElementById("status") as HTMLElement | null;

    if (!email || !password || !status) {
      return undefined;
    }

    const setTheme = (theme: "dark" | "light") => {
      if (theme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    };

    window.toggleMode = () => {
      const isDark = document.body.classList.toggle("dark");
      setTheme(isDark ? "dark" : "light");
    };

    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate({ to: "/dashboard" });
      }
    });

    window.login = () => {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => navigate({ to: "/dashboard" }))
        .catch((error) => {
          status.textContent = error.message;
        });
    };

    window.signup = () => {
      auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(() => navigate({ to: "/dashboard" }))
        .catch((error) => {
          status.textContent = error.message;
        });
    };

    window.logout = () => {
      auth.signOut().then(() => {
        status.textContent = "Logged out";
      });
    };

    return () => {
      window.toggleMode = undefined;
      window.login = undefined;
      window.signup = undefined;
      window.logout = undefined;
      unsubscribe();
      document.body.classList.remove("dark");
    };
  }, [navigate]);

  return (
    <>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
