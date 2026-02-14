export function extractHtml(source: string) {
  const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  const styles = styleMatch?.[1]?.trim() ?? "";
  const body = bodyMatch?.[1]?.replace(/<script[\s\S]*?<\/script>/gi, "").trim() ?? "";

  return { styles, body };
}

const legacyLinks: Record<string, string> = {
  "index.html": "/",
  "login.html": "/login",
  "dashboard.html": "/dashboard",
  "calculators.html": "/calculators",
  "knowledge.html": "/knowledge",
  "reports.html": "/reports",
  "library.html": "/reports",
  "scores.html": "/scores",
  "timer.html": "/timer",
  "todo.html": "/todo",
};

export function mapLegacyLinks(html: string) {
  return Object.entries(legacyLinks).reduce(
    (acc, [from, to]) => acc.replace(new RegExp(from, "g"), to),
    html,
  );
}
