let errors = {}
const onlyNumbers = /^[0-9]*$/
const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/
const regexPassword = /(?=.*[0-9])/

export function name(name) {
    if (name.length < 1) {
        errors = { ...errors, name: 'El campo no puede estar vacío' }
    } else if (!onlyLettersAndSpaces.test(name)) {
        errors = { ...errors, name: 'El nombre solo debe tener letras y espacios' }
    } else if (name.length > 40) {
        errors = { ...errors, name: 'El nombre no debe superar los 40 caracteres' }
    } else {
        errors = { ...errors, name: "" }
    }
    return errors
}

export function email(email) {
    if (email.length < 1) {
        errors = { ...errors, email: 'El campo no puede estar vacío' }
    } else if (!regexEmail.test(email)) {
        errors = { ...errors, email: 'Email inválido' }
    } else if (email.length > 40) {
        errors = { ...errors, email: 'El email no debe superar los 40 caracteres' }
    } else {
        errors = { ...errors, email: "" }
    }
    return errors
}

export function address(address) {
    if (address.length < 1) {
        errors = { ...errors, address: 'El campo no puede estar vacío' }
    } else if (address.length > 40) {
        errors = { ...errors, address: 'La dirección no debe superar los 40 caracteres' }
    } else {
        errors = { ...errors, address: "" }
    }
    return errors
}

export function phone(phone) {
    if (phone.length < 1) {
        errors = { ...errors, phone: 'El campo no puede estar vacío' }
    } else if (!onlyNumbers.test(phone)) {
        errors = { ...errors, phone: 'El teléfono debe contener solo números' }
    } else if (phone.length > 13) {
        errors = { ...errors, phone: 'El teléfono no debe superar los 13 caracteres' }
    } else {
        errors = { ...errors, phone: "" }
    }
    return errors
}

export function password(password) {
    if (password.length < 1) {
        errors = { ...errors, password: 'El campo no puede estar vacío' }
    } else if (password.length < 8) {
        errors = { ...errors, password: 'La contraseña debe tener al menos 8 caracteres' }
    } else if (!regexPassword.test(password)) {
        errors = { ...errors, password: 'La contraseña debe tener al menos 1 número' }
    } else {
        errors = { ...errors, password: "" }
    }
    return errors
}