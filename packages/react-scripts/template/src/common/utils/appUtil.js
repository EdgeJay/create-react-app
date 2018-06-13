export function isClient() {
  return typeof window === 'object' && window.document && window.document.createElement;
}
