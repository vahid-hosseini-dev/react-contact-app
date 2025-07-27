const validateContact = (contact) => {
  const errors = {};

  if (!contact.name) {
    errors.name = "Name is required";
  } else if (contact.name.length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  if (!contact.lastName) {
    errors.lastName = "Last name is required";
  } else if (contact.lastName.length < 3) {
    errors.lastName = "Last name must be at least 3 characters long";
  }

  if (!contact.email) {
    errors.email = "Email is required";
  } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(contact.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!contact.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^09\d{9}$/.test(contact.phone)) {
    errors.phone = "Phone number must be 11 digits and start with 09";
  }

  return errors;
};

export default validateContact;
