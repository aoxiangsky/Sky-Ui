// 判断参数是否是其中之一
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i += 1) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

// 向上找到一个组件
export function findComponentUpward(context, componentName) {
  let componentNames;
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }
  let parent = context.$parent;
  let { name } = parent.$options;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

// 向下找到一个组件
export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;
  childrens.some((child) => {
    const { name } = child.$options;
    if (name === componentName) {
      children = child;
      return true;
    }
    children = findComponentDownward(child, componentName);
    if (children) return true;
    return false;
  });
  return children;
}

// 向下找到一堆组件
export function findComponentsDownward(context, componentName, ignoreComponentNamesParams) {
  let ignoreComponentNames;
  if (!Array.isArray(ignoreComponentNamesParams) && ignoreComponentNamesParams !== undefined) {
    ignoreComponentNames = [ignoreComponentNamesParams];
  } else if (Array.isArray(ignoreComponentNamesParams)) {
    ignoreComponentNames = ignoreComponentNamesParams.concat();
  } else {
    ignoreComponentNames = [];
  }
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    if (ignoreComponentNames.indexOf(child.$options.name) < 0) {
      const foundChilds = findComponentsDownward(child, componentName);
      return components.concat(foundChilds);
    }
    return components;
  }, []);
}

// 向上找到一堆组件
export function findComponentsUpward(context, componentName) {
  const parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  }
  return [];
}

// 查找兄弟组件
export function findBrothersComponents(context, componentName, exceptMe = true) {
  const res = context.$parent.$children.filter((item) => item.$options.name === componentName);
  // eslint-disable-next-line no-underscore-dangle
  const index = res.findIndex((item) => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

function typeOf(obj) {
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}
// deepCopy
export function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i += 1) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    Object.keys(data).forEach((item) => {
      o[item] = deepCopy(data[item]);
    });
  }
  return o;
}
