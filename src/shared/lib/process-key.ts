export const processKey = (key: string): string => {
  return key.split('_')[0].replace(/\//g, '-').toLowerCase().replace(/\s/g, '-');
}
