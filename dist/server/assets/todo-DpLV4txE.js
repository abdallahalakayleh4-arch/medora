import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { A as AppShell } from "./AppShell-ChV9Eya4.js";
import { g as getCurrentUserAsync } from "./router-DbyaQ_tD.js";
import { s as subscribeTodos, t as toggleTodo, d as deleteTodo, c as createTodo } from "./firestore-CqlAScbJ.js";
import "@tanstack/react-router";
import "lucide-react";
import "./use-medora-theme-BcdTr06G.js";
function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("routine");
  const [status, setStatus] = useState("Ready");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let unsub;
    getCurrentUserAsync().then((user) => {
      if (!user) return;
      setUserId(user.uid);
      unsub = subscribeTodos(user.uid, setTodos);
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);
  const onAdd = async () => {
    if (!text.trim() || !userId) return;
    await createTodo(userId, {
      text: text.trim(),
      priority
    });
    setText("");
    setStatus("Task added");
  };
  const completed = useMemo(() => todos.filter((item) => item.completed).length, [todos]);
  const percent = todos.length === 0 ? 0 : Math.round(completed / todos.length * 100);
  return /* @__PURE__ */ jsx(AppShell, { title: "Clinical Task Manager", subtitle: "Track urgent and routine clinical objectives with realtime sync.", children: /* @__PURE__ */ jsxs("div", { className: "medora-grid medora-grid-2", children: [
    /* @__PURE__ */ jsxs("section", { className: "medora-card", children: [
      /* @__PURE__ */ jsx("h3", { children: "Add Task" }),
      /* @__PURE__ */ jsxs("div", { className: "medora-inline", children: [
        /* @__PURE__ */ jsx("input", { className: "medora-input", value: text, onChange: (event) => setText(event.target.value), placeholder: "Task", onKeyDown: (event) => {
          if (event.key === "Enter") onAdd();
        } }),
        /* @__PURE__ */ jsxs("select", { className: "medora-select", value: priority, onChange: (event) => setPriority(event.target.value), children: [
          /* @__PURE__ */ jsx("option", { value: "emergency", children: "Emergency" }),
          /* @__PURE__ */ jsx("option", { value: "urgent", children: "Urgent" }),
          /* @__PURE__ */ jsx("option", { value: "routine", children: "Routine" })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-primary", onClick: onAdd, children: "Add" })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "medora-list", style: {
        marginTop: 14
      }, children: todos.length === 0 ? /* @__PURE__ */ jsx("li", { className: "medora-list-item", children: "No tasks." }) : todos.map((todo) => /* @__PURE__ */ jsxs("li", { className: `medora-list-item priority-${todo.priority} ${todo.completed ? "done" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "todo-text", children: todo.text }),
          /* @__PURE__ */ jsxs("div", { className: "todo-meta", children: [
            todo.priority.toUpperCase(),
            " |",
            " ",
            todo.timestamp ? todo.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }) : "Just now"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "medora-inline", children: [
          /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: () => toggleTodo(userId, todo.id, !todo.completed), children: "✓" }),
          /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-danger", onClick: () => deleteTodo(userId, todo.id), children: "✕" })
        ] })
      ] }, todo.id)) })
    ] }),
    /* @__PURE__ */ jsxs("aside", { className: "medora-card", children: [
      /* @__PURE__ */ jsx("h3", { children: "Completion" }),
      /* @__PURE__ */ jsxs("div", { className: "medora-progress", children: [
        percent,
        "%"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        completed,
        " of ",
        todos.length,
        " clinical objectives met."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "medora-status", children: status })
    ] })
  ] }) });
}
export {
  TodoPage as component
};
