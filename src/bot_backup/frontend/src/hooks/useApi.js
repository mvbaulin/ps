export function useApi() {
  const getData = async (query) => {
    let url = `https://testtrtr.ru:5001/api/${query}`

    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);

      return [];
    }
  }

  return {
    getData
  }
}
