/**
 * 性能优化
 */

import { getType } from './object.js';

// 节流
export function throttle2(callFn, interval) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        callFn.apply(this, args);
      }, interval);
    }
  };
}


/**
 * 防抖，连续触发10次，只有第一次或最后一次才会执行
 * func (Function): The function to debounce.
 * [wait=0] (number): The number of milliseconds to delay.
 * [options={}] (Object): The options object.
 * [options.leading=false] (boolean): 超时前调用，Specify invoking on the leading edge of the timeout.
 * [options.maxWait] (number): The maximum time func is allowed to be delayed before it's invoked.
 * [options.trailing=true] (boolean): 定时到期后调用，Specify invoking on the trailing edge of the timeout.
 * ************/
export function debounce(func, wait, options) {
  let lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;

  if (typeof func !== 'function') {
    throw new Error('第一个参数不是函数');
  }
  if (Number.isNaN(Number(wait))) {
    throw new Error('第二个参数不是数字');
  }
  wait = Number(wait);
  if (getType(options, 'Object')) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  const now = () => Date.now();

  function invokeFunc(time) {
    let args = lastArgs;
    let thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    let timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    let timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    const time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    let time = now(),
      isInvoking = shouldInvoke(time);
    console.debug(`isInvoking:${isInvoking}, timerId:${timerId}`);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * 节流，效果类似采样，比如连续触发10次最终会执行3次
 * func (Function): The function to throttle.
 * [wait=0] (number): The number of milliseconds to throttle invocations to.
 * [options={}] (Object): The options object.
 * [options.leading=true] (boolean): Specify invoking on the leading edge of the timeout.
 * [options.trailing=true] (boolean): Specify invoking on the trailing edge of the timeout.
 * *******************/
export function throttle(func, wait, options) {
  let leading = true,
    trailing = true;

  if (!getType(func, 'Function')) {
    throw new Error('第一个参数不是函数');
  }
  if (getType(options, 'Object')) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}
