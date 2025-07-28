import { useState } from "react";
import ContactContext from "./ContactContext";
import validateContact from "../constants/validateContact";
import { useReducer } from "react";
import { initialState, contactReducer } from "./contactReducer";
import { deleteContact, getContacts, updateContact } from "../services/api";

function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const [selectedId, setSelectedId] = useState(null);
  const [showChecked, setShowChecked] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");
  const [search, setSearch] = useState("");

  const toggleChecked = (id) => {
    const updatedContacts = state.contacts.map((contact) =>
      contact.id === id ? { ...contact, checked: !contact.checked } : contact
    );
    dispatch({ type: "SET_CONTACTS", payload: updatedContacts });
  };

  const ShowCheckedHandler = () => {
    setShowChecked(!showChecked);
  };

  const editHandler = (id) => {
    const ContactEdited = state.contacts.find((contact) => contact.id === id);
    if (!ContactEdited) return;
    dispatch({ type: "SET_CONTACT", payload: ContactEdited });
    dispatch({ type: "EDIT", payload: id });
  };

  const deleteHandler = (id) => {
    deleteContact(id).then(() => {
      getContacts().then((res) => {
        dispatch({ type: "SET_CONTACTS", payload: res.data });
        localStorage.setItem("contacts", JSON.stringify(res.data));
      });
    });

    showToast("Contact deleted!", "error");
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const updateHandler = () => {
    if (
      !state.contact.name &&
      !state.contact.lastName &&
      !state.contact.email &&
      !state.contact.phone
    ) {
      setAlert("Please enter valid data");
      return;
    }

    const errors = validateContact(state.contact);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const updatedContact = { ...state.contact, id: state.edit };

    localStorage.setItem("contacts", JSON.stringify(updatedContact));

    updateContact(state.edit, updatedContact)
      .then(() => getContacts())
      .then((res) => {
        dispatch({ type: "SET_CONTACTS", payload: res.data });
        localStorage.setItem("contacts", JSON.stringify(res.data));
        dispatch({ type: "CLEAR_CONTACT" });
        dispatch({ type: "EDIT", payload: null });
        setAlert("");
        showToast("Contact updated successfully!", "success");
      });
  };

  const deleteSelectedHandler = () => {
    const newContacts = state.contacts.filter((contact) => !contact.checked);
    deleteContact();
    dispatch({ type: "SET_CONTACTS", payload: newContacts });
    showToast("Selected contacts deleted!", "error");
  };

  const searchHandler = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const value = {
    ...state,
    dispatch,

    selectedId,
    setSelectedId,

    search,
    setSearch,
    searchHandler,
    showChecked,
    setShowChecked,
    ShowCheckedHandler,

    toggleChecked,
    editHandler,
    deleteHandler,
    deleteSelectedHandler,
    updateHandler,

    alert,
    setAlert,
    errors,
    setErrors,
    toast,
    setToast,
    showToast,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export default ContactProvider;
