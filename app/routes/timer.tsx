import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import source from "../../timer.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { useAuthGuard } from "../lib/useAuthGuard";
import { usePageTitle } from "../lib/usePageTitle";

export const Route = createFileRoute("/timer")({
  component: TimerPage,
});

function TimerPage() {
  usePageTitle("Medora | Precision Study Timer");
  useAuthGuard();

  const { styles, body } = useMemo(() => {
    const extracted = extractHtml(source);
    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
    };
  }, []);

  useEffect(() => {
    let timeLeft = 25 * 60;
    let totalTime = 25 * 60;
    let timer: ReturnType<typeof setInterval> | null = null;
    let isRunning = false;
    let sessionNum = 1;

    const timeDisplay = document.getElementById("time");
    const progressBar = document.getElementById("progress-bar") as SVGCircleElement | null;
    const doctorIcon = document.getElementById("doctor-icon");
    const startBtn = document.getElementById("startBtn");
    const modeLabel = document.getElementById("mode-label");
    const sessionCount = document.getElementById("session-count");
    const circleTotal = 691;

    if (!timeDisplay || !progressBar || !doctorIcon || !startBtn || !modeLabel || !sessionCount) {
      return undefined;
    }

    const updateDisplay = () => {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      timeDisplay.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

      const offset = circleTotal - (timeLeft / totalTime) * circleTotal;
      progressBar.style.strokeDashoffset = `${offset}`;

      const percent = ((totalTime - timeLeft) / totalTime) * 100;
      doctorIcon.style.left = `calc(${percent}% - 10px)`;
    };

    const resetTimer = () => {
      if (timer) clearInterval(timer);
      timer = null;
      isRunning = false;
      timeLeft = totalTime;
      startBtn.innerHTML = '<i class="fas fa-play"></i> <span>Start Session</span>';
      updateDisplay();
    };

    const completeSession = () => {
      alert("Session Complete, Doctor! Time for a quick review or a short break.");
      sessionNum += 1;
      sessionCount.textContent = `Session ${sessionNum} of 4`;
      resetTimer();
    };

    const toggleTimer = () => {
      if (isRunning) {
        if (timer) clearInterval(timer);
        timer = null;
        startBtn.innerHTML = '<i class="fas fa-play"></i> <span>Resume</span>';
        isRunning = false;
      } else {
        isRunning = true;
        startBtn.innerHTML = '<i class="fas fa-pause"></i> <span>Pause</span>';
        timer = setInterval(() => {
          timeLeft -= 1;
          updateDisplay();
          if (timeLeft <= 0) {
            if (timer) clearInterval(timer);
            timer = null;
            completeSession();
          }
        }, 1000);
      }
    };

    const setMode = (mins: number, btn: HTMLButtonElement, isBreak = false) => {
      resetTimer();
      timeLeft = mins * 60;
      totalTime = timeLeft;
      modeLabel.textContent = isBreak ? "REST TIME" : "DEEP FOCUS";

      document.querySelectorAll(".mode-btn").forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");
      updateDisplay();
    };

    window.setMode = setMode;
    window.toggleTimer = toggleTimer;
    window.resetTimer = resetTimer;

    if (localStorage.getItem("medora-theme") === "icu") {
      document.body.setAttribute("data-theme", "icu");
    }

    updateDisplay();

    return () => {
      if (timer) clearInterval(timer);
      window.setMode = undefined;
      window.toggleTimer = undefined;
      window.resetTimer = undefined;
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
