export let count = 0;

export const setCount = () => ++count;

export const getCount = () => count;

export const log = console.debug.bind(console);


export const person = {
  name: 'init',
};
