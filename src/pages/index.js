const saveLocal = (token) => {
  localStorage.setItem('token', (token));
};

const fetchTokenApi = async () => {
  const fetchAppi = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonFetch = await fetchAppi.json();
  const { token } = await jsonFetch;
  saveLocal(token);
};

export default fetchTokenApi;
