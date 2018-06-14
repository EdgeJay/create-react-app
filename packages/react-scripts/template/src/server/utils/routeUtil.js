const skippedPaths = [/\/logo.*\.svg/, /\/manifest.json/, /\/service-worker.js/, /\/favicon.ico/];

export function shouldSkipPath(ctx) {
  return skippedPaths.some(re => re.test(ctx.request.path));
}
