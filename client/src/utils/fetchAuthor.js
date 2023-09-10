

const fetchAuthor = async (id) => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const authorApi = `${apiBaseUrl}/api/author/${id}`;
    const res = await fetch(authorApi);
    const authorData = await res.json();
    return authorData
  } catch (error) {
    console.log(error);
  }
};

export default fetchAuthor