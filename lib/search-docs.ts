import headingsDataJson from "@/public/docs-headings.json";

interface Heading {
  text: string;
  id: string;
  level?: number;
}

interface Page {
  title: string;
  slug: string;
  headings: Heading[];
}

const headingsData = headingsDataJson as Page[];

export function searchDocs(query: string): { label: string; url: string; icon: "file" | "#" }[] {
  if (!query) return [];
  const q = query.toLowerCase();
  return headingsData.flatMap(page => {
    const results: { label: string; url: string; icon: "file" | "#" }[] = [];

    if (page.title.toLowerCase().includes(q)) {
      results.push({
        label: page.title,
        url: page.slug,
        icon: "file" as const,
      });
    }

    results.push(
      ...page.headings
        .filter(h => h.text.toLowerCase().includes(q) && (!h.level || h.level === 2))
        .map(h => ({
          label: h.text,
          url: `${page.slug}#${h.id}`,
          icon: "#" as const,
        }))
    );

    return results;
  });
}