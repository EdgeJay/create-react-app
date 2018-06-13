export function isInProductionMode() {
  return process.env.NODE_ENV === 'production';
}

export function isInDevelopmentMode() {
  return process.env.NODE_ENV === 'development';
}

export function isClient() {
  return typeof window === 'object' && window.document && window.document.createElement;
}
