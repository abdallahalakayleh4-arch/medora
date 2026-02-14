import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { A as AppShell } from "./AppShell-ChV9Eya4.js";
import "@tanstack/react-router";
import "lucide-react";
import "./router-DbyaQ_tD.js";
import "./use-medora-theme-BcdTr06G.js";
function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionNumber, setSessionNumber] = useState(1);
  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          setIsRunning(false);
          setSessionNumber((value) => value + 1);
          return 0;
        }
        return previous - 1;
      });
    }, 1e3);
    return () => window.clearInterval(interval);
  }, [isRunning]);
  useEffect(() => {
    if (timeLeft === 0) {
      window.alert("Session complete, doctor.");
      setTimeLeft(totalTime);
    }
  }, [timeLeft, totalTime]);
  const timeLabel = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft]);
  const progress = Math.round((totalTime - timeLeft) / totalTime * 100);
  const setMode = (minutes, breakMode = false) => {
    setIsRunning(false);
    setIsBreak(breakMode);
    setTotalTime(minutes * 60);
    setTimeLeft(minutes * 60);
  };
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };
  return /* @__PURE__ */ jsx(AppShell, { title: "Precision Study Timer", subtitle: "Pomodoro-style deep focus with break mode and session progression.", children: /* @__PURE__ */ jsxs("div", { className: "medora-card", style: {
    maxWidth: 520,
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("p", { className: "medora-status", children: [
      "Session ",
      sessionNumber,
      " of 4"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "medora-inline", style: {
      marginBottom: 14
    }, children: [
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: () => setMode(25), children: "25 min" }),
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: () => setMode(50), children: "50 min" }),
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: () => setMode(5, true), children: "Break" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "medora-progress", children: timeLabel }),
    /* @__PURE__ */ jsxs("p", { style: {
      textAlign: "center"
    }, children: [
      isBreak ? "REST TIME" : "DEEP FOCUS",
      " | ",
      progress,
      "%"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "medora-inline", style: {
      justifyContent: "center"
    }, children: [
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-primary", onClick: () => setIsRunning((value) => !value), children: isRunning ? "Pause" : "Start" }),
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: reset, children: "Reset" })
    ] })
  ] }) });
}
export {
  TimerPage as component
};
