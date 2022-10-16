import * as yup from "yup";

export const valSchemaRegister = yup.object().shape({
    email: yup.string().email('Wrong email').required('This field is required').min(3,'The field must be at least 3 characters long'),
    password: yup.string().typeError('This field only accepts text').required('This field is required').min(6,'The field must be at least 6 characters long'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const valSchemaLogin = yup.object().shape({
    email: yup.string().email('Wrong email').required('This field is required').min(3,'The field must be at least 3 characters long'),
    password: yup.string().typeError('This field only accepts text').required('This field is required').min(6,'The field must be at least 6 characters long'),
});