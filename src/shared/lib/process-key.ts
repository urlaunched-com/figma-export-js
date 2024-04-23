export const processKey = (key: string): string => {
  return key.replace(/\//g, '-').toLowerCase().replace(/\s/g, '-');
}
