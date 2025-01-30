export function useStorage() {

  const setItem = (key, value) => {
    window.localStorage.setItem(key, value);
  }

  const getItem = (key) => {
    return window.localStorage.getItem(key);
  }

  return {
    setItem,
    getItem
  }
}
