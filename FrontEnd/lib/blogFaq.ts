import type { FaqItem } from '@components/molecules/storefront/FaqSection';

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ' '));
}

function findFaqSectionBounds(html: string): { start: number; end: number } | null {
  const headingMatch = html.match(
    /<(h2|h3)[^>]*>\s*(سوالات متداول|پرسش‌های متداول|faq|frequently asked questions)\s*<\/\1>/i,
  );
  if (!headingMatch || headingMatch.index == null) return null;

  const afterHeading = headingMatch.index + headingMatch[0].length;
  const section = html.slice(afterHeading);
  const nextHeading = section.search(/<(h2)[^>]*>/i);
  const end = nextHeading >= 0 ? afterHeading + nextHeading : html.length;
  return { start: headingMatch.index, end };
}

/**
 * Extracts FAQ Q/A pairs from blog HTML that uses a heading like
 * "سوالات متداول" / "FAQ" followed by h3/h4 questions and paragraph answers.
 */
export function extractFaqFromHtml(html?: string | null): FaqItem[] {
  if (!html?.trim()) return [];

  const bounds = findFaqSectionBounds(html);
  if (!bounds) return [];

  const faqBlock = html.slice(bounds.start, bounds.end);
  const questionRegex =
    /<(h3|h4|strong|b)[^>]*>([\s\S]*?)<\/\1>\s*(?:<(?:p|div)[^>]*>([\s\S]*?)<\/(?:p|div)>)+/gi;

  const items: FaqItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = questionRegex.exec(faqBlock)) !== null) {
    const question = stripTags(match[2] ?? '');
    const chunk = match[0];
    const answerParts = [...chunk.matchAll(/<(?:p|div)[^>]*>([\s\S]*?)<\/(?:p|div)>/gi)].map(
      (m) => stripTags(m[1] ?? ''),
    );
    const answer = answerParts.filter(Boolean).join(' ').trim();
    if (question && answer) {
      items.push({ question, answer });
    }
  }

  if (!items.length) {
    const dtRegex = /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/gi;
    while ((match = dtRegex.exec(faqBlock)) !== null) {
      const question = stripTags(match[1] ?? '');
      const answer = stripTags(match[2] ?? '');
      if (question && answer) items.push({ question, answer });
    }
  }

  return items.slice(0, 12);
}

/** Removes the FAQ heading block so UI can render FaqSection once. */
export function stripFaqSectionFromHtml(html?: string | null): string {
  if (!html?.trim()) return html ?? '';
  const bounds = findFaqSectionBounds(html);
  if (!bounds) return html;
  return `${html.slice(0, bounds.start)}${html.slice(bounds.end)}`.trim();
}
