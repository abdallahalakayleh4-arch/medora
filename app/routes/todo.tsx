import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import source from "../../todo.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { auth, db, firebase } from "../lib/firebase";
import { usePageTitle } from "../lib/usePageTitle";

export const Route = createFileRoute("/todo")({
  component: TodoPage,
});

function TodoPage() {
  usePageTitle("Medora | Clinical Task Manager");

  const { styles, body } = useMemo(() => {
    const extracted = extractHtml(source);
    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "morning");

    const taskInput = document.getElementById("taskInput") as HTMLInputElement | null;
    const prioritySelect = document.getElementById("prioritySelect") as HTMLSelectElement | null;
    const addBtn = document.getElementById("addBtn");
    const list = document.getElementById("list");
    const progressText = document.getElementById("progressText");
    const progressCircle = document.getElementById("progressCircle") as SVGCircleElement | null;
    const statsSummary = document.getElementById("statsSummary");
    const toast = document.getElementById("status-toast");
    const userInfo = document.getElementById("user-info");
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");

    if (
      !taskInput ||
      !prioritySelect ||
      !addBtn ||
      !list ||
      !progressText ||
      !progressCircle ||
      !statsSummary ||
      !toast ||
      !userInfo ||
      !themeIcon ||
      !themeText
    ) {
      return undefined;
    }

    let userId: string | null = null;
    let unsubscribeSnapshot: (() => void) | null = null;

    const showToast = (message: string, color = "#2563eb") => {
      toast.textContent = message;
      toast.setAttribute("style", `display:block; background:${color};`);
      setTimeout(() => {
        toast.setAttribute("style", "display:none;");
      }, 3000);
    };

    const updateProgress = (done: number, total: number) => {
      const percent = total === 0 ? 0 : Math.round((done / total) * 100);
      progressText.textContent = `${percent}%`;

      const offset = 440 - (440 * percent) / 100;
      progressCircle.style.strokeDashoffset = `${offset}`;

      if (percent < 30) progressCircle.style.stroke = "var(--danger)";
      else if (percent < 80) progressCircle.style.stroke = "var(--warning)";
      else progressCircle.style.stroke = "var(--accent)";

      statsSummary.textContent = `${done} of ${total} clinical objectives met.`;
    };

    const loadTasks = () => {
      if (!userId) return;
      unsubscribeSnapshot = db
        .collection("users")
        .doc(userId)
        .collection("todos")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          list.innerHTML = "";
          let total = snapshot.size;
          let done = 0;

          if (total === 0) {
            list.innerHTML =
              '<li style="justify-content:center; color:var(--text-muted); text-align:center;">No current medical tasks.<br>Take a break!</li>';
            updateProgress(0, 0);
            return;
          }

          snapshot.forEach((doc) => {
            const task = doc.data() as { text: string; priority: string; completed: boolean; timestamp?: any };
            if (task.completed) done += 1;

            const li = document.createElement("li");
            li.className = `priority-${task.priority} ${task.completed ? "done" : ""}`;

            const time = task.timestamp
              ? new Date(task.timestamp.toDate()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "Just now";

            li.innerHTML = `
              <div class="task-info">
                <i class="fas ${task.completed ? "fa-check-circle" : "fa-notes-medical"}"
                   style="color: ${task.completed ? "var(--accent)" : "var(--primary)"}; font-size: 20px;"></i>
                <div>
                  <span class="task-text">${task.text}</span>
                  <span class="task-meta"><i class="far fa-clock"></i> ${time} | ${task.priority.toUpperCase()}</span>
                </div>
              </div>
              <div class="task-actions">
                <button class="btn-icon btn-done" onclick="toggleTask('${doc.id}', ${task.completed})" title="Complete">
                  <i class="fas fa-check"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteTask('${doc.id}')" title="Dismiss">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `;
            list.appendChild(li);
          });

          updateProgress(done, total);
        });
    };

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        showToast("Redirecting to login...", "#ef4444");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }

      userId = user.uid;
      userInfo.innerHTML = `<i class="fas fa-user-md"></i> ${user.email?.split("@")[0]}`;
      showToast("Clinical Data Synced ✔");
      loadTasks();
    });

    const toggleTheme = () => {
      const html = document.documentElement;
      if (html.getAttribute("data-theme") === "morning") {
        html.setAttribute("data-theme", "icu");
        themeIcon.className = "fas fa-moon";
        themeText.textContent = "ICU Night Mode";
      } else {
        html.setAttribute("data-theme", "morning");
        themeIcon.className = "fas fa-sun";
        themeText.textContent = "Morning Mode";
      }
    };

    const addTask = () => {
      const text = taskInput.value.trim();
      const priority = prioritySelect.value;

      if (!text || !userId) {
        taskInput.style.border = "1px solid var(--danger)";
        setTimeout(() => {
          taskInput.style.border = "none";
        }, 2000);
        return;
      }

      db.collection("users")
        .doc(userId)
        .collection("todos")
        .add({
          text,
          priority,
          completed: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          taskInput.value = "";
          showToast("Task Added to Rounds");
        })
        .catch((error: Error) => {
          showToast(`Sync Error: ${error.message}`, "#ef4444");
        });
    };

    const handleKeypress = (event: KeyboardEvent) => {
      if (event.key === "Enter") addTask();
    };

    window.toggleTheme = toggleTheme;
    window.toggleTask = (id: string, currentStatus: boolean) => {
      if (!userId) return;
      db.collection("users").doc(userId).collection("todos").doc(id).update({
        completed: !currentStatus,
      });
    };
    window.deleteTask = (id: string) => {
      if (!userId) return;
      if (confirm("Confirm dismissal of this task?")) {
        db.collection("users").doc(userId).collection("todos").doc(id).delete();
        showToast("Task Dismissed", "#64748b");
      }
    };

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", handleKeypress);

    return () => {
      window.toggleTheme = undefined;
      window.toggleTask = undefined;
      window.deleteTask = undefined;
      addBtn.removeEventListener("click", addTask);
      taskInput.removeEventListener("keypress", handleKeypress);
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
