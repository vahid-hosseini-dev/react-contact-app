import styles from "./ContactItem.module.css";

import ContactContext from "../context/ContactContext";
import { useContext } from "react";

function ContactItem({ data: { id, name, lastName, email, phone, checked } }) {
  const { dispatch, setSelectedId, toggleChecked, showChecked, editHandler } =
    useContext(ContactContext);

  return (
    <li className={styles.item}>
      {showChecked && (
        <input
          checked={checked}
          className={styles.checkBox}
          type="checkbox"
          onChange={() => toggleChecked(id)}
        />
      )}
      <p>
        {name} {lastName}
      </p>
      <p>
        <span>📧</span> {email}
      </p>
      <p>
        <span>📞</span> {phone}
      </p>
      <button
        onClick={() => {
          setSelectedId(id);
          dispatch({ type: "SET_MODAL", payload: "deleteSingle" });
        }}
      >
        🗑
      </button>
      <button onClick={() => editHandler(id)}>📝</button>
    </li>
  );
}

export default ContactItem;
