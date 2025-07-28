import axios from "axios";

const API_URL = "http://localhost:3001/contacts";

export const getContacts = () => axios.get(API_URL);

export const addContact = (contact) => axios.post(API_URL, contact);

export const deleteContact = (id) => axios.delete(`${API_URL}/${id}`);

export const updateContact = (id, updatedData) =>
  axios.put(`${API_URL}/${id}`, updatedData);