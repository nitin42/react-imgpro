const setItem = (key, value, store) =>
  store !== null ? store.setItem(key, value) : null;

const getItem = (key, store) => (store !== null ? store.getItem(key) : null);

const removeItem = (key, store) =>
  store !== null ? store.removeItem(key) : null;

export { getItem, removeItem, setItem };
