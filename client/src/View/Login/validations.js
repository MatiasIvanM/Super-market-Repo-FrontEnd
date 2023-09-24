// export default function validate(data) {
//     let errors = {}

//     if (data.email.length < 1) {
//         errors = { ...errors, email: 'El campo no puede estar vacío' }
//     } else {
//         errors = { ...errors, email: "" }
//     }

//     if (data.password.length < 1) {
//         errors = { ...errors, password: 'El campo no puede estar vacío' }
//     } else {
//         errors = { ...errors, password: "" }
//     }

//     return errors
// }

let errors = {}


export function email(email) {
    if (email.length < 1) {
        errors = { ...errors, email: 'El campo no puede estar vacío' }
    } else {
        errors = { ...errors, email: "" }
    }
    return errors
}

export function password(password) {
    if (password.length < 1) {
        errors = { ...errors, password: 'El campo no puede estar vacío' }
    } else {
        errors = { ...errors, password: "" }
    }
    return errors
}
