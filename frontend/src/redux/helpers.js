
export function createConstant(folder) {
  return (constant) => {
    return folder + '/' + constant;
  }
}

export function toObject(arr=[], key='id') {
  return arr.reduce(
    (obj, item) => Object.assign(obj, {[item[key]]: item}),
    {}
  );
}

// ensure an array is passed
export function toArray(payload) {
  return (Array.isArray(payload))
    ? payload
    : [payload]
}
