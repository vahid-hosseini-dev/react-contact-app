export const initialState = {
  contacts: [],
  contact: {
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    checked: false,
  },
  modalType: null,
  edit: null,
};

export const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    case "SET_CONTACT":
      return { ...state, contact: { ...state.contact, ...action.payload } };
    case "CLEAR_CONTACT":
      return {
        ...state,
        contact: {
          id: "",
          name: "",
          lastName: "",
          email: "",
          phone: "",
          checked: false,
        },
      };
    case "SET_MODAL":
      return { ...state, modalType: action.payload };
    case "EDIT":
      return { ...state, edit: action.payload };
    default:
      return state;
  }
};
export default contactReducer;
