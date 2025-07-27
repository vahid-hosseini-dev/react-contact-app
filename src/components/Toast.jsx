import styles from "./Toast.module.css";

function Toast({ message, type }) {
  return <div className={`${styles.toast} ${styles[type]}`}>{message}</div>;
}

export default Toast;
