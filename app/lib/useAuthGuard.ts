import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "./firebase";

export function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate({ to: "/login" });
      }
    });

    return () => unsubscribe();
  }, [navigate]);
}
