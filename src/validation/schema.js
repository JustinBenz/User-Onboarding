import * as yup from "yup"

export default yup.object().shape({
    name: yup
        .string()
        .required("Must enter a name"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("Must enter an email"),
    pass: yup
        .string()
        .required("Must enter a password")
        .min(6, "Password must be atleast 6 characters long"),
    tos: yup
        .boolean()
        .oneOf([true], "must agree to our terms"),
})