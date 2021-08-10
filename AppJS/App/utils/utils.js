import Hashes from 'jshashes';

export const getDeepLink = (path = '') => {
  const scheme = 'mobilepoc';
  const prefix = `${scheme}://welcome`;
  return prefix + path;
  // const scheme = "https";
  // const prefix = `${scheme}://`;
  // return prefix + path;
};

export const sha256base64urlencode = (str) => {
  // https://tools.ietf.org/html/rfc7636#appendix-A
  // https://tools.ietf.org/html/rfc4648#section-5
  return new Hashes.SHA256()
    .b64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/[=]+/g, '');
};
