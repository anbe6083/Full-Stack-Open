import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const createBlog = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = await axios.post(baseUrl, newObject, config);
  return request.data;
};

const updateLikes = async (newObject) => {
  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return request.data;
};

export default { getAll, setToken, createBlog, updateLikes };
