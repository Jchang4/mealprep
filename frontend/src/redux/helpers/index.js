
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


/**
 * Parse search query and turn into array
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
export function recipeQueryToArray(query) {
  return query.split(/\s|[,]/).filter(q => q.length > 0 ? true : false);
}
