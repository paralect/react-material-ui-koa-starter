import get from 'lodash/get';

export function proxyDefault(target, defaultVal) {
  return new Proxy(target, {
    get(obj, key) {
      return get(obj, key, defaultVal);
    },
  });
}
