import { b as getAuthToken, c as getFirebaseConfig } from "./router-DbyaQ_tD.js";
function getTodoCollectionUrl(userId) {
  const { projectId } = getFirebaseConfig();
  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${userId}/todos`;
}
function getTodoDocUrl(userId, todoId) {
  return `${getTodoCollectionUrl(userId)}/${todoId}`;
}
function getHeaders() {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}
function mapTodo(doc) {
  const id = doc.name.split("/").pop() ?? "";
  const fields = doc.fields ?? {};
  return {
    id,
    text: fields.text?.stringValue ?? "",
    priority: fields.priority?.stringValue ?? "routine",
    completed: fields.completed?.booleanValue ?? false,
    timestamp: fields.timestamp?.timestampValue ? new Date(fields.timestamp.timestampValue) : null
  };
}
async function fetchTodos(userId) {
  const response = await fetch(getTodoCollectionUrl(userId), {
    headers: getHeaders()
  });
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const data = await response.json();
  return (data.documents ?? []).map(mapTodo).sort((a, b) => (b.timestamp?.getTime() ?? 0) - (a.timestamp?.getTime() ?? 0));
}
function subscribeTodos(userId, callback) {
  let active = true;
  const poll = async () => {
    if (!active) return;
    try {
      const todos = await fetchTodos(userId);
      if (active) callback(todos);
    } catch {
      if (active) callback([]);
    }
  };
  void poll();
  const intervalId = window.setInterval(poll, 3e3);
  return () => {
    active = false;
    window.clearInterval(intervalId);
  };
}
async function createTodo(userId, input) {
  await fetch(getTodoCollectionUrl(userId), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      fields: {
        text: { stringValue: input.text },
        priority: { stringValue: input.priority },
        completed: { booleanValue: false },
        timestamp: { timestampValue: (/* @__PURE__ */ new Date()).toISOString() }
      }
    })
  });
}
async function toggleTodo(userId, todoId, completed) {
  await fetch(`${getTodoDocUrl(userId, todoId)}?updateMask.fieldPaths=completed`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({
      fields: {
        completed: { booleanValue: completed }
      }
    })
  });
}
async function deleteTodo(userId, todoId) {
  await fetch(getTodoDocUrl(userId, todoId), {
    method: "DELETE",
    headers: getHeaders()
  });
}
export {
  createTodo as c,
  deleteTodo as d,
  subscribeTodos as s,
  toggleTodo as t
};
