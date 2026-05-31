/**
 * Helper to safely create DOM elements and avoid innerHTML
 */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string | null,
  text?: string | null
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined && text !== null) e.textContent = text;
  return e;
}
