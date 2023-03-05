export let op = Object.prototype;
export let ostring = op.toString;
export let hasOwn = op.hasOwnProperty;
export let isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
export let isWebWorker = !isBrowser && typeof importScripts !== 'undefined';

//PS3 indicates loaded and complete, but need to wait for complete
//specifically. Sequence is 'loading', 'loaded', execution,
// then 'complete'. The UA check is unfortunate, but not sure how
//to feature test w/o causing perf issues.
export let readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/;
export let defContextName = '_';
//Oh the tragedy, detecting opera. See the usage of isOpera for reason.
export let isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';

export function isFunction(it) {
  return ostring.call(it) === '[object Function]';
}

export function isArray(it) {
  return ostring.call(it) === '[object Array]';
}

/**
 * Helper function for iterating over an array. If the func returns
 * a true value, it will break out of the loop.
 */
export function each(ary, func) {
  if (ary) {
    var i;
    for (i = 0; i < ary.length; i += 1) {
      if (ary[i] && func(ary[i], i, ary)) {
        break;
      }
    }
  }
}

/**
 * Helper function for iterating over an array backwards. If the func
 * returns a true value, it will break out of the loop.
 */
export function eachReverse(ary, func) {
  if (ary) {
    var i;
    for (i = ary.length - 1; i > -1; i -= 1) {
      if (ary[i] && func(ary[i], i, ary)) {
        break;
      }
    }
  }
}

export function hasProp(obj, prop) {
  return hasOwn.call(obj, prop);
}

export function getOwn(obj, prop) {
  return hasProp(obj, prop) && obj[prop];
}

/**
 * Cycles over properties in an object and calls a function for each
 * property value. If the function returns a truthy value, then the
 * iteration is stopped.
 */
export function eachProp(obj, func) {
  var prop;
  for (prop in obj) {
    if (hasProp(obj, prop)) {
      if (func(obj[prop], prop)) {
        break;
      }
    }
  }
}

/**
 * Simple function to mix in properties from source into target,
 * but only if target does not already have a property of the same name.
 */
export function mixin(target, source, force, deepStringMixin) {
  if (source) {
    eachProp(source, function (value, prop) {
      if (force || !hasProp(target, prop)) {
        if (
          deepStringMixin &&
          typeof value === 'object' &&
          value &&
          !isArray(value) &&
          !isFunction(value) &&
          !(value instanceof RegExp)
        ) {
          if (!target[prop]) {
            target[prop] = {};
          }
          mixin(target[prop], value, force, deepStringMixin);
        } else {
          target[prop] = value;
        }
      }
    });
  }
  return target;
}

//Similar to Function.prototype.bind, but the 'this' object is specified
//first, since it is easier to read/figure out what 'this' will be.
export function bind(obj, fn) {
  return function () {
    return fn.apply(obj, arguments);
  };
}

export function scripts() {
  return document.getElementsByTagName('script');
}
