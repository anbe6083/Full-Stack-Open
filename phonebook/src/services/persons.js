import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (personObj) => {
  const request = axios.post(baseUrl, personObj);
  return request.then((res) => res.data);
};
const updatePerson = (updatePersonObj) => {
  const request = axios.put(
    `${baseUrl}/${updatePersonObj.id}`,
    updatePersonObj,
  );
  return request.then((res) => res.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};
export default {
  create,
  getAll,
  updatePerson,
  deletePerson,
};
