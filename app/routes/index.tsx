import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import source from "../../index.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { usePageTitle } from "../lib/usePageTitle";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  usePageTitle("Medora");

  const { styles, body } = useMemo(() => {
    const extracted = extractHtml(source);
    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
