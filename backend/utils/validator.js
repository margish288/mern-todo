class Validator {
  validateEmail(email) {
    const validEmailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,5}/;
    return validEmailRegex.test(email);
  }

  validatePassword(password) {
    const validPasswordRegex = /^[a-zA-Z0-9]{8,20}$/;
    return validPasswordRegex.test(password);
  }

  validateName(name) {
    const validNameRegex = /^[a-zA-Z\s]{3,20}$/;
    return validNameRegex.test(name);
  }

  isEmpty(fieldValue, fieldName) {
    if (!fieldValue) {
      return `${fieldName} is required`;
    }
    return "";
  }

  isEqual(fieldValueOne, fieldValueTwo) {
    const firstField = JSON.stringify(fieldValueOne);
    const secondField = JSON.stringify(fieldValueTwo);

    return firstField === secondField;
  }
}

export default Validator;
