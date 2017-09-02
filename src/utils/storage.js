/**
 * Set the item in localStorage
 * @param {string} key Key name
 * @param { object } value Value
 * @param { object } store Store reference
 */
const setItem = (key, value, store) => (store !== null ? store.setItem(key, value) : null);

/**
 * Get the item from localStorage
 * @param { string } key Key name
 * @param { object } store Store reference
 */
const getItem = (key, store) => (store !== null ? store.getItem(key) : null);

/**
 * Remove the item from localStorage
 * @param { string } key 
 * @param { object } store 
 */
const removeItem = (key, store) => (store !== null ? store.removeItem(key) : null);

export { getItem, removeItem, setItem };
