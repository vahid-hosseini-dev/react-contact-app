import { v4 } from "uuid";
import styles from "./Contacts.module.css";

import ContactsList from "./ContactsList";
import Search from "./Search";
import Modal from "./Modal";
import Toast from "./Toast";

import inputs from "../constants/inputs";
import validateContact from "../constants/validateContact";

import ContactContext from "../context/ContactContext";
import { useContext, useEffect } from "react";

import { getContacts, addContact } from "../services/api";

function Contacts() {
  const {
    dispatch,
    contact,
    contacts,
    toast,
    search,
    setToast,
    edit,
    ShowCheckedHandler,
    showChecked,
    errors,
    setErrors,
    alert,
    setAlert,
  } = useContext(ContactContext);

  useEffect(() => {
    const localData = localStorage.getItem("contacts");
    if (localData) {
      const contacts = JSON.parse(localData);
      dispatch({ type: "SET_CONTACTS", payload: contacts });
    } else {
      getContacts().then((res) => {
        dispatch({ type: "SET_CONTACTS", payload: res.data });
        localStorage.setItem("contacts", JSON.stringify(res.data));
      });
    }
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name || "").includes(search) ||
      (contact.lastName || "").includes(search) ||
      (contact.email || "").includes(search)
  );

  const changeHandler = (event) => {
    const { name, value } = event.target;

    const updatedContact = { ...contact, [name]: value };

    dispatch({
      type: "SET_CONTACT",
      payload: updatedContact,
    });

    const newFieldError = validateContact(updatedContact)[name];
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (!newFieldError) {
        delete newErrors[name];
      } else {
        newErrors[name] = newFieldError;
      }
      return newErrors;
    });
  };
  const addHandler = () => {
    if (
      !contact.name &&
      !contact.lastName &&
      !contact.email &&
      !contact.phone
    ) {
      setAlert("Please enter valid data");
      return;
    }

    const errors = validateContact(contact);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setAlert("");
    const newContact = { ...contact, id: v4(), checked: false };

    addContact(newContact).then((res) => {
      dispatch({
        type: "SET_CONTACTS",
        payload: [...contacts, res.data],
      });

      localStorage.setItem("contacts", JSON.stringify([...contacts, res.data]));

      dispatch({ type: "CLEAR_CONTACT" });
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          {inputs.map((input, index) => (
            <div key={index} className={styles.inputGroup}>
              <div>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={contact[input.name]}
                  onChange={changeHandler}
                  className={`${errors[input.name] ? styles.invalid : ""}`}
                />
              </div>
              <div>
                {errors[input.name] && (
                  <p className={styles.alertEmptyField}>
                    {errors[input.name] || ""}
                  </p>
                )}
              </div>
            </div>
          ))}
          {edit ? (
            <>
              <button
                className={styles.updateContact}
                onClick={() =>
                  dispatch({ type: "SET_MODAL", payload: "confirmUpdate" })
                }
              >
                Update Contact
              </button>
              <button
                className={styles.cancelUpdateContact}
                onClick={() => {
                  dispatch({ type: "EDIT", payload: null });
                  dispatch({ type: "CLEAR_CONTACT" });
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className={styles.addContact} onClick={addHandler}>
              Add Contact
            </button>
          )}
        </div>
        <div className={styles.alert}>{alert && <p> {alert}</p>}</div>

        <div className={styles.editBox}>
          <button className={styles.selectBtn} onClick={ShowCheckedHandler}>
            Select Items
          </button>
          <button
            className={styles.deleteBtn}
            disabled={
              !showChecked || !contacts.some((contact) => contact.checked)
            }
            onClick={() =>
              dispatch({ type: "SET_MODAL", payload: "deleteSelected" })
            }
          >
            Delete Items
          </button>
          <Search />
        </div>

        <ContactsList contacts={filteredContacts} />

        <Modal />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default Contacts;
