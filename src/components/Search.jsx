import  ContactContext from "../context/ContactContext";
import { useContext } from "react";

import styles from "./Search.module.css";

function Search() {
  const { searchHandler, search } = useContext(ContactContext);

  return (
    <div>
      <input
        className={styles.search}
        type="text"
        placeholder="Search"
        onChange={searchHandler}
        value={search}
      />
    </div>
  );
}

export default Search;
