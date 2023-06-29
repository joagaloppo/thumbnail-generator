/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object: Record<string, unknown>, keys: string[]): Record<string, unknown> => {
  return keys.reduce((obj: Record<string, unknown>, key: string) => {
    // eslint-disable-next-line no-prototype-builtins
    if (object?.hasOwnProperty(key)) {
      return { ...obj, [key]: object[key] };
    }
    return obj;
  }, {});
};

export default pick;
