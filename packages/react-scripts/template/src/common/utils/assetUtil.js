export function translateAssetUrl(assetManifest, key) {
  if (assetManifest) {
    return assetManifest[key];
  }
  return key;
}
