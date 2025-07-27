import styles from "./Modal.module.css";

import ContactContext from "../context/ContactContext";
import { useContext } from "react";

function Modal() {
  const {
    dispatch,
    modalType,
    deleteHandler,
    selectedId,
    updateHandler,
    deleteSelectedHandler,
  } = useContext(ContactContext);

  const message =
    modalType === "deleteSelected"
      ? "Are you sure you want to delete the selected items?"
      : modalType === "deleteSingle"
      ? "Are you sure you want to delete the selected item?"
      : modalType === "confirmUpdate"
      ? "Are you sure you want to confirm the changes?"
      : "";

  const closeModal = () => dispatch({ type: "SET_MODAL", payload: null });

  const confirmAction = () => {
    if (modalType === "deleteSingle" && selectedId) {
      deleteHandler(selectedId);
    } else if (modalType === "deleteSelected") {
      deleteSelectedHandler();
    } else if (modalType === "confirmUpdate") {
      updateHandler();
    }

    dispatch({ type: "SET_MODAL", payload: null });
  };

  if (!modalType) return null;

  return (
    <div className={styles.modalBg} onClick={closeModal}>
      <div className={styles.modalMsg} onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className={styles.Btn}>
          <button onClick={closeModal}>No</button>
          <button onClick={confirmAction}>Yes</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
