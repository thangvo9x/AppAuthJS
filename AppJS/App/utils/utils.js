export const getDeepLink = (path = '') => {
  const scheme = 'mobilepoc';
  const prefix = `${scheme}://welcome`;
  return prefix + path;
  // const scheme = "https";
  // const prefix = `${scheme}://`;
  // return prefix + path;
};
