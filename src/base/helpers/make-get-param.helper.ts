/**
 * Transform object param to query parameters.
 * @param objParam
 * @returns
 */
export const makeGetParam = (objParam): string => {
  let result = '';

  const arrArgs = Object.keys(objParam);

  const noValue = (val): boolean => {
    const availableTypes = ['boolean', 'number'];
    return !val && !availableTypes.includes(typeof val);
  };

  arrArgs.forEach((x, y) => {
    result += y < 1 ? '?' : '';
    const val = objParam[x];
    if (noValue(val)) return;
    else if (Array.isArray(val)) {
      if (!val.length) return;
      val.forEach((a, b) => {
        result += `${x}[${b}]=${a}`;
        result += b < val.length - 1 ? '&' : '';
      });
    } else result += `${x}=${val}`;
    result += y < arrArgs.length - 1 ? '&' : '';
  });

  return result;
};
