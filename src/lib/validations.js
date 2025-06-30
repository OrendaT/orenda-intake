import { number, expirationDate, cvv, postalCode } from 'card-validator';

export const cc_validations = {
  credit_card_number: (value) => {
    const cardNumber = value.replace(/\s/g, '');
    const validation = number(cardNumber);
    return validation.isValid || 'Invalid credit card number';
  },
  credit_card_exp_date: (value) => {
    const validation = expirationDate(value);
    return validation.isValid || 'Invalid expiration date';
  },
  credit_card_csv: (value) => {
    const validation = cvv(value, cardDetails.cvv_length);
    return validation.isValid || 'Invalid CVV';
  },
  billing_zip_code: (value) => {
    const validation = postalCode(value);
    return validation.isValid || 'Invalid zip code';
  },
};
