import path from 'path';

export function isServerRunningInPackage() {
  if (typeof __dirname === 'string') {
    return __dirname.includes('/react-scripts');
  }
  return false;
}

export function isInProductionMode() {
  return process.env.NODE_ENV === 'production';
}

export function isInDevelopmentMode() {
  return process.env.NODE_ENV === 'development';
}

export function isClient() {
  return typeof window === 'object' && window.document && window.document.createElement;
}

export function getBuildFolderPath() {
  return isServerRunningInPackage()
    ? path.resolve(__dirname, '../../../../../../build')
    : path.resolve(__dirname, './build');
}
