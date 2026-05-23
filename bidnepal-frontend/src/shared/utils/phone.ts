import { parsePhoneNumberWithError } from "libphonenumber-js";

const isValidPhone = (value: string) => {
  try {
    return parsePhoneNumberWithError(value).isValid();
  } catch {
    return false;
  }
};