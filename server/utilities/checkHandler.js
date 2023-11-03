import { QUERY_VALUES, USER_FIELDS } from "../constants/users.const.js";

const isValidEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
  return emailRegex.test(email); // Fix typo here
};

const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone); // Fix typo here
};

// When validating user input
const isValidField = (fieldNames) => {
  return Object.values(USER_FIELDS).toString() === Object.keys(fieldNames).toString();
};

// When checking the query parameters
const isValidQueryParam = (params) => {
  return Object.values(QUERY_VALUES).toString() === Object.keys(params).toString();
};

const handleUndefinedFields = () => {
  return { status: 403, description: 'Invalid JSON', message: 'Please check the format and syntax' };
};

export {
  isValidEmail,
  isValidPhone,
  isValidField,
  isValidQueryParam,
  handleUndefinedFields
}