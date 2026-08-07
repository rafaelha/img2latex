const OUTER_DISPLAY_ENVIRONMENTS = new Set([
  "align",
  "align*",
  "aligned",
  "alignedat",
  "alignedat*",
  "alignat",
  "alignat*",
  "displaymath",
  "displaymath*",
  "equation",
  "equation*",
  "flalign",
  "flalign*",
  "gather",
  "gather*",
  "gathered",
  "math",
  "multline",
  "multline*",
  "split",
  "xalignat",
  "xalignat*",
  "xxalignat",
  "xxalignat*",
]);

const ENVIRONMENTS_WITH_ARGUMENTS = new Set([
  "alignedat",
  "alignedat*",
  "alignat",
  "alignat*",
  "xalignat",
  "xalignat*",
  "xxalignat",
  "xxalignat*",
]);

const MAX_WRAPPER_LAYERS = 10;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripMarkdownFence(source: string): string {
  const match = source.match(/^```(?:latex|tex)?\s*([\s\S]*?)\s*```$/i);
  return match ? match[1].trim() : source;
}

function stripOuterMathDelimiters(source: string): string {
  const delimiters = [
    ["$$", "$$"],
    ["\\[", "\\]"],
    ["\\(", "\\)"],
    ["$", "$"],
  ];

  for (const [left, right] of delimiters) {
    if (
      source.startsWith(left) &&
      source.endsWith(right) &&
      source.length > left.length + right.length
    ) {
      return source.slice(left.length, -right.length).trim();
    }
  }

  return source;
}

function stripOuterDisplayEnvironment(source: string): string {
  const beginMatch = source.match(
    /^\\begin\s*\{\s*([^{}\s]+)\s*\}/
  );

  if (!beginMatch) {
    return source;
  }

  const environmentName = beginMatch[1];
  const normalizedEnvironmentName = environmentName.toLowerCase();

  if (!OUTER_DISPLAY_ENVIRONMENTS.has(normalizedEnvironmentName)) {
    return source;
  }

  let contentStart = beginMatch[0].length;

  // alignat-style environments require a column-count argument that is part
  // of the wrapper, not part of the equation source.
  if (ENVIRONMENTS_WITH_ARGUMENTS.has(normalizedEnvironmentName)) {
    const argumentMatch = source.slice(contentStart).match(/^\s*\{[^{}]*\}/);
    if (argumentMatch) {
      contentStart += argumentMatch[0].length;
    }
  }

  const endMatch = source.match(
    new RegExp(
      `\\\\end\\s*\\{\\s*${escapeRegExp(environmentName)}\\s*\\}\\s*$`
    )
  );

  if (!endMatch || endMatch.index === undefined || endMatch.index < contentStart) {
    return source;
  }

  return source.slice(contentStart, endMatch.index).trim();
}

/**
 * Keeps the editable/copyable value as equation content rather than a
 * document-level math wrapper. Inner environments such as matrix and cases
 * are preserved because they are part of the expression itself.
 */
export function normalizeLatexSource(source: string): string {
  let normalized = source.trim();

  for (let layer = 0; layer < MAX_WRAPPER_LAYERS; layer += 1) {
    const previous = normalized;
    normalized = stripMarkdownFence(normalized);
    normalized = stripOuterMathDelimiters(normalized);
    normalized = stripOuterDisplayEnvironment(normalized);

    if (normalized === previous) {
      break;
    }
  }

  return normalized.trim();
}

/**
 * The preview owns the display environment so it never becomes part of the
 * source shown in the editor or copied to the clipboard.
 */
export function getLatexPreviewSource(source: string): string {
  const normalized = normalizeLatexSource(source);
  return normalized
    ? `$$\\begin{align*}${normalized}\\end{align*}$$`
    : "";
}
